import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Trash2, Loader2, Bookmark } from "lucide-react";
import { toast } from "sonner";
import { ChatMessage } from "@/components/ChatMessage";

interface BookmarkedMessage {
  id: string;
  message_id: string;
  note: string | null;
  created_at: string;
  chat_messages: {
    role: string;
    content: string;
  };
}

const Bookmarks = () => {
  const navigate = useNavigate();
  const [bookmarks, setBookmarks] = useState<BookmarkedMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = async () => {
    try {
      const { data, error } = await supabase
        .from("bookmarked_messages")
        .select(`
          id,
          message_id,
          note,
          created_at,
          chat_messages (
            role,
            content
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setBookmarks(data || []);
    } catch (error: any) {
      console.error("Error loading bookmarks:", error);
      toast.error("Failed to load bookmarks");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("bookmarked_messages")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setBookmarks((prev) => prev.filter((b) => b.id !== id));
      toast.success("Bookmark removed");
    } catch (error: any) {
      toast.error("Failed to remove bookmark");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex flex-col">
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-xl shadow-lg">
        <div className="max-w-5xl mx-auto px-6 py-6 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-[var(--gradient-primary)]">
              Bookmarked Messages
            </h2>
            <p className="text-sm text-muted-foreground">
              {bookmarks.length} {bookmarks.length === 1 ? "bookmark" : "bookmarks"}
            </p>
          </div>
        </div>
      </header>

      <ScrollArea className="flex-1 px-6">
        <div className="max-w-5xl mx-auto py-12 space-y-6">
          {bookmarks.length === 0 ? (
            <div className="text-center py-24">
              <Bookmark className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground text-lg">
                No bookmarks yet. Bookmark important messages to find them later.
              </p>
            </div>
          ) : (
            bookmarks.map((bookmark) => (
              <div
                key={bookmark.id}
                className="relative p-6 rounded-2xl bg-card/50 border border-border/50"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4"
                  onClick={() => handleDelete(bookmark.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <ChatMessage
                  message={{
                    role: bookmark.chat_messages.role as "user" | "assistant",
                    content: bookmark.chat_messages.content,
                  }}
                />
                {bookmark.note && (
                  <div className="mt-4 p-3 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>Note:</strong> {bookmark.note}
                    </p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Bookmarks;
