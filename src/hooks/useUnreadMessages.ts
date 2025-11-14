import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUserRole } from './useUserRole';

export const useUnreadMessages = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const { role, loading: roleLoading } = useUserRole();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (roleLoading || !role) {
      setLoading(false);
      return;
    }

    const fetchUnreadCount = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setUnreadCount(0);
          setLoading(false);
          return;
        }

        const { data, error } = await supabase.rpc('get_unread_message_count', {
          user_id: user.id,
          user_role: role
        });

        if (error) {
          console.error('Error fetching unread count:', error);
        } else {
          setUnreadCount(data || 0);
        }
      } catch (error) {
        console.error('Error in fetchUnreadCount:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUnreadCount();

    // Subscribe to realtime changes
    const channel = supabase
      .channel('unread-messages')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'case_messages'
        },
        () => {
          fetchUnreadCount();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [role, roleLoading]);

  return { unreadCount, loading };
};
