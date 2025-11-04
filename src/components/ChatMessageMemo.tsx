import { memo } from "react";
import { ChatMessage } from "./ChatMessage";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatMessageMemoProps {
  message: Message;
}

export const ChatMessageMemo = memo(({ message }: ChatMessageMemoProps) => {
  return <ChatMessage message={message} />;
}, (prevProps, nextProps) => {
  // Only re-render if message content or role changes
  return prevProps.message.content === nextProps.message.content &&
         prevProps.message.role === nextProps.message.role;
});

ChatMessageMemo.displayName = 'ChatMessageMemo';
