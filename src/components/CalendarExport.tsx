import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Event {
  id: string;
  title: string;
  description?: string;
  start: Date;
  end?: Date;
  location?: string;
}

interface CalendarExportProps {
  events: Event[];
  calendarName: string;
}

export const CalendarExport = ({ events, calendarName }: CalendarExportProps) => {
  const { toast } = useToast();

  const formatDateForICal = (date: Date): string => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const generateICalContent = (): string => {
    const lines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Legal Compass//Case Management//EN',
      `X-WR-CALNAME:${calendarName}`,
      'X-WR-TIMEZONE:UTC'
    ];

    events.forEach(event => {
      const start = new Date(event.start);
      const end = event.end ? new Date(event.end) : new Date(start.getTime() + 60 * 60 * 1000); // 1 hour default

      lines.push(
        'BEGIN:VEVENT',
        `UID:${event.id}@legalcompass.app`,
        `DTSTAMP:${formatDateForICal(new Date())}`,
        `DTSTART:${formatDateForICal(start)}`,
        `DTEND:${formatDateForICal(end)}`,
        `SUMMARY:${event.title.replace(/[,\n]/g, ' ')}`,
        event.description ? `DESCRIPTION:${event.description.replace(/[,\n]/g, ' ')}` : '',
        event.location ? `LOCATION:${event.location.replace(/[,\n]/g, ' ')}` : '',
        'STATUS:CONFIRMED',
        'SEQUENCE:0',
        'END:VEVENT'
      );
    });

    lines.push('END:VCALENDAR');
    return lines.filter(l => l).join('\r\n');
  };

  const downloadICalFile = () => {
    try {
      const content = generateICalContent();
      const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `${calendarName.replace(/\s+/g, '_')}.ics`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "Calendar exported",
        description: "Import the .ics file into your calendar app",
      });
    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: "Export failed",
        description: "Could not generate calendar file",
        variant: "destructive",
      });
    }
  };

  const generateGoogleCalendarUrl = () => {
    if (events.length === 0) {
      toast({
        title: "No events",
        description: "There are no events to export",
        variant: "destructive",
      });
      return;
    }

    // Google Calendar only supports single event URLs, so we'll use the first event
    const event = events[0];
    const start = new Date(event.start);
    const end = event.end ? new Date(event.end) : new Date(start.getTime() + 60 * 60 * 1000);

    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: event.title,
      dates: `${formatDateForICal(start)}/${formatDateForICal(end)}`,
      details: event.description || '',
      location: event.location || '',
    });

    window.open(`https://calendar.google.com/calendar/render?${params.toString()}`, '_blank');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Calendar Integration
        </CardTitle>
        <CardDescription>
          Export deadlines and meetings to your calendar
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Button 
            variant="outline" 
            className="w-full justify-start" 
            onClick={downloadICalFile}
            disabled={events.length === 0}
          >
            <Download className="w-4 h-4 mr-2" />
            Download .ics file (Apple Calendar, Outlook, etc.)
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start" 
            onClick={generateGoogleCalendarUrl}
            disabled={events.length === 0}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Add to Google Calendar
          </Button>
          {events.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-2">
              No events to export
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};