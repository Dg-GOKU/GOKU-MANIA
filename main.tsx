import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import App from "./App";
import "./index.css";
import { BotProvider } from "./components/BotContext";

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <BotProvider>
      <App />
    </BotProvider>
  </QueryClientProvider>
);
