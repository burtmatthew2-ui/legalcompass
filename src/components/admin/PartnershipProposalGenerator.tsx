import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, FileText, Download } from "lucide-react";
import { toast } from "sonner";

export const PartnershipProposalGenerator = () => {
  const [partnerName, setPartnerName] = useState("");
  const [partnerType, setPartnerType] = useState<"legal_aid" | "payment_processor" | "bar_association" | "law_school">("legal_aid");
  const [contactPerson, setContactPerson] = useState("");
  const [customDetails, setCustomDetails] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");

  // Real email addresses for bar associations (you can expand this)
  const barAssociationEmails: Record<string, string> = {
    "american bar association": "service@americanbar.org",
    "california state bar": "contactcenter@calbar.ca.gov",
    "new york state bar": "info@nysba.org",
    "texas state bar": "customerservice@texasbar.com",
    "florida bar": "ethics@floridabar.org",
    "illinois state bar": "isba@isba.org",
    // Add more as needed
  };

  // Update email when partner name or type changes
  const updateRecipientEmail = (name: string, type: string) => {
    if (type === "bar_association" && name) {
      const normalizedName = name.toLowerCase();
      const matchedEmail = Object.entries(barAssociationEmails).find(([key]) => 
        normalizedName.includes(key)
      )?.[1];
      setRecipientEmail(matchedEmail || "");
    } else {
      setRecipientEmail("");
    }
  };

  const proposalTemplates = {
    legal_aid: `Subject: Partnership Opportunity - Legal Compass x [Partner Name]

Hi [Contact Person],

I hope this email finds you well. I'm reaching out to explore a potential partnership between Legal Compass and [Partner Name] that could significantly expand access to legal services for underserved communities.

About Legal Compass:
We're an AI-powered platform connecting individuals with verified attorneys. We provide free initial legal guidance and attorney matching for just $4.99/month, serving clients across all 50 states.

The Partnership Opportunity:
I believe we could create meaningful impact together through:

1. Client Referrals - Seamless integration where you refer clients to our platform for attorney matching
2. Co-Branded Resources - Joint educational materials and legal guides
3. Impact Reporting - Privacy-compliant data sharing to identify service gaps and measure outcomes

What's in it for [Partner Name]:
• Extend your service offering without additional overhead
• Better client outcomes through faster attorney connections
• Insights into legal needs in your community
• No financial investment required

What's in it for Your Clients:
• One-click attorney matching with verified, reviewed lawyers
• Affordable access with discounted rates (50% off for referrals)
• Secure case management and communication tools

${customDetails}

Next Steps:
I'd love to schedule a 30-minute call to discuss how we can tailor this partnership to [Partner Name]'s specific needs and goals.

Would you be available for a brief call next week?

Best regards,
Legal Compass Partnership Team
partnerships@legalcompass.com
www.legalcompass.com`,

    payment_processor: `Subject: Payment Processing Partnership - Legal Compass

Hi [Contact Person],

I'm reaching out to explore [Partner Name] as our payment processing partner for Legal Compass, our growing attorney-client matching platform.

About Our Platform:
• $4.99/month client subscriptions
• $150/month or $1,260/year attorney subscriptions
• Currently processing $[X] monthly
• Growing 20%+ month-over-month

What We Need:
✓ Subscription billing with auto-renewal
✓ PCI-DSS Level 1 compliance
✓ Stripe-compatible API
✓ Legal industry features (IOLTA compliance, trust accounting)
✓ Detailed reporting and fraud prevention

What We Offer You:
✓ High-volume recurring revenue stream
✓ Low chargeback rate (<1%)
✓ Professional, verified user base
✓ Co-marketing opportunities

${customDetails}

Could you provide pricing for per-transaction fees, platform fees, and volume discounts? I'd also love to schedule a demo to discuss your legal industry capabilities.

Are you available for a call this week?

Best regards,
Legal Compass Payments Team
payments@legalcompass.com
www.legalcompass.com`,

    bar_association: `Subject: Member Benefit Partnership - Legal Compass

Hi [Contact Person],

I'd like to discuss an exclusive member benefit partnership between Legal Compass and [Partner Name] that could help your attorney members grow their practices.

What We Offer Your Members:
• Qualified client leads (up to 10/month included in subscription)
• Complete case management platform
• Secure client communication tools
• AI-powered legal research assistance

Special Member Pricing:
• 50% off first 3 months ($75 vs $150/month)
• Annual plan: $1,260/year (30% savings)
• Free premium features ($99/year value)
• Priority search placement

What This Means for [Partner Name]:
✓ Enhanced member value at zero cost
✓ Improved member retention
✓ Modern, innovative association benefit
✓ Insights into member practice trends

How It Works:
We'll provide co-branded marketing materials, dedicated landing pages, and member discount codes. You feature us in newsletters and member communications.

${customDetails}

I'd love to present this to your board or benefits committee. Could we schedule a 30-minute call to discuss?

Best regards,
Legal Compass Partnerships Team
partnerships@legalcompass.com
www.legalcompass.com`,

    law_school: `Subject: Law School Partnership - Legal Compass

Hi [Contact Person],

I'm reaching out to explore partnership opportunities between Legal Compass and [Partner Name] that could benefit your students, recent graduates, and clinical programs.

Partnership Options:

1. Student Externships
   • Hands-on legal tech experience
   • Academic credit opportunities
   • Exposure to AI, product management, and legal operations

2. Graduate Career Support
   • Recent grads join as verified attorneys
   • 50% off first 6 months ($75/month vs $150)
   • Immediate client access and mentorship

3. Clinical Program Integration
   • Students handle supervised case assessments
   • Real client interactions with faculty oversight
   • Modern tech tools for clinical education

4. Research Collaboration
   • Access to anonymized platform data
   • Legal access to justice research opportunities
   • Student research projects

What's in it for [Partner Name]:
✓ Modern curriculum enhancement (legal tech exposure)
✓ Career placement opportunities for graduates
✓ Research data for faculty
✓ No financial investment required

${customDetails}

I'd love to discuss how we can tailor this to [Partner Name]'s specific goals. Are you available for a brief call next week?

Best regards,
Legal Compass Partnerships Team
partnerships@legalcompass.com
www.legalcompass.com
• Technology tools included
• Marketing support
• Peer community of young attorneys

---

PROGRAMS IN DETAIL

1. LEGAL TECH EXTERNSHIP (12 credits)
   Duration: One semester
   Focus: Legal technology, product development, client services
   Deliverable: Capstone project on legal access
   Supervision: Mix of practicing attorneys and tech professionals

2. GRADUATE ATTORNEY PROGRAM
   Duration: Ongoing
   Benefits:
   • First 10 leads at 75% discount
   • Free practice management platform ($99/year value)
   • Monthly practice development webinars
   • Mentor matching with experienced attorneys

3. CLINICAL INTEGRATION
   Integration Points:
   • AI research tools for case assessment
   • Client intake and management platform
   • Secure attorney-client communication
   • Document management and e-signature

---

IMPLEMENTATION TIMELINE

Semester 1: Planning and agreement
Semester 2: Pilot program launch
Year 1: Full program implementation
Year 2+: Expansion and optimization

---

ACADEMIC CREDIT

We can work with [Partner Name] to design:
• Externship credit (2-12 credits)
• Clinical credit (varies by program)
• Independent study credit
• Research credit for faculty collaboration

---

SUCCESS METRICS

Student Outcomes:
• Externship placements
• Graduate attorney signups
• Post-graduation employment
• Bar passage rates (tracked separately)

Program Outcomes:
• Client satisfaction scores
• Case resolution rates
• Technology adoption
• Research publications

---

PARTNERSHIP INVESTMENT

From [Partner Name]:
• Faculty coordinator (0.25 FTE)
• Academic credit approval
• Student recruitment support
• Space for presentations/events

From Legal Compass:
• All technology infrastructure
• Training and onboarding
• Supervision of extern work
• Regular reporting on outcomes
• Guest speakers for classes

---

NEXT STEPS

1. Present to Dean and relevant faculty
2. Discuss academic credit structure
3. Design pilot program
4. Recruit inaugural cohort
5. Launch partnership

---

CONTACT INFORMATION

Legal Compass Academic Partnerships
Email: academic@legalcompass.com
Website: www.legalcompass.com

We're excited to help prepare the next generation of lawyers for modern practice while expanding access to justice.

${customDetails}`
  };

  const copyProposal = () => {
    const personalized = proposalTemplates[partnerType]
      .replace(/\[Partner Name\]/g, partnerName || "[Partner Name]")
      .replace(/\[Contact Person\]/g, contactPerson || "[Contact Person]");
    
    navigator.clipboard.writeText(personalized);
    toast.success("Proposal copied to clipboard");
  };

  const downloadProposal = () => {
    const personalized = proposalTemplates[partnerType]
      .replace(/\[Partner Name\]/g, partnerName || "[Partner Name]")
      .replace(/\[Contact Person\]/g, contactPerson || "[Contact Person]");
    
    const blob = new Blob([personalized], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Legal-Compass-Partnership-Proposal-${partnerName.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    toast.success("Proposal downloaded");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Partnership Proposal Generator</CardTitle>
          <CardDescription>
            Generate customized partnership proposals for different organization types
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Configuration */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
            <div className="col-span-2">
              <Label>Partner Type</Label>
              <Select value={partnerType} onValueChange={(value: any) => setPartnerType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="legal_aid">Legal Aid Organization</SelectItem>
                  <SelectItem value="payment_processor">Payment Processor</SelectItem>
                  <SelectItem value="bar_association">Bar Association</SelectItem>
                  <SelectItem value="law_school">Law School</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Partner Organization Name</Label>
              <Input
                value={partnerName}
                onChange={(e) => {
                  setPartnerName(e.target.value);
                  updateRecipientEmail(e.target.value, partnerType);
                }}
                placeholder="Legal Aid Society of California"
              />
            </div>
            <div>
              <Label>Contact Person</Label>
              <Input
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
                placeholder="Jane Smith, Executive Director"
              />
            </div>
            {recipientEmail && (
              <div className="col-span-2">
                <Label>Recipient Email (Auto-detected)</Label>
                <Input
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  placeholder="email@organization.com"
                  className="font-mono"
                />
              </div>
            )}
            <div className="col-span-2">
              <Label>Additional Custom Details (Optional)</Label>
              <Textarea
                value={customDetails}
                onChange={(e) => setCustomDetails(e.target.value)}
                placeholder="Add any specific details or customizations here..."
                rows={3}
              />
            </div>
          </div>

          {/* Preview */}
          <div>
            <Label className="text-base font-semibold">Proposal Preview</Label>
            <Textarea
              value={proposalTemplates[partnerType]
                .replace(/\[Partner Name\]/g, partnerName || "[Partner Name]")
                .replace(/\[Contact Person\]/g, contactPerson || "[Contact Person]")}
              readOnly
              className="mt-2 font-mono text-sm"
              rows={25}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button onClick={copyProposal} variant="outline">
              <Copy className="h-4 w-4 mr-2" />
              Copy Proposal
            </Button>
            <Button onClick={downloadProposal}>
              <Download className="h-4 w-4 mr-2" />
              Download as .txt
            </Button>
          </div>

          {/* Tips */}
          <Card className="bg-muted">
            <CardHeader>
              <CardTitle className="text-base">Partnership Outreach Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>• <strong>Research First:</strong> Understand the organization's mission and current initiatives</p>
              <p>• <strong>Customize Metrics:</strong> Replace [X] placeholders with real numbers before sending</p>
              <p>• <strong>Follow Up:</strong> Send initial email, then follow up after 5-7 business days</p>
              <p>• <strong>Offer Value:</strong> Focus on what they gain, not what you need</p>
              <p>• <strong>Be Flexible:</strong> Be open to modifying terms based on their feedback</p>
              <p>• <strong>Build Relationships:</strong> Think long-term partnership, not one-time transaction</p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};
