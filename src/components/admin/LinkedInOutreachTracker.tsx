import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Copy, Plus, Trash2, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface OutreachContact {
  id: string;
  name: string;
  linkedinUrl: string;
  practiceArea: string;
  location: string;
  status: "not_contacted" | "message_sent" | "responded" | "interested" | "joined" | "declined";
  notes: string;
  lastContact: string;
}

export const LinkedInOutreachTracker = () => {
  const [contacts, setContacts] = useState<OutreachContact[]>([]);
  const [newContact, setNewContact] = useState({
    name: "",
    linkedinUrl: "",
    practiceArea: "",
    location: "",
    notes: ""
  });

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

  const addContact = () => {
    if (!newContact.name || !newContact.linkedinUrl) {
      toast.error("Name and LinkedIn URL are required");
      return;
    }

    const contact: OutreachContact = {
      id: Date.now().toString(),
      ...newContact,
      status: "not_contacted",
      lastContact: new Date().toISOString()
    };

    setContacts([...contacts, contact]);
    setNewContact({ name: "", linkedinUrl: "", practiceArea: "", location: "", notes: "" });
    toast.success("Contact added to tracker");
  };

  const updateStatus = (id: string, status: OutreachContact["status"]) => {
    setContacts(contacts.map(c => 
      c.id === id ? { ...c, status, lastContact: new Date().toISOString() } : c
    ));
    toast.success("Status updated");
  };

  const deleteContact = (id: string) => {
    setContacts(contacts.filter(c => c.id !== id));
    toast.success("Contact removed");
  };

  const copyMessage = (contact: OutreachContact) => {
    const personalizedMessage = messageTemplate
      .replace("[Name]", contact.name)
      .replace("[Practice Area]", contact.practiceArea || "legal")
      .replace("[Location]", contact.location || "your area");
    
    navigator.clipboard.writeText(personalizedMessage);
    toast.success("Personalized message copied to clipboard");
  };

  const exportData = () => {
    const csv = [
      "Name,LinkedIn,Practice Area,Location,Status,Notes,Last Contact",
      ...contacts.map(c => 
        `"${c.name}","${c.linkedinUrl}","${c.practiceArea}","${c.location}","${c.status}","${c.notes}","${c.lastContact}"`
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

  const getStatusColor = (status: OutreachContact["status"]) => {
    const colors = {
      not_contacted: "secondary",
      message_sent: "default",
      responded: "outline",
      interested: "default",
      joined: "default",
      declined: "destructive"
    };
    return colors[status];
  };

  const stats = {
    total: contacts.length,
    contacted: contacts.filter(c => c.status !== "not_contacted").length,
    responded: contacts.filter(c => c.status === "responded" || c.status === "interested").length,
    joined: contacts.filter(c => c.status === "joined").length
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>LinkedIn Outreach Tracker</CardTitle>
          <CardDescription>
            Track your lawyer outreach efforts and manage follow-ups
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{stats.total}</div>
                <p className="text-sm text-muted-foreground">Total Contacts</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{stats.contacted}</div>
                <p className="text-sm text-muted-foreground">Contacted</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{stats.responded}</div>
                <p className="text-sm text-muted-foreground">Responded</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{stats.joined}</div>
                <p className="text-sm text-muted-foreground">Joined</p>
              </CardContent>
            </Card>
          </div>

          {/* Message Template */}
          <div>
            <Label>Outreach Message Template</Label>
            <Textarea
              value={messageTemplate}
              readOnly
              className="mt-2 font-mono text-sm"
              rows={15}
            />
            <Button
              onClick={() => {
                navigator.clipboard.writeText(messageTemplate);
                toast.success("Template copied");
              }}
              variant="outline"
              size="sm"
              className="mt-2"
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy Template
            </Button>
          </div>

          {/* Add New Contact */}
          <div className="space-y-4 border-t pt-6">
            <h3 className="font-semibold">Add New Contact</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Name *</Label>
                <Input
                  value={newContact.name}
                  onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                  placeholder="John Smith"
                />
              </div>
              <div>
                <Label>LinkedIn URL *</Label>
                <Input
                  value={newContact.linkedinUrl}
                  onChange={(e) => setNewContact({ ...newContact, linkedinUrl: e.target.value })}
                  placeholder="https://linkedin.com/in/..."
                />
              </div>
              <div>
                <Label>Practice Area</Label>
                <Input
                  value={newContact.practiceArea}
                  onChange={(e) => setNewContact({ ...newContact, practiceArea: e.target.value })}
                  placeholder="Criminal Defense"
                />
              </div>
              <div>
                <Label>Location</Label>
                <Input
                  value={newContact.location}
                  onChange={(e) => setNewContact({ ...newContact, location: e.target.value })}
                  placeholder="Los Angeles, CA"
                />
              </div>
              <div className="col-span-2">
                <Label>Notes</Label>
                <Textarea
                  value={newContact.notes}
                  onChange={(e) => setNewContact({ ...newContact, notes: e.target.value })}
                  placeholder="Found via State Bar website..."
                />
              </div>
            </div>
            <Button onClick={addContact}>
              <Plus className="h-4 w-4 mr-2" />
              Add Contact
            </Button>
          </div>

          {/* Contacts Table */}
          {contacts.length > 0 && (
            <div className="border-t pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Outreach Contacts ({contacts.length})</h3>
                <Button onClick={exportData} variant="outline" size="sm">
                  Export CSV
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Practice Area</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Contact</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contacts.map((contact) => (
                    <TableRow key={contact.id}>
                      <TableCell className="font-medium">{contact.name}</TableCell>
                      <TableCell>{contact.practiceArea || "-"}</TableCell>
                      <TableCell>{contact.location || "-"}</TableCell>
                      <TableCell>
                        <Select
                          value={contact.status}
                          onValueChange={(value) => updateStatus(contact.id, value as OutreachContact["status"])}
                        >
                          <SelectTrigger className="w-40">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="not_contacted">Not Contacted</SelectItem>
                            <SelectItem value="message_sent">Message Sent</SelectItem>
                            <SelectItem value="responded">Responded</SelectItem>
                            <SelectItem value="interested">Interested</SelectItem>
                            <SelectItem value="joined">Joined ✓</SelectItem>
                            <SelectItem value="declined">Declined</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(contact.lastContact).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => copyMessage(contact)}
                            variant="ghost"
                            size="sm"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => window.open(contact.linkedinUrl, '_blank')}
                            variant="ghost"
                            size="sm"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => deleteContact(contact.id)}
                            variant="ghost"
                            size="sm"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
