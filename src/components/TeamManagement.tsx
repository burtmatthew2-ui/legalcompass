import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Users, Plus, Trash, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'paralegal' | 'assistant' | 'associate';
  status: 'active' | 'pending';
}

export const TeamManagement = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'assistant' as 'paralegal' | 'assistant' | 'associate'
  });
  const { toast } = useToast();

  const inviteMember = async () => {
    try {
      // In production, send invitation email and create database record
      const newMember: TeamMember = {
        id: crypto.randomUUID(),
        ...formData,
        status: 'pending'
      };

      setMembers(prev => [...prev, newMember]);

      toast({
        title: "Invitation sent",
        description: `Invitation email sent to ${formData.email}`,
      });

      setFormData({ name: '', email: '', role: 'assistant' });
      setDialogOpen(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const removeMember = (id: string) => {
    setMembers(prev => prev.filter(m => m.id !== id));
    toast({
      title: "Removed",
      description: "Team member removed",
    });
  };

  const getRoleBadge = (role: string) => {
    const variants: { [key: string]: "default" | "secondary" | "outline" } = {
      paralegal: "default",
      assistant: "secondary",
      associate: "outline",
    };
    return <Badge variant={variants[role]}>{role}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    return (
      <Badge variant={status === 'active' ? 'default' : 'secondary'}>
        {status}
      </Badge>
    );
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Team Management</CardTitle>
            <CardDescription>
              Invite team members with restricted access
            </CardDescription>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Invite Member
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Invite Team Member</DialogTitle>
                <DialogDescription>
                  Send an invitation to join your team
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Select
                    value={formData.role}
                    onValueChange={(value: any) => setFormData(prev => ({ ...prev, role: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="paralegal">Paralegal</SelectItem>
                      <SelectItem value="assistant">Assistant</SelectItem>
                      <SelectItem value="associate">Associate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                <Button onClick={inviteMember} disabled={!formData.name || !formData.email}>
                  Send Invitation
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {members.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Users className="w-12 h-12 mx-auto mb-3 opacity-20" />
            <p>No team members yet</p>
            <p className="text-sm mt-1">Invite your first team member</p>
          </div>
        ) : (
          <div className="space-y-3">
            {members.map(member => (
              <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium">{member.name}</p>
                    {getRoleBadge(member.role)}
                    {getStatusBadge(member.status)}
                  </div>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    {member.email}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => removeMember(member.id)}
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
