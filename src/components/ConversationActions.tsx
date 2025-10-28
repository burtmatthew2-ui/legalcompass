import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSubscription } from "@/hooks/useSubscription";
import { Button } from "@/components/ui/button";
import { Download, Share2, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ConversationActionsProps {
  messages: Message[];
  conversationId: string | null;
}

export const ConversationActions = ({ messages, conversationId }: ConversationActionsProps) => {
  const { subscription } = useSubscription();
  const navigate = useNavigate();
  const [isExporting, setIsExporting] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [showShareDialog, setShowShareDialog] = useState(false);

  const handleExport = () => {
    if (!subscription?.subscribed) {
      toast.error("Subscription required to export conversations");
      navigate("/pricing");
      return;
    }
    
    setIsExporting(true);
    try {
      // Create a text file with conversation
      const content = messages
        .map((msg) => `${msg.role.toUpperCase()}:\n${msg.content}\n\n`)
        .join("---\n\n");

      const blob = new Blob([content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `conversation_${Date.now()}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success("Conversation exported successfully");
    } catch (error) {
      toast.error("Failed to export conversation");
    } finally {
      setIsExporting(false);
    }
  };

  const handleShare = async () => {
    if (!subscription?.subscribed) {
      toast.error("Subscription required to share conversations");
      navigate("/pricing");
      return;
    }
    
    if (!conversationId) {
      toast.error("No conversation to share");
      return;
    }

    const url = `${window.location.origin}/shared/${conversationId}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Legal Research Conversation",
          url: url,
        });
        toast.success("Shared successfully");
      } catch (error) {
        // User cancelled share
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(url);
      setShareUrl(url);
      setShowShareDialog(true);
      toast.success("Link copied to clipboard");
    }
  };

  const handleBookmark = async (messageId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { error } = await supabase
        .from("bookmarked_messages")
        .insert({
          user_id: user.id,
          message_id: messageId,
        });

      if (error) {
        if (error.code === "23505") {
          toast.info("Message already bookmarked");
        } else {
          throw error;
        }
      } else {
        toast.success("Message bookmarked");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to bookmark message");
    }
  };

  return (
    <>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleExport}
          disabled={isExporting || messages.length === 0}
        >
          {isExporting ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Download className="h-4 w-4 mr-2" />
          )}
          Export
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleShare}
          disabled={!conversationId}
        >
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      </div>

      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Conversation</DialogTitle>
            <DialogDescription>
              The link has been copied to your clipboard
            </DialogDescription>
          </DialogHeader>
          <div className="p-4 bg-muted rounded-md">
            <code className="text-sm break-all">{shareUrl}</code>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
