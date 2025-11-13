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
        .single();

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
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
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
        </Tabs>
      </div>
    </>
  );
};

export default CaseManagement;
