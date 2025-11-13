import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Search, Filter, Calendar, User } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface Document {
  id: string;
  document_name: string;
  document_path: string | null;
  status: 'requested' | 'uploaded' | 'approved';
  created_at: string;
  uploaded_at: string | null;
  lead_id: string;
  case_topic?: string;
}

export const DocumentLibrary = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [filteredDocs, setFilteredDocs] = useState<Document[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadDocuments();
  }, []);

  useEffect(() => {
    filterDocuments();
  }, [searchQuery, statusFilter, documents]);

  const loadDocuments = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: docs, error } = await supabase
        .from('case_documents')
        .select(`
          *,
          legal_cases!inner(legal_topic, user_id)
        `)
        .eq('legal_cases.user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedDocs: Document[] = docs?.map(doc => ({
        id: doc.id,
        document_name: doc.document_name,
        document_path: doc.document_path,
        status: doc.status as 'requested' | 'uploaded' | 'approved',
        created_at: doc.created_at,
        uploaded_at: doc.uploaded_at,
        lead_id: doc.lead_id,
        case_topic: (doc as any).legal_cases?.legal_topic
      })) || [];

      setDocuments(formattedDocs);
      setFilteredDocs(formattedDocs);
    } catch (error: any) {
      console.error('Error loading documents:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filterDocuments = () => {
    let filtered = [...documents];

    if (searchQuery) {
      filtered = filtered.filter(doc => 
        doc.document_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.case_topic?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(doc => doc.status === statusFilter);
    }

    setFilteredDocs(filtered);
  };

  const downloadDocument = async (doc: Document) => {
    if (!doc.document_path) {
      toast({
        title: "Error",
        description: "Document not yet uploaded",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data, error } = await supabase.storage
        .from('legal-documents')
        .download(doc.document_path);

      if (error) throw error;

      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = doc.document_name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Success",
        description: "Document downloaded successfully",
      });
    } catch (error: any) {
      console.error('Error downloading document:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: "default" | "secondary" | "outline" } = {
      requested: "outline",
      uploaded: "secondary",
      approved: "default",
    };
    return <Badge variant={variants[status]}>{status}</Badge>;
  };

  if (loading) {
    return <div className="flex justify-center py-8">Loading documents...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Document Library</CardTitle>
        <CardDescription>
          All documents across your cases in one place
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Documents</SelectItem>
              <SelectItem value="requested">Requested</SelectItem>
              <SelectItem value="uploaded">Uploaded</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          {filteredDocs.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <FileText className="w-12 h-12 mx-auto mb-3 opacity-20" />
              <p>No documents found</p>
            </div>
          ) : (
            filteredDocs.map(doc => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start gap-3 flex-1">
                  <FileText className="w-5 h-5 mt-0.5 text-muted-foreground" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{doc.document_name}</p>
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {doc.case_topic}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(doc.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {getStatusBadge(doc.status)}
                  {doc.document_path && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => downloadDocument(doc)}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
