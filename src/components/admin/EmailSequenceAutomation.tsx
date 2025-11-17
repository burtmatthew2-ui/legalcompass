import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Mail, Send } from "lucide-react";
import { toast } from "sonner";

export const EmailSequenceAutomation = () => {
  const [recipientEmail, setRecipientEmail] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [practiceArea, setPracticeArea] = useState("");
  const [location, setLocation] = useState("");

  const emailSequences = {
    initial: `Subject: Exclusive Opportunity for [Practice Area] Attorneys

Hi [Name],

I hope this email finds you well. I'm reaching out because Legal Compass is building a network of top-tier attorneys, and your expertise in [Practice Area] caught our attention.

We're a fast-growing legal platform connecting qualified clients with verified attorneys. Here's what makes us different:

✓ Pre-Qualified Leads: Every lead is vetted and matched to your practice area
✓ Fair Pricing: $50-90 per lead based on complexity (no hidden fees)
✓ Complete Tools: Case management, secure messaging, document handling
✓ Zero Risk: Only pay for leads you choose to accept

Our attorneys typically see 3-5 qualified leads per week in their practice areas.

Would you be interested in learning more? I'd be happy to schedule a quick 15-minute call to discuss how this could benefit your practice.

Best regards,
[Your Name]
Legal Compass

P.S. We're currently waiving the first lead fee for new attorneys who join this month.`,

    followUp1: `Subject: Following up - Legal Compass opportunity

Hi [Name],

I wanted to follow up on my previous email about Legal Compass. I understand you're busy, so I'll keep this brief.

Quick question: Are you currently looking for new ways to connect with potential clients in [Location]?

If so, Legal Compass might be a perfect fit. We're different from traditional lead generation because:

• You see full case details BEFORE paying
• Leads are exclusive to your area and practice
• No monthly fees or commitments
• Professional case management tools included

Even if now isn't the right time, I'd love to keep you in mind for future opportunities.

Would a brief 10-minute call work for you this week?

Best,
[Your Name]
Legal Compass`,

    followUp2: `Subject: Last chance - Waived first lead fee ending soon

Hi [Name],

I hope you don't mind one last follow-up. Our special offer for [Practice Area] attorneys in [Location] is ending this week, and I wanted to make sure you didn't miss out.

Here's what you get when you join this week:
✓ First qualified lead completely free ($50-90 value)
✓ Full access to our case management platform
✓ Priority placement in your practice area

No pressure at all - I just wanted to make sure you had all the information before we close this opportunity.

If you're interested, just reply with "YES" and I'll send you the signup link.

If not, no worries - I won't reach out again.

Best wishes,
[Your Name]
Legal Compass`,

    interested: `Subject: Welcome to Legal Compass - Next Steps

Hi [Name],

Great to hear from you! I'm excited to get you set up on Legal Compass.

Here are your next steps:

1. VERIFICATION: Complete your attorney profile at [Signup Link]
   - State Bar number (required for verification)
   - Practice areas and specializations
   - Professional bio and photo

2. APPROVAL: Our team will verify your credentials (usually 24-48 hours)

3. START RECEIVING LEADS: Once verified, you'll get email notifications for qualified leads in your area

REMINDERS:
• You only pay for leads you accept ($50-90 per lead)
• View full case details before deciding
• No monthly fees or commitments
• First lead is FREE (this month only)

Questions? Just reply to this email or call me at [Phone Number].

Looking forward to working with you!

Best,
[Your Name]
Legal Compass`,

    warmWelcome: `Subject: You're Verified! First leads coming your way

Hi [Name],

Welcome to Legal Compass! Your attorney profile has been verified and you're now active in our network.

Here's what happens next:

📧 EMAIL NOTIFICATIONS: You'll receive emails when new leads match your practice area
💼 REVIEW LEADS: Log into your dashboard to view full case details
✅ ACCEPT OR PASS: Choose which leads to accept (remember - first one is free!)
🔒 SECURE COMMUNICATION: Once accepted, you'll have direct encrypted messaging with the client

TIPS FOR SUCCESS:
• Respond to leads within 24 hours for best results
• Complete your profile with a professional photo
• Add detailed practice area descriptions
• Keep your dashboard notifications on

NEED HELP?
• Dashboard Tutorial: [Link]
• Pricing FAQ: [Link]
• Support: support@legalcompass.com

Your dashboard: [Dashboard Link]

Let's make this a great partnership!

Best,
[Your Name]
Legal Compass`
  };

  const personalizeEmail = (template: string) => {
    return template
      .replace(/\[Name\]/g, recipientName || "[Name]")
      .replace(/\[Practice Area\]/g, practiceArea || "[Practice Area]")
      .replace(/\[Location\]/g, location || "[Location]");
  };

  const copyEmail = (sequence: keyof typeof emailSequences) => {
    const personalized = personalizeEmail(emailSequences[sequence]);
    navigator.clipboard.writeText(personalized);
    toast.success("Email copied to clipboard");
  };

  const openInGmail = (sequence: keyof typeof emailSequences) => {
    if (!recipientEmail) {
      toast.error("Please enter recipient email");
      return;
    }

    const personalized = personalizeEmail(emailSequences[sequence]);
    const lines = personalized.split('\n');
    const subject = lines[0].replace('Subject: ', '');
    const body = lines.slice(2).join('\n');

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipientEmail)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, '_blank');
    toast.success("Opening in Gmail");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Email Sequence Automation</CardTitle>
          <CardDescription>
            Pre-written email sequences for lawyer onboarding with personalization
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Personalization Fields */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
            <div>
              <Label>Recipient Name</Label>
              <Input
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder="John Smith"
              />
            </div>
            <div>
              <Label>Recipient Email</Label>
              <Input
                type="email"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                placeholder="john@lawfirm.com"
              />
            </div>
            <div>
              <Label>Practice Area</Label>
              <Input
                value={practiceArea}
                onChange={(e) => setPracticeArea(e.target.value)}
                placeholder="Criminal Defense"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Los Angeles, CA"
              />
            </div>
          </div>

          {/* Email Sequences */}
          <Tabs defaultValue="initial">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="initial">Initial</TabsTrigger>
              <TabsTrigger value="followUp1">Follow-Up 1</TabsTrigger>
              <TabsTrigger value="followUp2">Follow-Up 2</TabsTrigger>
              <TabsTrigger value="interested">Interested</TabsTrigger>
              <TabsTrigger value="warmWelcome">Welcome</TabsTrigger>
            </TabsList>

            {Object.entries(emailSequences).map(([key, template]) => (
              <TabsContent key={key} value={key} className="space-y-4">
                <div>
                  <Label className="text-base font-semibold">
                    {key === 'initial' && "Initial Outreach Email"}
                    {key === 'followUp1' && "Follow-Up Email #1 (Send after 3-4 days)"}
                    {key === 'followUp2' && "Follow-Up Email #2 (Send after 7 days)"}
                    {key === 'interested' && "Response to Interested Attorney"}
                    {key === 'warmWelcome' && "Welcome Email (After Verification)"}
                  </Label>
                  <Textarea
                    value={personalizeEmail(template)}
                    readOnly
                    className="mt-2 font-mono text-sm"
                    rows={20}
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => copyEmail(key as keyof typeof emailSequences)}
                    variant="outline"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Email
                  </Button>
                  <Button
                    onClick={() => openInGmail(key as keyof typeof emailSequences)}
                    disabled={!recipientEmail}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Open in Gmail
                  </Button>
                </div>
              </TabsContent>
            ))}
          </Tabs>

          {/* Best Practices */}
          <Card className="bg-muted">
            <CardHeader>
              <CardTitle className="text-base">Email Sequence Best Practices</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>• <strong>Initial Email:</strong> Send immediately after identifying a prospect</p>
              <p>• <strong>Follow-Up 1:</strong> Wait 3-4 business days, send during business hours</p>
              <p>• <strong>Follow-Up 2:</strong> Wait 7 days total, include urgency/deadline</p>
              <p>• <strong>Interested Response:</strong> Respond within 1 hour during business hours</p>
              <p>• <strong>Welcome Email:</strong> Send immediately after verification is complete</p>
              <p>• <strong>Best Times:</strong> Tuesday-Thursday, 10 AM - 2 PM local time</p>
              <p>• <strong>Personalization:</strong> Always include name, practice area, and location</p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};
