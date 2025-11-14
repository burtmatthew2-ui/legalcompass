import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Send, Upload, Calendar, AlertTriangle, Mail, Phone, Star } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CalendarExport } from "@/components/CalendarExport";
import { CaseTimeline } from "@/components/CaseTimeline";
import { CaseProgressTracker } from "@/components/CaseProgressTracker";
import { LawyerRatingDialog } from "@/components/LawyerRatingDialog";
import { Helmet } from "react-helmet";

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

interface LawyerInfo {
  user_id: string;
  full_name: string;
  email: string;
  practice_areas: string[];
  bio: string | null;
  states_licensed: string[];
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

export const ClientCaseManagement = () => {
  const { leadId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [caseData, setCaseData] = useState<LegalCase | null>(null);
  const [lawyerInfo, setLawyerInfo] = useState<LawyerInfo | null>(null);
  const [messages, setMessages] = useState<CaseMessage[]>([]);
  const [documents, setDocuments] = useState<CaseDocument[]>([]);
  const [meetings, setMeetings] = useState<CaseMeeting[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [uploadingDoc, setUploadingDoc] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [showRemovalDialog, setShowRemovalDialog] = useState(false);
  const [removalReason, setRemovalReason] = useState("");
  const [submittingRemoval, setSubmittingRemoval] = useState(false);
  const [showRatingDialog, setShowRatingDialog] = useState(false);

  useEffect(() => {
    loadCaseData();
    setupRealtimeSubscription();
  }, [leadId]);

  const setupRealtimeSubscription = () => {
    const channel = supabase
      .channel('client-case-messages')
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
        .eq('user_id', user.id)
        .maybeSingle();

      if (caseError) throw caseError;
      setCaseData(caseInfo);

      // Load lawyer info
      const { data: purchase, error: purchaseError } = await supabase
        .from('lead_purchases')
        .select('lawyer_id, lawyer_profiles!lead_purchases_lawyer_id_fkey(*)')
        .eq('lead_id', leadId)
        .maybeSingle();

      if (!purchaseError && purchase?.lawyer_profiles) {
        setLawyerInfo(purchase.lawyer_profiles as unknown as LawyerInfo);
      }

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

      // Load meetings
      const { data: meetingData, error: meetingError } = await supabase
        .from('case_meetings')
        .select('*')
        .eq('lead_id', leadId)
        .order('meeting_date', { ascending: true });
      
      if (!meetingError) setMeetings((meetingData || []) as CaseMeeting[]);

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

  const sendMessage = async () => {
    if (!newMessage.trim() || !currentUserId) return;

    try {
      const { error } = await supabase
        .from('case_messages')
        .insert({
          lead_id: leadId,
          sender_id: currentUserId,
          sender_type: 'client',
          message_content: newMessage.trim()
        });

      if (error) throw error;

      setNewMessage("");
      
      toast({
        title: "Message sent",
        description: "Your lawyer will be notified",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleFileUpload = async (docId: string, file: File) => {
    setUploadingDoc(docId);
    
    try {
      if (!currentUserId) throw new Error('Not authenticated');

      const fileExt = file.name.split('.').pop();
      const fileName = `${leadId}/${docId}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('legal-documents')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('legal-documents')
        .getPublicUrl(fileName);

      const { error: updateError } = await supabase
        .from('case_documents')
        .update({
          document_path: fileName,
          uploaded_by: currentUserId,
          uploaded_at: new Date().toISOString(),
          status: 'uploaded'
        })
        .eq('id', docId);

      if (updateError) throw updateError;

      loadCaseData();
      
      toast({
        title: "Document uploaded",
        description: "Your lawyer has been notified",
      });
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploadingDoc(null);
    }
  };

  const submitRemovalRequest = async () => {
    if (removalReason.trim().length < 50) {
      toast({
        title: "Reason too short",
        description: "Please provide a detailed reason (minimum 50 characters)",
        variant: "destructive",
      });
      return;
    }

    setSubmittingRemoval(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');

      const response = await supabase.functions.invoke('request-lawyer-removal', {
        body: { leadId, reason: removalReason },
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      });

      if (response.error) throw response.error;

      toast({
        title: "Request submitted",
        description: response.data?.message || "Our admin team will review your request within 24-48 hours",
      });

      setShowRemovalDialog(false);
      setRemovalReason("");
    } catch (error: any) {
      toast({
        title: "Submission failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSubmittingRemoval(false);
    }
  };

  const calendarEvents = meetings.map(meeting => ({
    id: meeting.id,
    title: meeting.title,
    description: meeting.description || undefined,
    start: new Date(meeting.meeting_date),
    location: meeting.location || undefined,
  }));

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!caseData) {
    return <div className="flex items-center justify-center min-h-screen">Case not found</div>;
  }

  return (
    <>
      <Helmet>
        <title>Case Management - Legal Compass</title>
      </Helmet>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to My Cases
          </Button>
        </div>

        <CaseProgressTracker status={caseData?.status as any} />

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            {caseData.legal_topic}
            <Badge variant={caseData.status === 'open' ? 'default' : 'secondary'}>
              {caseData.status}
            </Badge>
          </CardTitle>
          <CardDescription>
            {caseData.state} • {caseData.urgency_level} urgency
          </CardDescription>
        </CardHeader>
        {lawyerInfo && (
          <CardContent>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Badge variant="secondary">Your Lawyer</Badge>
              </h3>
              <p className="font-medium text-lg">{lawyerInfo.full_name}</p>
              <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                <a href={`mailto:${lawyerInfo.email}`} className="flex items-center gap-1 hover:text-primary">
                  <Mail className="w-4 h-4" />
                  {lawyerInfo.email}
                </a>
              </div>
              <p className="text-sm mt-2">
                <strong>Practice Areas:</strong> {lawyerInfo.practice_areas.join(', ')}
              </p>
              <p className="text-sm">
                <strong>Licensed in:</strong> {lawyerInfo.states_licensed.join(', ')}
              </p>
              {lawyerInfo.bio && (
                <p className="text-sm mt-2 text-muted-foreground">{lawyerInfo.bio}</p>
              )}
            </div>
          </CardContent>
        )}
      </Card>

      <Tabs defaultValue="messages" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="actions">Actions</TabsTrigger>
            {caseData?.status === 'closed' && <TabsTrigger value="rating">Rate Lawyer</TabsTrigger>}
          </TabsList>

        <TabsContent value="messages">
          <Card>
            <CardHeader>
              <CardTitle>Secure Messages</CardTitle>
              <CardDescription>Private communication with your lawyer</CardDescription>
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
              <CardTitle>Case Documents</CardTitle>
              <CardDescription>Upload requested documents securely</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {documents.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    No documents requested yet
                  </p>
                ) : (
                  documents.map((doc) => (
                    <div key={doc.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{doc.document_name}</h4>
                        <Badge variant={
                          doc.status === 'uploaded' ? 'default' : 
                          doc.status === 'approved' ? 'secondary' : 
                          'outline'
                        }>
                          {doc.status}
                        </Badge>
                      </div>
                      {doc.notes && (
                        <p className="text-sm text-muted-foreground mb-2">{doc.notes}</p>
                      )}
                      {doc.status === 'requested' && (
                        <div className="flex gap-2">
                          <Input
                            type="file"
                            id={`file-${doc.id}`}
                            className="flex-1"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleFileUpload(doc.id, file);
                            }}
                            disabled={uploadingDoc === doc.id}
                          />
                          <Button
                            disabled={uploadingDoc === doc.id}
                            onClick={() => document.getElementById(`file-${doc.id}`)?.click()}
                          >
                            <Upload className="w-4 h-4 mr-2" />
                            {uploadingDoc === doc.id ? 'Uploading...' : 'Upload'}
                          </Button>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Court dates and meetings with your lawyer</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {meetings.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      No meetings scheduled yet
                    </p>
                  ) : (
                    meetings.map((meeting) => (
                      <div key={meeting.id} className="border rounded-lg p-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium">{meeting.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {new Date(meeting.meeting_date).toLocaleString()}
                            </p>
                            {meeting.description && (
                              <p className="text-sm mt-1">{meeting.description}</p>
                            )}
                            <div className="flex gap-2 mt-2">
                              <Badge variant="outline">{meeting.meeting_type}</Badge>
                              {meeting.location && (
                                <Badge variant="outline">{meeting.location}</Badge>
                              )}
                            </div>
                          </div>
                          <Badge variant={
                            meeting.status === 'scheduled' ? 'default' :
                            meeting.status === 'completed' ? 'secondary' : 'destructive'
                          }>
                            {meeting.status}
                          </Badge>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            <CalendarExport events={calendarEvents} calendarName={`${caseData.legal_topic} - Legal Compass`} />
          </div>
        </TabsContent>

        <TabsContent value="timeline">
          <CaseTimeline leadId={leadId!} />
        </TabsContent>

        <TabsContent value="actions">
          <Card>
            <CardHeader>
              <CardTitle>Case Actions</CardTitle>
              <CardDescription>Manage your case and lawyer assignment</CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog open={showRemovalDialog} onOpenChange={setShowRemovalDialog}>
                <DialogTrigger asChild>
                  <Button variant="destructive" className="w-full">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Request Lawyer Removal
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Request Lawyer Removal</DialogTitle>
                    <DialogDescription>
                      Please provide a detailed explanation for why you want to remove your assigned lawyer. 
                      Our admin team will review your request and the chat transcript before making a final decision.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="removal-reason">Detailed Reason (minimum 50 characters)</Label>
                      <Textarea
                        id="removal-reason"
                        value={removalReason}
                        onChange={(e) => setRemovalReason(e.target.value)}
                        placeholder="Please explain in detail why you want to request a new lawyer. Include specific concerns about communication, expertise, professionalism, or any other relevant issues..."
                        className="min-h-[200px] mt-2"
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        {removalReason.length}/50 characters minimum
                      </p>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowRemovalDialog(false)}>
                      Cancel
                    </Button>
                    <Button 
                      variant="destructive" 
                      onClick={submitRemovalRequest}
                      disabled={submittingRemoval || removalReason.trim().length < 50}
                    >
                      {submittingRemoval ? 'Submitting...' : 'Submit Request'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <div className="mt-4 p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">What happens next?</h4>
                <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                  <li>Your request and all chat messages will be sent to our admin team</li>
                  <li>Admin will review within 24-48 hours</li>
                  <li>You'll receive an email with the decision</li>
                  <li>If approved, you may be assigned a new lawyer or receive a refund</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rating">
          <Card>
            <CardHeader>
              <CardTitle>Rate Your Experience</CardTitle>
              <CardDescription>
                Help others by sharing your experience with {lawyerInfo?.full_name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => setShowRatingDialog(true)}>
                <Star className="w-4 h-4 mr-2" />
                Submit Rating
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {lawyerInfo && (
        <LawyerRatingDialog
          open={showRatingDialog}
          onOpenChange={setShowRatingDialog}
          leadId={leadId!}
          lawyerId={lawyerInfo.user_id}
          lawyerName={lawyerInfo.full_name}
        />
      )}
    </div>
  </>
  );
};
