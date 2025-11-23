import { User, Bot } from "lucide-react";
import { memo, useMemo } from "react";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessageComponent = ({ message }: ChatMessageProps) => {
  const isUser = message.role === "user";

  // Simple rendering without chunking - React handles this efficiently
  const content = useMemo(() => message.content, [message.content]);

  return (
    <div className={`flex gap-6 ${isUser ? "justify-end" : "justify-start"} animate-fade-in will-change-transform`}>
      {!isUser && (
        <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-[var(--gradient-primary)] flex items-center justify-center shadow-[var(--shadow-glow)]">
          <Bot className="w-6 h-6 text-primary-foreground" />
        </div>
      )}
      
      <div
        className={`max-w-[75%] sm:max-w-[70%] rounded-2xl p-4 sm:p-6 shadow-lg backdrop-blur-sm transition-all duration-300 ${
          isUser
            ? "bg-primary text-primary-foreground font-medium"
            : "bg-card/70 border border-border/50 text-foreground hover:border-primary/30"
        }`}
        style={{ 
          wordBreak: 'break-word',
          overflowWrap: 'break-word',
          maxWidth: '100%',
          overflow: 'hidden'
        }}
      >
        <div className="prose prose-invert max-w-none break-words overflow-hidden [&>p]:leading-relaxed [&>ul]:my-4 [&>ol]:my-4 [&>li]:my-2 [&>h1]:text-xl [&>h2]:text-lg [&>h3]:text-base [&>pre]:overflow-x-auto [&>pre]:max-w-full [&>*]:max-w-full">
          <ReactMarkdown>{content}</ReactMarkdown>
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

export const ChatMessage = memo(ChatMessageComponent);
