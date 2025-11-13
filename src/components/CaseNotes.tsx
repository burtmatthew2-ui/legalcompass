import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { FileText, Pencil, Trash2, Search } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";

interface CaseNote {
  id: string;
  title: string;
  content: string;
  category: string;
  created_at: string;
  updated_at: string;
}

interface CaseNotesProps {
  leadId: string;
  lawyerId: string;
}

export const CaseNotes = ({ leadId, lawyerId }: CaseNotesProps) => {
  const { toast } = useToast();
  const [notes, setNotes] = useState<CaseNote[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [showNoteDialog, setShowNoteDialog] = useState(false);
  const [editingNote, setEditingNote] = useState<CaseNote | null>(null);
  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    category: 'general'
  });

  useEffect(() => {
    fetchNotes();
  }, [leadId]);

  const fetchNotes = async () => {
    const { data, error } = await supabase
      .from('case_notes')
      .select('*')
      .eq('lead_id', leadId)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setNotes(data as CaseNote[]);
    }
  };

  const saveNote = async () => {
    if (!newNote.title.trim() || !newNote.content.trim()) return;

    if (editingNote) {
      const { error } = await supabase
        .from('case_notes')
        .update({
          title: newNote.title,
          content: newNote.content,
          category: newNote.category
        })
        .eq('id', editingNote.id);

      if (!error) {
        toast({ title: "Note updated successfully" });
        fetchNotes();
        resetForm();
      }
    } else {
      const { error } = await supabase
        .from('case_notes')
        .insert({
          lead_id: leadId,
          lawyer_id: lawyerId,
          title: newNote.title,
          content: newNote.content,
          category: newNote.category
        });

      if (!error) {
        toast({ title: "Note created successfully" });
        fetchNotes();
        resetForm();
      }
    }
  };

  const deleteNote = async (noteId: string) => {
    const { error } = await supabase
      .from('case_notes')
      .delete()
      .eq('id', noteId);

    if (!error) {
      toast({ title: "Note deleted" });
      fetchNotes();
    }
  };

  const resetForm = () => {
    setNewNote({ title: '', content: '', category: 'general' });
    setEditingNote(null);
    setShowNoteDialog(false);
  };

  const startEdit = (note: CaseNote) => {
    setEditingNote(note);
    setNewNote({
      title: note.title,
      content: note.content,
      category: note.category
    });
    setShowNoteDialog(true);
  };

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || note.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { value: 'general', label: 'General' },
    { value: 'research', label: 'Legal Research' },
    { value: 'client_contact', label: 'Client Contact' },
    { value: 'court_filing', label: 'Court Filing' },
    { value: 'strategy', label: 'Strategy' },
    { value: 'billing', label: 'Billing' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Case Notes</CardTitle>
        <CardDescription>Track research, strategy, and case developments</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Dialog open={showNoteDialog} onOpenChange={setShowNoteDialog}>
              <DialogTrigger asChild>
                <Button onClick={() => resetForm()}>
                  <FileText className="w-4 h-4 mr-2" />
                  New Note
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{editingNote ? 'Edit Note' : 'New Note'}</DialogTitle>
                  <DialogDescription>
                    Document case insights and important information
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input
                      placeholder="Note title..."
                      value={newNote.title}
                      onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select value={newNote.category} onValueChange={(value) => setNewNote({ ...newNote, category: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(cat => (
                          <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Content</Label>
                    <Textarea
                      placeholder="Note details..."
                      value={newNote.content}
                      onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                      rows={8}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={resetForm}>Cancel</Button>
                  <Button onClick={saveNote} disabled={!newNote.title.trim() || !newNote.content.trim()}>
                    Save Note
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-3">
            {filteredNotes.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                {searchTerm || categoryFilter !== 'all' ? 'No notes match your filters' : 'No notes yet'}
              </p>
            ) : (
              filteredNotes.map((note) => (
                <div key={note.id} className="p-4 border rounded-lg space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{note.title}</h4>
                        <Badge variant="outline">
                          {categories.find(c => c.value === note.category)?.label}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap">{note.content}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {new Date(note.created_at).toLocaleDateString()} at {new Date(note.created_at).toLocaleTimeString()}
                        {note.updated_at !== note.created_at && ' (edited)'}
                      </p>
                    </div>
                    <div className="flex gap-1 ml-2">
                      <Button variant="ghost" size="sm" onClick={() => startEdit(note)}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => deleteNote(note.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};