import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import Commands from "@/pages/Commands";
import Welcome from "@/pages/Welcome";
import ServerManagement from "@/pages/ServerManagement";
import Moderation from "@/pages/Moderation";
import Utility from "@/pages/Utility";
import Fun from "@/pages/Fun";
import Music from "@/pages/Music";
import Configuration from "@/pages/Configuration";
import Permissions from "@/pages/Permissions";
import Logs from "@/pages/Logs";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/commands" component={Commands} />
      <Route path="/welcome" component={Welcome} />
      <Route path="/server-management" component={ServerManagement} />
      <Route path="/moderation" component={Moderation} />
      <Route path="/utility" component={Utility} />
      <Route path="/fun" component={Fun} />
      <Route path="/music" component={Music} />
      <Route path="/configuration" component={Configuration} />
      <Route path="/permissions" component={Permissions} />
      <Route path="/logs" component={Logs} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="h-screen flex flex-col">
          <Toaster />
          <Router />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
