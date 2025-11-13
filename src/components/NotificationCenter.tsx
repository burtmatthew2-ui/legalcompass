import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Bell, X, Check, FileText, MessageSquare, Calendar, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Notification {
  id: string;
  type: 'message' | 'document' | 'deadline' | 'meeting' | 'case_update';
  title: string;
  description: string;
  read: boolean;
  created_at: string;
  link?: string;
}

export const NotificationCenter = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadNotifications();
    setupRealtimeSubscription();
  }, []);

  const setupRealtimeSubscription = () => {
    const channel = supabase
      .channel('notifications-channel')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'case_messages',
        },
        () => {
          loadNotifications();
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'case_documents',
        },
        () => {
          loadNotifications();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const loadNotifications = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const mockNotifications: Notification[] = [];

      // Load unread messages
      const { data: messages } = await supabase
        .from('case_messages')
        .select('*, legal_cases!inner(user_id)')
        .neq('sender_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      messages?.forEach(msg => {
        mockNotifications.push({
          id: msg.id,
          type: 'message',
          title: 'New Message',
          description: msg.message_content.substring(0, 50) + '...',
          read: false,
          created_at: msg.created_at,
          link: `/client-case/${msg.lead_id}`
        });
      });

      setNotifications(mockNotifications);
      setUnreadCount(mockNotifications.filter(n => !n.read).length);

    } catch (error) {
      console.error('Error loading notifications:', error);
    }
  };

  const markAsRead = async (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'message': return <MessageSquare className="w-4 h-4" />;
      case 'document': return <FileText className="w-4 h-4" />;
      case 'deadline': return <AlertCircle className="w-4 h-4" />;
      case 'meeting': return <Calendar className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <Badge 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
              variant="destructive"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              <Check className="w-4 h-4 mr-1" />
              Mark all read
            </Button>
          )}
        </div>
        <ScrollArea className="h-[400px]">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <Bell className="w-12 h-12 mx-auto mb-2 opacity-20" />
              <p>No notifications</p>
            </div>
          ) : (
            <div className="divide-y">
              {notifications.map(notification => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-muted/50 cursor-pointer transition-colors ${
                    !notification.read ? 'bg-primary/5' : ''
                  }`}
                  onClick={() => {
                    markAsRead(notification.id);
                    if (notification.link) {
                      navigate(notification.link);
                      setOpen(false);
                    }
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 ${!notification.read ? 'text-primary' : 'text-muted-foreground'}`}>
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-sm">{notification.title}</p>
                        {!notification.read && (
                          <div className="w-2 h-2 rounded-full bg-primary" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {notification.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(notification.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};
