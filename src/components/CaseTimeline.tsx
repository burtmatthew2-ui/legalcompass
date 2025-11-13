import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, FileText, Clock, Calendar, StickyNote, AlertCircle } from "lucide-react";

interface TimelineEvent {
  id: string;
  activity_type: string;
  actor_type: string;
  description: string;
  metadata: any;
  created_at: string;
}

interface CaseTimelineProps {
  leadId: string;
}

export const CaseTimeline = ({ leadId }: CaseTimelineProps) => {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    fetchTimeline();
    setupRealtimeSubscription();
  }, [leadId]);

  const fetchTimeline = async () => {
    const { data, error } = await supabase
      .from('case_activity_log')
      .select('*')
      .eq('lead_id', leadId)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setEvents(data as TimelineEvent[]);
    }
  };

  const setupRealtimeSubscription = () => {
    const channel = supabase
      .channel('activity-log-channel')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'case_activity_log',
          filter: `lead_id=eq.${leadId}`
        },
        (payload) => {
          setEvents(prev => [payload.new as TimelineEvent, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'message': return <MessageSquare className="w-5 h-5" />;
      case 'document': return <FileText className="w-5 h-5" />;
      case 'deadline': return <Clock className="w-5 h-5" />;
      case 'meeting': return <Calendar className="w-5 h-5" />;
      case 'note': return <StickyNote className="w-5 h-5" />;
      case 'status_change': return <AlertCircle className="w-5 h-5" />;
      default: return <AlertCircle className="w-5 h-5" />;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'message': return 'text-blue-500';
      case 'document': return 'text-green-500';
      case 'deadline': return 'text-red-500';
      case 'meeting': return 'text-purple-500';
      case 'note': return 'text-yellow-500';
      case 'status_change': return 'text-orange-500';
      default: return 'text-gray-500';
    }
  };

  const filteredEvents = filter === 'all' 
    ? events 
    : events.filter(e => e.activity_type === filter);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Case Timeline</CardTitle>
            <CardDescription>Complete activity history</CardDescription>
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Activities</SelectItem>
              <SelectItem value="message">Messages</SelectItem>
              <SelectItem value="document">Documents</SelectItem>
              <SelectItem value="deadline">Deadlines</SelectItem>
              <SelectItem value="meeting">Meetings</SelectItem>
              <SelectItem value="note">Notes</SelectItem>
              <SelectItem value="status_change">Status Changes</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative space-y-4">
          {filteredEvents.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No activity yet
            </p>
          ) : (
            <div className="space-y-6">
              {filteredEvents.map((event, index) => (
                <div key={event.id} className="relative flex gap-4">
                  {index !== filteredEvents.length - 1 && (
                    <div className="absolute left-[20px] top-[40px] bottom-[-24px] w-[2px] bg-border" />
                  )}
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-background border-2 flex items-center justify-center ${getEventColor(event.activity_type)}`}>
                    {getEventIcon(event.activity_type)}
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline">{event.activity_type.replace('_', ' ')}</Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(event.created_at).toLocaleDateString()} at {new Date(event.created_at).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-sm">{event.description}</p>
                    {event.metadata && Object.keys(event.metadata).length > 0 && (
                      <div className="mt-2 p-2 bg-muted rounded text-xs">
                        <pre className="whitespace-pre-wrap">
                          {JSON.stringify(event.metadata, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};