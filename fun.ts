import { DiscordBot } from '../bot';
import { Command } from './index';
import { Message, EmbedBuilder } from 'discord.js';

// Collection of jokes
const jokes = [
  { setup: "Why did the scarecrow win an award?", punchline: "Because he was outstanding in his field!" },
  { setup: "What do you call a fish with no eyes?", punchline: "Fsh!" },
  { setup: "I told my wife she was drawing her eyebrows too high.", punchline: "She looked surprised." },
  { setup: "What do you call a deer with no eyes?", punchline: "No idea (no eye deer)!" },
  { setup: "How do you organize a space party?", punchline: "You planet!" },
  { setup: "What's the best thing about Switzerland?", punchline: "I don't know, but the flag is a big plus!" },
  { setup: "Did you hear about the mathematician who's afraid of negative numbers?", punchline: "He'll stop at nothing to avoid them!" },
  { setup: "Why don't scientists trust atoms?", punchline: "Because they make up everything!" },
  { setup: "What did the janitor say when he jumped out of the closet?", punchline: "Supplies!" },
  { setup: "Why don't eggs tell jokes?", punchline: "They'd crack each other up!" }
];

// 8Ball responses
const eightBallResponses = [
  "It is certain.",
  "It is decidedly so.",
  "Without a doubt.",
  "Yes definitely.",
  "You may rely on it.",
  "As I see it, yes.",
  "Most likely.",
  "Outlook good.",
  "Yes.",
  "Signs point to yes.",
  "Reply hazy, try again.",
  "Ask again later.",
  "Better not tell you now.",
  "Cannot predict now.",
  "Concentrate and ask again.",
  "Don't count on it.",
  "My reply is no.",
  "My sources say no.",
  "Outlook not so good.",
  "Very doubtful."
];

export function registerFunCommands(bot: DiscordBot, commands: Map<string, Command>): void {
  // Joke command
  commands.set('joke', {
    name: 'joke',
    description: 'Tells a random joke from our collection.',
    category: 'fun',
    usage: 'joke',
    examples: ['joke'],
    cooldown: 3,
    execute: async (message: Message) => {
      // Select a random joke from the collection
      const joke = jokes[Math.floor(Math.random() * jokes.length)];
      
      // Create embed
      const embed = new EmbedBuilder()
        .setTitle('Here\'s a joke!')
        .setColor(0x57F287) // Discord green color
        .setDescription(`${joke.setup}\n\n*${joke.punchline}*`)
        .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL() });
      
      return message.reply({ embeds: [embed] });
    }
  });
  
  // 8Ball command
  commands.set('8ball', {
    name: '8ball',
    description: 'Ask the magic 8ball a question and receive a mysterious answer.',
    category: 'fun',
    usage: '8ball question',
    examples: ['8ball Will I win the lottery?'],
    cooldown: 2,
    execute: async (message: Message, args: string[]) => {
      // Check if a question was asked
      if (!args.length) {
        return message.reply('You need to ask a question!');
      }
      
      // Get the question
      const question = args.join(' ');
      
      // Get a random response
      const response = eightBallResponses[Math.floor(Math.random() * eightBallResponses.length)];
      
      // Create embed
      const embed = new EmbedBuilder()
        .setTitle('🎱 Magic 8-Ball')
        .setColor(0x5865F2) // Discord blurple color
        .addFields(
          { name: 'Question', value: question },
          { name: 'Answer', value: response }
        )
        .setFooter({ text: `Asked by ${message.author.tag}`, iconURL: message.author.displayAvatarURL() });
      
      return message.reply({ embeds: [embed] });
    }
  });
  
  // Coin flip command
  commands.set('flip', {
    name: 'flip',
    description: 'Flips a coin and tells you if it\'s heads or tails.',
    category: 'fun',
    usage: 'flip',
    examples: ['flip'],
    cooldown: 1,
    execute: async (message: Message) => {
      // Flip the coin
      const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
      
      // Create embed
      const embed = new EmbedBuilder()
        .setTitle('Coin Flip')
        .setColor(0xFEE75C) // Discord yellow color
        .setDescription(`🪙 The coin landed on: **${result}**!`)
        .setFooter({ text: `Flipped by ${message.author.tag}`, iconURL: message.author.displayAvatarURL() });
      
      return message.reply({ embeds: [embed] });
    }
  });
}
