import { User, Bot } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === "user";

  return (
    <div className={`flex gap-6 ${isUser ? "justify-end" : "justify-start"} animate-fade-in`}>
      {!isUser && (
        <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-[var(--gradient-primary)] flex items-center justify-center shadow-[var(--shadow-glow)]">
          <Bot className="w-6 h-6 text-white" />
        </div>
      )}
      
      <div
        className={`max-w-[75%] rounded-2xl p-6 shadow-lg backdrop-blur-sm transition-all duration-300 ${
          isUser
            ? "bg-[var(--gradient-accent)] text-background font-medium"
            : "bg-card/70 border border-border/50 text-foreground hover:border-primary/30"
        }`}
      >
        <div className="prose prose-invert max-w-none [&>p]:leading-relaxed [&>ul]:my-4 [&>ol]:my-4 [&>li]:my-2 [&>h1]:text-2xl [&>h2]:text-xl [&>h3]:text-lg">
          <ReactMarkdown>{message.content}</ReactMarkdown>
        </div>
      </div>

      {isUser && (
        <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center border-2 border-primary/50 shadow-lg">
          <User className="w-6 h-6 text-primary" />
        </div>
      )}
    </div>
  );
};
