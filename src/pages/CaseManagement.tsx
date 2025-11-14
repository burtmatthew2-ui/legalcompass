import { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Helmet } from "react-helmet";
import { ArrowLeft, Send, FileText, Upload, Calendar, Clock, AlertCircle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CaseNotes } from "@/components/CaseNotes";
import { CaseTimeline } from "@/components/CaseTimeline";
import { CalendarExport } from "@/components/CalendarExport";

interface CaseMessage {
  id: string;
  sender_id: string;
  sender_type: 'lawyer' | 'client';
  message_content: string;
  created_at: string;
}

interface CaseDocument {
  id: string;
  document_name: string;
  document_path: string | null;
  status: 'requested' | 'uploaded' | 'approved';
  notes: string | null;
  created_at: string;
  uploaded_at: string | null;
}

interface LegalCase {
  id: string;
  legal_topic: string;
  state: string;
  urgency_level: string;
  description: string;
  snapshot_brief: string;
  status: string;
}

interface CaseDeadline {
  id: string;
  title: string;
  description: string | null;
  deadline_date: string;
  reminder_sent: boolean;
}

interface CaseMeeting {
  id: string;
  title: string;
  description: string | null;
  meeting_date: string;
  location: string | null;
  meeting_type: 'in-person' | 'phone' | 'video';
  status: 'scheduled' | 'completed' | 'cancelled';
}

