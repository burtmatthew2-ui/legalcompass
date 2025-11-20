import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Copy, Plus, Trash2, ExternalLink, Loader2, Calendar } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface OutreachContact {
  id: string;
  name: string;
  linkedin_url: string;
  practice_area: string | null;
  location: string | null;
  status: string;
  priority: string | null;
  notes: string | null;
  last_contact: string | null;
  follow_up_date: string | null;
  created_at: string;
}

export const LinkedInOutreachTracker = () => {
  const [contacts, setContacts] = useState<OutreachContact[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddingContact, setIsAddingContact] = useState(false);
  const [newContact, setNewContact] = useState({
    name: "",
    linkedin_url: "",
    practice_area: "",
    location: "",
    priority: "medium",
    notes: ""
  });
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const messageTemplate = `Hi [Name],

I came across your profile and noticed you're a [Practice Area] attorney in [Location]. I wanted to reach out about an opportunity that might interest you.

Legal Compass is a growing platform connecting verified attorneys with clients who need legal help. We're looking for experienced professionals like yourself to join our network.

Here's what we offer:
✓ Pre-qualified leads matched to your practice area
✓ Competitive pricing ($50-90 per lead based on case complexity)
✓ Full case management tools and secure client communication
✓ No monthly fees - you only pay for leads you accept

Would you be open to a quick call to discuss how this could benefit your practice?

Best regards,
[Your Name]
Legal Compass`;

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('linkedin_outreach_contacts')
        .select('*')
        .eq('admin_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setContacts(data || []);
    } catch (error: any) {
      toast.error("Failed to load contacts: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const addContact = async () => {
    if (!newContact.name || !newContact.linkedin_url) {
      toast.error("Name and LinkedIn URL are required");
      return;
    }

    setIsAddingContact(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from('linkedin_outreach_contacts')
        .insert({
          admin_id: user.id,
          name: newContact.name,
          linkedin_url: newContact.linkedin_url,
          practice_area: newContact.practice_area || null,
          location: newContact.location || null,
          priority: newContact.priority,
          notes: newContact.notes || null,
          status: 'not_contacted'
        });

      if (error) throw error;

      setNewContact({ name: "", linkedin_url: "", practice_area: "", location: "", priority: "medium", notes: "" });
      await loadContacts();
      toast.success("Contact added to tracker");
    } catch (error: any) {
      toast.error("Failed to add contact: " + error.message);
    } finally {
      setIsAddingContact(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('linkedin_outreach_contacts')
        .update({ 
          status, 
          last_contact: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;
      await loadContacts();
      toast.success("Status updated");
    } catch (error: any) {
      toast.error("Failed to update status: " + error.message);
    }
  };

  const setFollowUp = async (id: string, date: string) => {
    try {
      const { error } = await supabase
        .from('linkedin_outreach_contacts')
        .update({ follow_up_date: date })
        .eq('id', id);

      if (error) throw error;
      await loadContacts();
      toast.success("Follow-up date set");
    } catch (error: any) {
      toast.error("Failed to set follow-up: " + error.message);
    }
  };

  const deleteContact = async (id: string) => {
    try {
      const { error } = await supabase
        .from('linkedin_outreach_contacts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await loadContacts();
      toast.success("Contact removed");
    } catch (error: any) {
      toast.error("Failed to delete contact: " + error.message);
    }
  };

  const copyMessage = (contact: OutreachContact) => {
    const personalizedMessage = messageTemplate
      .replace("[Name]", contact.name)
      .replace("[Practice Area]", contact.practice_area || "legal")
      .replace("[Location]", contact.location || "your area");
    
    navigator.clipboard.writeText(personalizedMessage);
    toast.success("Personalized message copied to clipboard");
  };

  const exportData = () => {
    const csv = [
      "Name,LinkedIn,Practice Area,Location,Status,Priority,Notes,Last Contact,Follow Up",
      ...contacts.map(c => 
        `"${c.name}","${c.linkedin_url}","${c.practice_area || ''}","${c.location || ''}","${c.status}","${c.priority || ''}","${c.notes || ''}","${c.last_contact || ''}","${c.follow_up_date || ''}"`
      )
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `linkedin-outreach-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    toast.success("Outreach data exported");
  };

  const filteredContacts = filterStatus === "all" 
    ? contacts 
    : contacts.filter(c => c.status === filterStatus);

  if (loading) {
    return (
      <Card>
        <CardContent className="p-8 flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>LinkedIn Outreach Tracker</CardTitle>
          <CardDescription>
            Systematically track your lawyer recruitment outreach efforts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Add Contact Form */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <Label>Name *</Label>
              <Input
                value={newContact.name}
                onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label>LinkedIn URL *</Label>
              <Input
                value={newContact.linkedin_url}
                onChange={(e) => setNewContact({ ...newContact, linkedin_url: e.target.value })}
                placeholder="https://linkedin.com/in/..."
              />
            </div>
            <div className="space-y-2">
              <Label>Practice Area</Label>
              <Input
                value={newContact.practice_area}
                onChange={(e) => setNewContact({ ...newContact, practice_area: e.target.value })}
                placeholder="Family Law"
              />
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
              <Input
                value={newContact.location}
                onChange={(e) => setNewContact({ ...newContact, location: e.target.value })}
                placeholder="New York, NY"
              />
            </div>
            <div className="space-y-2">
              <Label>Priority</Label>
              <Select value={newContact.priority} onValueChange={(value) => setNewContact({ ...newContact, priority: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 md:col-span-2 lg:col-span-1">
              <Label>Notes</Label>
              <Input
                value={newContact.notes}
                onChange={(e) => setNewContact({ ...newContact, notes: e.target.value })}
                placeholder="Additional notes..."
              />
            </div>
          </div>
          <Button onClick={addContact} disabled={isAddingContact} className="w-full md:w-auto">
            {isAddingContact ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
            Add Contact
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <CardTitle>Contacts ({filteredContacts.length})</CardTitle>
              <CardDescription>Manage your outreach pipeline</CardDescription>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="not_contacted">Not Contacted</SelectItem>
                  <SelectItem value="message_sent">Message Sent</SelectItem>
                  <SelectItem value="responded">Responded</SelectItem>
                  <SelectItem value="interested">Interested</SelectItem>
                  <SelectItem value="joined">Joined</SelectItem>
                  <SelectItem value="declined">Declined</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={exportData} variant="outline">
                Export CSV
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Practice Area</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Follow Up</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContacts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground">
                      No contacts found. Add your first contact above.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredContacts.map((contact) => (
                    <TableRow key={contact.id}>
                      <TableCell className="font-medium">{contact.name}</TableCell>
                      <TableCell>{contact.practice_area || '-'}</TableCell>
                      <TableCell>{contact.location || '-'}</TableCell>
                      <TableCell>
                        <Select value={contact.status} onValueChange={(value) => updateStatus(contact.id, value)}>
                          <SelectTrigger className="w-[150px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="not_contacted">Not Contacted</SelectItem>
                            <SelectItem value="message_sent">Message Sent</SelectItem>
                            <SelectItem value="responded">Responded</SelectItem>
                            <SelectItem value="interested">Interested</SelectItem>
                            <SelectItem value="joined">Joined</SelectItem>
                            <SelectItem value="declined">Declined</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Badge variant={contact.priority === 'high' ? 'destructive' : contact.priority === 'low' ? 'secondary' : 'default'}>
                          {contact.priority || 'medium'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Calendar className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Set Follow-Up Date</DialogTitle>
                            </DialogHeader>
                            <Input
                              type="date"
                              defaultValue={contact.follow_up_date || ''}
                              onChange={(e) => setFollowUp(contact.id, e.target.value)}
                            />
                          </DialogContent>
                        </Dialog>
                        {contact.follow_up_date && (
                          <span className="text-xs text-muted-foreground ml-2">
                            {format(new Date(contact.follow_up_date), 'MMM d')}
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" onClick={() => copyMessage(contact)} title="Copy personalized message">
                            <Copy className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" asChild title="Open LinkedIn profile">
                            <a href={contact.linkedin_url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => deleteContact(contact.id)} title="Delete contact">
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Stats Card */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Contacts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contacts.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Responded</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contacts.filter(c => c.status === 'responded' || c.status === 'interested').length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Joined</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{contacts.filter(c => c.status === 'joined').length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {contacts.length > 0 ? Math.round((contacts.filter(c => c.status === 'joined').length / contacts.length) * 100) : 0}%
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
