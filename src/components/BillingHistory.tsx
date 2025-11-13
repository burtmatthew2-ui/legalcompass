import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DollarSign, Calendar, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BillingItem {
  id: string;
  amount: number;
  description: string;
  date: string;
  status: 'paid' | 'pending' | 'failed';
}

export const BillingHistory = () => {
  const [billingItems, setBillingItems] = useState<BillingItem[]>([]);
  const [totalPaid, setTotalPaid] = useState(0);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadBillingHistory();
  }, []);

  const loadBillingHistory = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // For demonstration - in production, fetch from Stripe via edge function
      const mockBilling: BillingItem[] = [
        {
          id: '1',
          amount: 4.99,
          description: 'Monthly Subscription - Legal Compass',
          date: new Date().toISOString(),
          status: 'paid'
        }
      ];

      setBillingItems(mockBilling);
      setTotalPaid(mockBilling.reduce((sum, item) => 
        item.status === 'paid' ? sum + item.amount : sum, 0
      ));
    } catch (error: any) {
      console.error('Error loading billing:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: "default" | "secondary" | "destructive" } = {
      paid: "default",
      pending: "secondary",
      failed: "destructive",
    };
    return <Badge variant={variants[status]}>{status}</Badge>;
  };

  if (loading) {
    return <div className="flex justify-center py-8">Loading billing history...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing & Payment History</CardTitle>
        <CardDescription>
          View all your transactions and payment details
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <DollarSign className="w-4 h-4" />
              <span className="text-sm">Total Paid</span>
            </div>
            <p className="text-2xl font-bold">${totalPaid.toFixed(2)}</p>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <FileText className="w-4 h-4" />
              <span className="text-sm">Total Transactions</span>
            </div>
            <p className="text-2xl font-bold">{billingItems.length}</p>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">Next Billing</span>
            </div>
            <p className="text-sm font-medium">
              {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
            </p>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {billingItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                  No billing history available
                </TableCell>
              </TableRow>
            ) : (
              billingItems.map(item => (
                <TableRow key={item.id}>
                  <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>${item.amount.toFixed(2)}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