const CaseManagement = () => {
  const { leadId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  
  const [caseData, setCaseData] = useState<LegalCase | null>(null);
  const [messages, setMessages] = useState<CaseMessage[]>([]);
  const [documents, setDocuments] = useState<CaseDocument[]>([]);
  const [deadlines, setDeadlines] = useState<CaseDeadline[]>([]);
  const [meetings, setMeetings] = useState<CaseMeeting[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [newDocRequest, setNewDocRequest] = useState("");
  const [newDeadline, setNewDeadline] = useState({
    title: '',
    description: '',
    deadline_date: '',
    notification_timing: '2_days'
  });
  const [newMeeting, setNewMeeting] = useState({
    title: '',
    description: '',
    meeting_date: '',
    location: '',
    meeting_type: 'video' as 'in-person' | 'phone' | 'video'
  });
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [userType, setUserType] = useState<'lawyer' | 'client' | null>(null);
  const [showCloseDialog, setShowCloseDialog] = useState(false);
  const [closeReason, setCloseReason] = useState("");
  const [closeAction, setCloseAction] = useState<'closed' | 'dropped'>('closed');

  useEffect(() => {
    loadCaseData();
    setupRealtimeSubscription();
  }, [leadId]);

  const setupRealtimeSubscription = () => {
    const channel = supabase
      .channel('case-messages-channel')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'case_messages',
          filter: `lead_id=eq.${leadId}`
        },
        (payload) => {
          setMessages(prev => [...prev, payload.new as CaseMessage]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const loadCaseData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/auth');
        return;
      }

      setCurrentUserId(user.id);

      // Load case details
      const { data: caseInfo, error: caseError } = await supabase
        .from('legal_cases')
        .select('*')
        .eq('id', leadId)
        .maybeSingle();

      if (caseError) throw caseError;
      setCaseData(caseInfo);

      // Determine user type
      const isClient = caseInfo.user_id === user.id;
      setUserType(isClient ? 'client' : 'lawyer');

      // Load messages
      const { data: msgs, error: msgsError } = await supabase
        .from('case_messages')
        .select('*')
        .eq('lead_id', leadId)
        .order('created_at', { ascending: true });

      if (msgsError) throw msgsError;
      setMessages((msgs || []) as CaseMessage[]);

      // Load documents
      const { data: docs, error: docsError } = await supabase
        .from('case_documents')
        .select('*')
        .eq('lead_id', leadId)
        .order('created_at', { ascending: false });

      if (docsError) throw docsError;
      setDocuments((docs || []) as CaseDocument[]);

      // Load deadlines and meetings if lawyer
      if (!isClient) {
        const { data: deadlineData, error: deadlineError } = await supabase
          .from('case_deadlines')
          .select('*')
          .eq('lead_id', leadId)
          .order('deadline_date', { ascending: true });
        
        if (!deadlineError) setDeadlines((deadlineData || []) as CaseDeadline[]);

        const { data: meetingData, error: meetingError } = await supabase
          .from('case_meetings')
          .select('*')
          .eq('lead_id', leadId)
          .order('meeting_date', { ascending: true });
        
        if (!meetingError) setMeetings((meetingData || []) as CaseMeeting[]);
      }

    } catch (error: any) {
      console.error('Error loading case:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const logActivity = async (activityType: string, description: string, metadata?: any) => {
    if (!currentUserId || !userType) return;

    await supabase.functions.invoke('log-activity', {
      body: {
        leadId,
        activityType,
        actorId: currentUserId,
        actorType: userType,
        description,
        metadata
      }
    });
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !userType || !currentUserId) return;

    try {
      const { error } = await supabase
        .from('case_messages')
        .insert({
          lead_id: leadId,
          sender_id: currentUserId,
          sender_type: userType,
          message_content: newMessage.trim()
        });

      if (error) throw error;

      await logActivity('message', `${userType === 'lawyer' ? 'Lawyer' : 'Client'} sent a message`);

      setNewMessage("");
      
      toast({
        title: "Message sent",
        description: "Your message has been delivered",
      });
    } catch (error: any) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const requestDocument = async () => {
    if (!newDocRequest.trim() || !currentUserId) return;

    try {
      const { error } = await supabase
        .from('case_documents')
        .insert({
          lead_id: leadId,
          document_name: newDocRequest.trim(),
          requested_by: currentUserId,
          status: 'requested'
        });

      if (error) throw error;

      await logActivity('document', `Lawyer requested document: ${newDocRequest.trim()}`);

      setNewDocRequest("");
      loadCaseData(); // Refresh documents
      
      toast({
        title: "Document requested",
        description: "Client will be notified to upload this document",
      });
    } catch (error: any) {
      console.error('Error requesting document:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const createDeadline = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUserId) return;

    try {
      const { error } = await supabase
        .from('case_deadlines')
        .insert({
          lead_id: leadId,
          lawyer_id: currentUserId,
          title: newDeadline.title,
          description: newDeadline.description,
          deadline_date: newDeadline.deadline_date,
          notification_timing: newDeadline.notification_timing
        });

      if (error) throw error;

      await logActivity('deadline', `Deadline created: ${newDeadline.title}`, {
        deadline_date: newDeadline.deadline_date,
        notification_timing: newDeadline.notification_timing
      });

      setNewDeadline({ title: '', description: '', deadline_date: '', notification_timing: '2_days' });
      loadCaseData();
      
      toast({
        title: "Deadline created",
        description: "You will be notified based on your selected timing",
      });
    } catch (error: any) {
      console.error('Error creating deadline:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const createMeeting = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUserId) return;

    try {
      const { error } = await supabase
        .from('case_meetings')
        .insert({
          lead_id: leadId,
          lawyer_id: currentUserId,
          title: newMeeting.title,
          description: newMeeting.description,
          meeting_date: newMeeting.meeting_date,
          location: newMeeting.location,
          meeting_type: newMeeting.meeting_type
        });

      if (error) throw error;

      await logActivity('meeting', `Meeting scheduled: ${newMeeting.title}`, {
        meeting_date: newMeeting.meeting_date,
        meeting_type: newMeeting.meeting_type
      });

      setNewMeeting({ title: '', description: '', meeting_date: '', location: '', meeting_type: 'video' });
      loadCaseData();
      
      toast({
        title: "Meeting scheduled",
        description: "Client will be notified of the meeting",
      });
    } catch (error: any) {
      console.error('Error creating meeting:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const closeCase = async () => {
    try {
      const response = await supabase.functions.invoke('close-case', {
        body: {
          leadId,
          reason: closeReason,
          action: closeAction
        }
      });

      if (response.error) throw response.error;

      await logActivity('status_change', `Case ${closeAction}: ${closeReason}`);

      toast({
        title: "Case closed",
        description: "The case has been closed and client has been notified",
      });

      setShowCloseDialog(false);
      navigate('/lawyer-dashboard');
    } catch (error: any) {
      console.error('Error closing case:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading case details...</p>
      </div>
    );
  }

  if (!caseData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Case not found</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Case Management - Legal Compass</title>
      </Helmet>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Button
          variant="ghost"
          className="mb-4"
          onClick={() => navigate(userType === 'lawyer' ? '/lawyer-dashboard' : '/user-portal')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{caseData.legal_topic}</CardTitle>
            <CardDescription>
              {caseData.state} • {caseData.urgency_level} urgency
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{caseData.snapshot_brief}</p>
          </CardContent>
        </Card>

        <Tabs defaultValue="messages" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            {userType === 'lawyer' && <TabsTrigger value="notes">Notes</TabsTrigger>}
            {userType === 'lawyer' && <TabsTrigger value="deadlines">Deadlines</TabsTrigger>}
            {userType === 'lawyer' && <TabsTrigger value="meetings">Meetings</TabsTrigger>}
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
          </TabsList>

          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle>Secure Messages</CardTitle>
                <CardDescription>
                  End-to-end encrypted communication
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-4 max-h-[500px] overflow-y-auto">
                  {messages.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      No messages yet. Start the conversation!
                    </p>
                  ) : (
                    messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${
                          msg.sender_id === currentUserId ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg p-3 ${
                            msg.sender_id === currentUserId
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="text-xs">
                              {msg.sender_type}
                            </Badge>
                            <span className="text-xs opacity-70">
                              {new Date(msg.created_at).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-sm">{msg.message_content}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="flex gap-2">
                  <Textarea
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                    className="min-h-[80px]"
                  />
                  <Button onClick={sendMessage} disabled={!newMessage.trim()}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>Document Requests</CardTitle>
                <CardDescription>
                  Request and manage case documents
                </CardDescription>
              </CardHeader>
              <CardContent>
                {userType === 'lawyer' && (
                  <div className="flex gap-2 mb-6">
                    <Input
                      placeholder="Document name (e.g., Employment Contract, Pay Stubs)"
                      value={newDocRequest}
                      onChange={(e) => setNewDocRequest(e.target.value)}
                    />
                    <Button onClick={requestDocument} disabled={!newDocRequest.trim()}>
                      <FileText className="w-4 h-4 mr-2" />
                      Request
                    </Button>
                  </div>
                )}

                <div className="space-y-3">
                  {documents.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      No document requests yet
                    </p>
                  ) : (
                    documents.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{doc.document_name}</p>
                            <p className="text-xs text-muted-foreground">
                              Requested {new Date(doc.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant={
                            doc.status === 'uploaded'
                              ? 'default'
                              : doc.status === 'approved'
                              ? 'secondary'
                              : 'outline'
                          }
                        >
                          {doc.status}
                        </Badge>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {userType === 'lawyer' && (
            <>
              <TabsContent value="notes">
                {currentUserId && (
                  <CaseNotes leadId={leadId!} lawyerId={currentUserId} />
                )}
              </TabsContent>

              <TabsContent value="deadlines">
                <Card>
                  <CardHeader>
                    <CardTitle>Case Deadlines</CardTitle>
                    <CardDescription>
                      Set and track important deadlines
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={createDeadline} className="space-y-4 mb-6">
                      <div className="space-y-2">
                        <Label htmlFor="deadline-title">Title</Label>
                        <Input
                          id="deadline-title"
                          placeholder="Filing deadline, Court appearance, etc."
                          value={newDeadline.title}
                          onChange={(e) => setNewDeadline({ ...newDeadline, title: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="deadline-description">Description (Optional)</Label>
                        <Textarea
                          id="deadline-description"
                          placeholder="Additional details..."
                          value={newDeadline.description}
                          onChange={(e) => setNewDeadline({ ...newDeadline, description: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="deadline-date">Deadline Date & Time</Label>
                        <Input
                          id="deadline-date"
                          type="datetime-local"
                          value={newDeadline.deadline_date}
                          onChange={(e) => setNewDeadline({ ...newDeadline, deadline_date: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="notification_timing">Notify Me</Label>
                        <select
                          id="notification_timing"
                          value={newDeadline.notification_timing}
                          onChange={(e) => setNewDeadline({ ...newDeadline, notification_timing: e.target.value })}
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <option value="1_week">1 Week Before</option>
                          <option value="3_days">3 Days Before</option>
                          <option value="2_days">2 Days Before</option>
                          <option value="1_day">1 Day Before</option>
                          <option value="12_hours">12 Hours Before</option>
                        </select>
                      </div>
                      <Button type="submit">Add Deadline</Button>
                    </form>

                    <div className="space-y-3">
                      {deadlines.length === 0 ? (
                        <p className="text-center text-muted-foreground py-8">
                          No deadlines set
                        </p>
                      ) : (
                        deadlines.map((deadline) => (
                          <div
                            key={deadline.id}
                            className="flex items-start justify-between p-4 border rounded-lg"
                          >
                            <div className="flex items-start gap-3">
                              <Clock className="w-5 h-5 text-muted-foreground mt-0.5" />
                              <div>
                                <p className="font-medium">{deadline.title}</p>
                                {deadline.description && (
                                  <p className="text-sm text-muted-foreground">{deadline.description}</p>
                                )}
                                <p className="text-xs text-muted-foreground mt-1">
                                  Due: {new Date(deadline.deadline_date).toLocaleString()}
                                </p>
                              </div>
                            </div>
                            {deadline.reminder_sent && (
                              <Badge variant="secondary">Reminded</Badge>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="meetings">
                <Card>
                  <CardHeader>
                    <CardTitle>Schedule Meetings</CardTitle>
                    <CardDescription>
                      Schedule appointments with your client
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={createMeeting} className="space-y-4 mb-6">
                      <div className="space-y-2">
                        <Label htmlFor="meeting-title">Meeting Title</Label>
                        <Input
                          id="meeting-title"
                          placeholder="Initial consultation, Case review, etc."
                          value={newMeeting.title}
                          onChange={(e) => setNewMeeting({ ...newMeeting, title: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="meeting-description">Description (Optional)</Label>
                        <Textarea
                          id="meeting-description"
                          placeholder="Agenda and discussion points..."
                          value={newMeeting.description}
                          onChange={(e) => setNewMeeting({ ...newMeeting, description: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="meeting-date">Date & Time</Label>
                        <Input
                          id="meeting-date"
                          type="datetime-local"
                          value={newMeeting.meeting_date}
                          onChange={(e) => setNewMeeting({ ...newMeeting, meeting_date: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="meeting-type">Meeting Type</Label>
                        <Select
                          value={newMeeting.meeting_type}
                          onValueChange={(value: 'in-person' | 'phone' | 'video') => 
                            setNewMeeting({ ...newMeeting, meeting_type: value })
                          }
                        >
                          <SelectTrigger id="meeting-type">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="video">Video Call</SelectItem>
                            <SelectItem value="phone">Phone Call</SelectItem>
                            <SelectItem value="in-person">In Person</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {(newMeeting.meeting_type === 'video' || newMeeting.meeting_type === 'in-person') && (
                        <div className="space-y-2">
                          <Label htmlFor="meeting-location">
                            {newMeeting.meeting_type === 'video' ? 'Video Link' : 'Location'}
                          </Label>
                          <Input
                            id="meeting-location"
                            placeholder={
                              newMeeting.meeting_type === 'video' 
                                ? 'https://zoom.us/...' 
                                : 'Office address or meeting location'
                            }
                            value={newMeeting.location}
                            onChange={(e) => setNewMeeting({ ...newMeeting, location: e.target.value })}
                          />
                        </div>
                      )}
                      <Button type="submit">Schedule Meeting</Button>
                    </form>

                    <div className="space-y-3">
                      {meetings.length === 0 ? (
                        <p className="text-center text-muted-foreground py-8">
                          No meetings scheduled
                        </p>
                      ) : (
                        meetings.map((meeting) => (
                          <div
                            key={meeting.id}
                            className="flex items-start justify-between p-4 border rounded-lg"
                          >
                            <div className="flex items-start gap-3">
                              <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
                              <div>
                                <p className="font-medium">{meeting.title}</p>
                                {meeting.description && (
                                  <p className="text-sm text-muted-foreground">{meeting.description}</p>
                                )}
                                <p className="text-xs text-muted-foreground mt-1">
                                  {new Date(meeting.meeting_date).toLocaleString()}
                                </p>
                                <div className="flex gap-2 mt-2">
                                  <Badge variant="outline">{meeting.meeting_type}</Badge>
                                  <Badge variant={
                                    meeting.status === 'completed' ? 'secondary' :
                                    meeting.status === 'cancelled' ? 'destructive' : 'default'
                                  }>
                                    {meeting.status}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </>
          )}

          <TabsContent value="timeline">
            <CaseTimeline leadId={leadId!} />
          </TabsContent>
        </Tabs>

        {userType === 'lawyer' && currentUserId && deadlines.length + meetings.length > 0 && (
          <div className="mt-6">
            <CalendarExport
              events={[
                ...deadlines.map(d => ({
                  id: d.id,
                  title: `Deadline: ${d.title}`,
                  description: d.description || undefined,
                  start: new Date(d.deadline_date)
                })),
                ...meetings.map(m => ({
                  id: m.id,
                  title: m.title,
                  description: m.description || undefined,
                  start: new Date(m.meeting_date),
                  location: m.location || undefined
                }))
              ]}
              calendarName={`${caseData.legal_topic} - Case Calendar`}
            />
          </div>
        )}

        {userType === 'lawyer' && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Case Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Dialog open={showCloseDialog} onOpenChange={setShowCloseDialog}>
                <DialogTrigger asChild>
                  <Button variant="destructive">Close Case</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Close Case</DialogTitle>
                    <DialogDescription>
                      This will notify the client and close the case. Please provide a reason.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Action</Label>
                      <Select
                        value={closeAction}
                        onValueChange={(value: 'closed' | 'dropped') => setCloseAction(value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="closed">Case Resolved</SelectItem>
                          <SelectItem value="dropped">Drop Case</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="close-reason">Reason</Label>
                      <Textarea
                        id="close-reason"
                        placeholder="Explain why the case is being closed..."
                        value={closeReason}
                        onChange={(e) => setCloseReason(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowCloseDialog(false)}>
                      Cancel
                    </Button>
                    <Button variant="destructive" onClick={closeCase} disabled={!closeReason.trim()}>
                      Confirm Close
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
};

export default CaseManagement;
