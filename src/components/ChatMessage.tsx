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

  // Optimize rendering for mobile performance
  const shouldChunk = useMemo(() => {
    return !isUser && message.content.length > 2000;
  }, [message.content.length, isUser]);

  const contentChunks = useMemo(() => {
    if (isUser || !shouldChunk) return [message.content];
    
    // Only chunk very long messages to prevent mobile freeze
    const chunkSize = 1000;
    const chunks: string[] = [];
    for (let i = 0; i < message.content.length; i += chunkSize) {
      chunks.push(message.content.slice(i, i + chunkSize));
    }
    return chunks;
  }, [message.content, isUser, shouldChunk]);

  return (
    <div className={`flex gap-6 ${isUser ? "justify-end" : "justify-start"} animate-fade-in will-change-transform`}>
      {!isUser && (
        <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-[var(--gradient-primary)] flex items-center justify-center shadow-[var(--shadow-glow)]">
          <Bot className="w-6 h-6 text-white" />
        </div>
      )}
      
      <div
        className={`max-w-[75%] rounded-2xl p-6 shadow-lg backdrop-blur-sm transition-all duration-300 ${
          isUser
            ? "bg-primary text-primary-foreground font-medium"
            : "bg-card/70 border border-border/50 text-foreground hover:border-primary/30"
        }`}
        style={{ 
          wordBreak: 'break-word',
          overflowWrap: 'anywhere',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        <div className="prose prose-invert max-w-none break-words [&>p]:leading-relaxed [&>ul]:my-4 [&>ol]:my-4 [&>li]:my-2 [&>h1]:text-2xl [&>h2]:text-xl [&>h3]:text-lg [&>pre]:overflow-x-auto [&>pre]:max-w-full">
          {shouldChunk ? (
            // Chunk only very long messages to prevent mobile freeze
            contentChunks.map((chunk, idx) => (
              <div key={idx} style={{ contain: 'content' }}>
                <ReactMarkdown>{chunk}</ReactMarkdown>
              </div>
            ))
          ) : (
            <ReactMarkdown>{message.content}</ReactMarkdown>
          )}
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
