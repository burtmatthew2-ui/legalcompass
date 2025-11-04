import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Conversation {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export const useChatHistory = (conversationId?: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(false);

  // Load conversations list
  const loadConversations = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('chat_conversations')
      .select('id, title, created_at, updated_at')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false });

    if (!error && data) {
      setConversations(data);
    }
  };

  // Load messages for current conversation
  const loadMessages = async (convId: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    setLoading(true);
    
    try {
      // Load conversation data and messages in parallel
      const [convResult, messagesResult] = await Promise.all([
        supabase
          .from('chat_conversations')
          .select('id, title, created_at, updated_at')
          .eq('id', convId)
          .eq('user_id', user.id)
          .maybeSingle(),
        supabase
          .from('chat_messages')
          .select('role, content, created_at')
          .eq('conversation_id', convId)
          .eq('user_id', user.id)
          .order('created_at', { ascending: true })
      ]);

      if (convResult.error) {
        console.error('Error loading conversation:', convResult.error);
        return;
      }

      if (convResult.data) {
        setCurrentConversation(convResult.data);
      }

      if (!messagesResult.error && messagesResult.data) {
        setMessages(messagesResult.data.map(msg => ({ 
          role: msg.role as "user" | "assistant", 
          content: msg.content 
        })));
      }
    } finally {
      setLoading(false);
    }
  };

  // Create new conversation
  const createConversation = async (firstMessage: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    // Truncate to avoid issues with very long first messages
    const maxLength = 50;
    const title = firstMessage.length > maxLength 
      ? firstMessage.substring(0, maxLength) + '...' 
      : firstMessage;

    const { data, error } = await supabase
      .from('chat_conversations')
      .insert({
        user_id: user.id,
        title,
      })
      .select()
      .single();

    if (!error && data) {
      setCurrentConversation(data);
      await loadConversations();
      return data.id;
    }
    return null;
  };

  // Save message to database
  const saveMessage = async (message: Message) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || !currentConversation) return;

    await supabase
      .from('chat_messages')
      .insert({
        conversation_id: currentConversation.id,
        user_id: user.id,
        role: message.role,
        content: message.content,
      });

    // Update conversation timestamp
    await supabase
      .from('chat_conversations')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', currentConversation.id);
  };

  // Delete conversation
  const deleteConversation = async (convId: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase
      .from('chat_conversations')
      .delete()
      .eq('id', convId)
      .eq('user_id', user.id);

    if (convId === currentConversation?.id) {
      setCurrentConversation(null);
      setMessages([]);
    }
    await loadConversations();
  };

  useEffect(() => {
    loadConversations();
  }, []);

  return {
    messages,
    setMessages,
    currentConversation,
    setCurrentConversation,
    conversations,
    loading,
    createConversation,
    saveMessage,
    deleteConversation,
    loadConversations,
    loadMessages,
  };
};
