import { DiscordBot } from '../bot';
import { Command } from './index';
import { Message, EmbedBuilder, GuildMember, PermissionsBitField } from 'discord.js';
import { 
  joinVoiceChannel, 
  createAudioPlayer, 
  createAudioResource,
  AudioPlayerStatus,
  VoiceConnectionStatus, 
  entersState,
  getVoiceConnection 
} from '@discordjs/voice';
import ytdl from 'ytdl-core';

// Store music queues and players for each guild
interface SongInfo {
  title: string;
  url: string;
  duration: string;
  thumbnail: string;
  requester: string;
}

interface MusicData {
  player: any;
  queue: SongInfo[];
  currentSong: SongInfo | null;
}

const musicData = new Map<string, MusicData>();

// Helper function to get duration in minutes:seconds format
function formatDuration(durationInSeconds: number): string {
  const minutes = Math.floor(durationInSeconds / 60);
  const seconds = durationInSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Helper function to initialize music data for a guild
function getGuildMusicData(guildId: string): MusicData {
  if (!musicData.has(guildId)) {
    const player = createAudioPlayer();
    
    // Set up player event handling
    player.on(AudioPlayerStatus.Idle, () => {
      const data = musicData.get(guildId)!;
      data.currentSong = null;
      
      // Play next song in queue if any
      if (data.queue.length > 0) {
        playSong(guildId, data.queue.shift()!);
      }
    });
    
    musicData.set(guildId, {
      player,
      queue: [],
      currentSong: null
    });
  }
  
  return musicData.get(guildId)!;
}

// Helper function to play a song
async function playSong(guildId: string, song: SongInfo): Promise<void> {
  const data = musicData.get(guildId)!;
  data.currentSong = song;
  
  try {
    // Get audio stream from YouTube
    const stream = ytdl(song.url, { 
      filter: 'audioonly',
      quality: 'highestaudio',
      highWaterMark: 1 << 25 // 32MB buffer
    });
    
    // Create audio resource
    const resource = createAudioResource(stream);
    
    // Play the resource
    data.player.play(resource);
  } catch (error) {
    console.error('Error playing song:', error);
    
    // Skip to next song
    data.currentSong = null;
    if (data.queue.length > 0) {
      playSong(guildId, data.queue.shift()!);
    }
  }
}

export function registerMusicCommands(bot: DiscordBot, commands: Map<string, Command>): void {
  // Play command
  commands.set('play', {
    name: 'play',
    description: 'Plays a song from YouTube. You must be in a voice channel.',
    category: 'music',
    usage: 'play song',
    examples: ['play never gonna give you up'],
    cooldown: 3,
    execute: async (message: Message, args: string[]) => {
      // Check if user is in a voice channel
      if (!message.member?.voice.channel) {
        return message.reply('You need to be in a voice channel to use this command!');
      }
      
      // Check for required permissions
      const permissions = message.member.voice.channel.permissionsFor(bot.client.user!.id);
      if (!permissions?.has(PermissionsBitField.Flags.Connect) || !permissions?.has(PermissionsBitField.Flags.Speak)) {
        return message.reply('I need the permissions to join and speak in your voice channel!');
      }
      
      // Check if a song was specified
      if (!args.length) {
        return message.reply('Please provide a song to play!');
      }
      
      // Get the song query
      const query = args.join(' ');
      
      // Send loading message
      const loadingMessage = await message.channel.send('🔍 Searching for your song...');
      
      try {
        // If the input is a YouTube URL, use it directly
        const isUrl = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/i.test(query);
        const videoUrl = isUrl ? query : `ytsearch:${query}`;
        
        // Get video info
        let videoInfo;
        
        if (isUrl) {
          videoInfo = await ytdl.getInfo(query);
        } else {
          // For search queries, we'll mock a simple search result for now
          // In a real implementation, you'd use something like youtube-search-api
          // or another library that can handle YouTube searches
          videoInfo = {
            videoDetails: {
              title: `Search result for: ${query}`,
              video_url: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`, // Placeholder URL
              lengthSeconds: 212,
              thumbnails: [{ url: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/default.jpg' }]
            }
          };
          
          // Note: In a real implementation, you'd do an actual YouTube search here
          // This is just a placeholder for the demo
        }
        
        const song: SongInfo = {
          title: videoInfo.videoDetails.title,
          url: videoInfo.videoDetails.video_url,
          duration: formatDuration(parseInt(videoInfo.videoDetails.lengthSeconds)),
          thumbnail: videoInfo.videoDetails.thumbnails[0].url,
          requester: message.author.tag
        };
        
        // Get guild music data
        const guildId = message.guild!.id;
        const data = getGuildMusicData(guildId);
        
        // Join voice channel if not already connected
        if (!getVoiceConnection(guildId)) {
          const connection = joinVoiceChannel({
            channelId: message.member.voice.channel.id,
            guildId: guildId,
            adapterCreator: message.guild!.voiceAdapterCreator
          });
          
          // Subscribe to the player
          connection.subscribe(data.player);
          
          // Handle disconnection
          connection.on(VoiceConnectionStatus.Disconnected, async () => {
            try {
              await Promise.race([
                entersState(connection, VoiceConnectionStatus.Signalling, 5_000),
                entersState(connection, VoiceConnectionStatus.Connecting, 5_000),
              ]);
              // Successfully reconnected
            } catch (error) {
              // Disconnected for good
              connection.destroy();
              musicData.delete(guildId);
            }
          });
        }
        
        // If nothing is playing, play the song immediately
        if (!data.currentSong) {
          await playSong(guildId, song);
          
          const embed = new EmbedBuilder()
            .setTitle('Now Playing')
            .setColor(0x5865F2) // Discord blurple color
            .setDescription(`[${song.title}](${song.url})`)
            .setThumbnail(song.thumbnail)
            .addFields(
              { name: 'Duration', value: song.duration, inline: true },
              { name: 'Requested By', value: song.requester, inline: true }
            );
          
          await loadingMessage.edit({ content: null, embeds: [embed] });
        } else {
          // Add song to queue
          data.queue.push(song);
          
          const embed = new EmbedBuilder()
            .setTitle('Added to Queue')
            .setColor(0x5865F2) // Discord blurple color
            .setDescription(`[${song.title}](${song.url})`)
            .setThumbnail(song.thumbnail)
            .addFields(
              { name: 'Duration', value: song.duration, inline: true },
              { name: 'Requested By', value: song.requester, inline: true },
              { name: 'Position in Queue', value: data.queue.length.toString(), inline: true }
            );
          
          await loadingMessage.edit({ content: null, embeds: [embed] });
        }
      } catch (error) {
        console.error('Error searching for song:', error);
        await loadingMessage.edit('❌ Error searching for song. Please try again with a different song or URL.');
      }
    }
  });
  
  // Skip command
  commands.set('skip', {
    name: 'skip',
    description: 'Skips the currently playing song.',
    category: 'music',
    usage: 'skip',
    examples: ['skip'],
    cooldown: 1,
    execute: async (message: Message) => {
      // Check if user is in a voice channel
      if (!message.member?.voice.channel) {
        return message.reply('You need to be in a voice channel to use this command!');
      }
      
      const guildId = message.guild!.id;
      const data = musicData.get(guildId);
      
      // Check if music is playing
      if (!data || !data.currentSong) {
        return message.reply('There is nothing playing that I could skip!');
      }
      
      // Skip the current song
      data.player.stop();
      
      return message.reply('⏭️ Skipped the current song!');
    }
  });
  
  // Queue command
  commands.set('queue', {
    name: 'queue',
    description: 'Shows the current song queue.',
    category: 'music',
    usage: 'queue',
    examples: ['queue'],
    cooldown: 2,
    execute: async (message: Message) => {
      const guildId = message.guild!.id;
      const data = musicData.get(guildId);
      
      // Check if there's any music data
      if (!data || (!data.currentSong && !data.queue.length)) {
        return message.reply('No songs in the queue!');
      }
      
      // Create queue list
      let queueList = '';
      
      // Add current song
      if (data.currentSong) {
        queueList += `__**Now Playing:**__\n`;
        queueList += `**[${data.currentSong.title}](${data.currentSong.url})** | \`${data.currentSong.duration}\` | Requested by: ${data.currentSong.requester}\n\n`;
      }
      
      // Add queued songs
      if (data.queue.length) {
        queueList += `__**Queue:**__\n`;
        
        data.queue.forEach((song, index) => {
          queueList += `**${index + 1}.** **[${song.title}](${song.url})** | \`${song.duration}\` | Requested by: ${song.requester}\n`;
        });
      }
      
      // Create embed
      const embed = new EmbedBuilder()
        .setTitle('Music Queue')
        .setColor(0x5865F2) // Discord blurple color
        .setDescription(queueList || 'No songs in queue.')
        .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL() });
      
      return message.reply({ embeds: [embed] });
    }
  });
  
  // Stop command
  commands.set('stop', {
    name: 'stop',
    description: 'Stops playing music and clears the queue.',
    category: 'music',
    usage: 'stop',
    examples: ['stop'],
    cooldown: 1,
    execute: async (message: Message) => {
      // Check if user is in a voice channel
      if (!message.member?.voice.channel) {
        return message.reply('You need to be in a voice channel to use this command!');
      }
      
      const guildId = message.guild!.id;
      
      // Check if bot is connected to a voice channel
      const connection = getVoiceConnection(guildId);
      if (!connection) {
        return message.reply('I\'m not connected to any voice channel!');
      }
      
      // Clear queue and stop playback
      if (musicData.has(guildId)) {
        const data = musicData.get(guildId)!;
        data.queue = [];
        data.currentSong = null;
        data.player.stop();
      }
      
      // Disconnect from voice channel
      connection.destroy();
      musicData.delete(guildId);
      
      return message.reply('⏹️ Stopped playing music and cleared the queue!');
    }
  });
}
