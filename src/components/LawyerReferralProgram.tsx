import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Copy, Gift, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface ReferralStats {
  totalReferrals: number;
  creditsEarned: number;
  pendingReferrals: number;
}

export const LawyerReferralProgram = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [referralLink, setReferralLink] = useState("");
  const [stats] = useState<ReferralStats>({
    totalReferrals: 0,
    creditsEarned: 0,
    pendingReferrals: 0
  });

  useEffect(() => {
    const fetchReferralLink = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setReferralLink(`${window.location.origin}/lawyer-signup?ref=${user.id}`);
      }
    };
    fetchReferralLink();
  }, []);

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast({
      title: "Link copied!",
      description: "Share this link with fellow attorneys"
    });
  };

  const sendInvite = async () => {
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter an email address",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Send referral email via edge function
      const { error } = await supabase.functions.invoke("send-lead-email", {
        body: {
          to: email,
          subject: "Join Legal Compass - Attorney Referral",
          html: `
            <h2>You've been invited to join Legal Compass</h2>
            <p>A fellow attorney thinks you'd benefit from our lead generation platform.</p>
            <p>Join now and get your first lead free!</p>
            <a href="${referralLink}" style="display: inline-block; padding: 12px 24px; background: #667eea; color: white; text-decoration: none; border-radius: 6px;">Sign Up Now</a>
          `
        }
      });

      if (error) throw error;

      toast({
        title: "Invitation sent!",
        description: `We've sent an invitation to ${email}`
      });
      setEmail("");
    } catch (error: any) {
      toast({
        title: "Failed to send invitation",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5" />
            Referral Program
          </CardTitle>
          <CardDescription>
            Invite other attorneys and earn 5 free lead credits for each successful signup
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{stats.totalReferrals}</div>
                <p className="text-sm text-muted-foreground">Total Referrals</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{stats.creditsEarned}</div>
                <p className="text-sm text-muted-foreground">Credits Earned</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{stats.pendingReferrals}</div>
                <p className="text-sm text-muted-foreground">Pending</p>
              </CardContent>
            </Card>
          </div>

          {/* Referral Link */}
          <div className="space-y-2">
            <Label>Your Referral Link</Label>
            <div className="flex gap-2">
              <Input 
                value={referralLink} 
                readOnly 
                className="flex-1"
              />
              <Button onClick={copyReferralLink} variant="outline">
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </div>
          </div>

          {/* Invite by Email */}
          <div className="space-y-2">
            <Label>Invite by Email</Label>
            <div className="flex gap-2">
              <Input 
                type="email"
                placeholder="colleague@lawfirm.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
              />
              <Button onClick={sendInvite} disabled={loading}>
                <Users className="h-4 w-4 mr-2" />
                {loading ? "Sending..." : "Invite"}
              </Button>
            </div>
          </div>

          {/* How it Works */}
          <div className="bg-muted p-4 rounded-lg space-y-2">
            <h4 className="font-semibold">How it works:</h4>
            <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
              <li>Share your unique referral link with attorney colleagues</li>
              <li>They sign up and verify their bar license</li>
              <li>You both get 5 free lead credits</li>
              <li>Start building your practice together!</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};