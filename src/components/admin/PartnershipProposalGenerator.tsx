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

  const proposalTemplates = {
    legal_aid: `PARTNERSHIP PROPOSAL
Legal Compass x [Partner Name]

TO: [Contact Person]
FROM: Legal Compass Team
DATE: ${new Date().toLocaleDateString()}
RE: Strategic Partnership Opportunity

---

EXECUTIVE SUMMARY

Legal Compass is seeking to partner with [Partner Name] to expand access to legal services for underserved communities. Our platform connects individuals with verified attorneys, and we believe a partnership would create significant value for both organizations and the people we serve.

---

ABOUT LEGAL COMPASS

Legal Compass is an AI-powered legal guidance platform that:
• Provides free initial legal research and guidance
• Connects clients with verified attorneys for $4.99/month
• Offers secure case management and communication tools
• Serves clients across all 50 states

Current Metrics:
• [X] Active users
• [X] Verified attorneys in network
• [X] Cases managed monthly

---

PARTNERSHIP OPPORTUNITY

We propose a strategic partnership where:

1. REFERRAL INTEGRATION
   • [Partner Name] refers clients to Legal Compass for attorney matching
   • Legal Compass provides discounted/free access for referred clients
   • Seamless integration with your existing intake process

2. CO-BRANDED RESOURCES
   • Joint educational materials and guides
   • Shared legal information resources
   • Cross-promotion to both audiences

3. DATA SHARING (Privacy-Compliant)
   • Aggregate insights on legal needs in your community
   • Gap analysis to identify underserved areas
   • Success metrics and impact reporting

---

BENEFITS FOR [PARTNER NAME]

✓ Extended Service Offering: Provide attorney matching without additional overhead
✓ Improved Client Outcomes: Connect clients with qualified legal help quickly
✓ Data & Insights: Better understand legal needs in your service area
✓ Brand Association: Partner with innovative legal tech platform
✓ No Financial Investment: Revenue-neutral partnership model

---

BENEFITS FOR CLIENTS

✓ Seamless Referral Process: One-click attorney matching
✓ Verified Attorneys: All lawyers are bar-verified and reviewed
✓ Affordable Access: Discounted rates for referred clients
✓ Case Management Tools: Track progress and communicate securely
✓ Comprehensive Support: AI guidance + human attorney expertise

---

IMPLEMENTATION TIMELINE

Month 1: Partnership agreement and integration planning
Month 2: Technical integration and staff training
Month 3: Soft launch with pilot group
Month 4: Full launch and marketing campaign

---

INVESTMENT & PRICING

• Zero setup costs for [Partner Name]
• Discounted subscription rates for referred clients (50% off)
• Optional: Revenue share on successful attorney matches
• Quarterly partnership review and optimization

---

NEXT STEPS

1. Schedule 30-minute discovery call
2. Review partnership agreement draft
3. Technical integration discussion
4. Pilot program design
5. Launch partnership

---

CONTACT INFORMATION

Legal Compass Partnership Team
Email: partnerships@legalcompass.com
Website: www.legalcompass.com

We look forward to exploring this opportunity together and making legal help more accessible to those who need it most.

${customDetails}`,

    payment_processor: `PARTNERSHIP PROPOSAL
Legal Compass x [Partner Name]

TO: [Contact Person]
FROM: Legal Compass Team
DATE: ${new Date().toLocaleDateString()}
RE: Payment Processing Partnership

---

EXECUTIVE SUMMARY

Legal Compass is seeking a payment processing partner to handle attorney-client transactions on our platform. We're looking for a partner who understands the legal industry and can provide specialized features for law practice payments.

---

ABOUT LEGAL COMPASS

Legal Compass connects clients with verified attorneys through:
• $4.99/month client subscriptions
• $150/month attorney subscriptions (up to 10 leads included)
• $1,260/year attorney subscriptions (up to 10 leads/month, save 30%)
• Future: Hourly billing and retainer management

Current Volume:
• [X] Monthly transactions
• [X] Active attorney accounts
• Growing 20%+ month-over-month

---

PARTNERSHIP REQUIREMENTS

We need a payment processor that offers:

1. TECHNICAL CAPABILITIES
   ✓ Subscription billing with automatic renewal
   ✓ One-time payments for lead purchases
   ✓ Stripe-compatible API (current platform)
   ✓ PCI-DSS Level 1 compliance
   ✓ Support for all major credit/debit cards

2. LEGAL INDUSTRY FEATURES
   ✓ IOLTA/trust account compliance
   ✓ State bar payment regulations
   ✓ Legal-specific reporting
   ✓ Client cost recovery tools

3. PLATFORM FEATURES
   ✓ Detailed transaction reporting
   ✓ Automatic fee splitting
   ✓ Dispute management
   ✓ Fraud prevention
   ✓ Multi-currency support (future)

---

TRANSACTION VOLUME PROJECTIONS

Year 1: $[X] in processed payments
Year 2: $[X] in processed payments
Year 3: $[X] in processed payments

Attorney Subscriptions: $150/month or $1,260/year
Client Subscriptions: $4.99/month, [X] active

---

WHAT WE OFFER

✓ High-volume, recurring revenue stream
✓ Low chargeback rate (<1%)
✓ Professional, verified user base
✓ Co-marketing opportunities
✓ Case study and testimonial opportunities

---

COMPETITIVE PRICING REQUEST

Please provide pricing for:
1. Per-transaction fees (percentage and flat fee)
2. Monthly platform fees
3. Chargeback fees
4. Integration and setup costs
5. Volume discounts

We're currently comparing:
• [Competitor 1]
• [Competitor 2]
• [Competitor 3]

---

INTEGRATION TIMELINE

Month 1: Contract negotiation and technical planning
Month 2: API integration and testing
Month 3: Security audit and compliance review
Month 4: Soft launch with limited transactions
Month 5: Full platform migration

---

SUPPORT REQUIREMENTS

• 24/7 technical support for payment issues
• Dedicated account manager
• Developer support during integration
• Monthly business reviews
• Quarterly platform optimization sessions

---

NEXT STEPS

1. Pricing proposal submission
2. Product demonstration
3. Technical integration discussion
4. Security and compliance review
5. Contract negotiation

---

CONTACT INFORMATION

Legal Compass Payments Team
Email: payments@legalcompass.com
Website: www.legalcompass.com

We're looking for a long-term partner who understands the unique needs of legal industry payments.

${customDetails}`,

    bar_association: `PARTNERSHIP PROPOSAL
Legal Compass x [Partner Name]

TO: [Contact Person]
FROM: Legal Compass Team
DATE: ${new Date().toLocaleDateString()}
RE: Member Benefit Partnership Opportunity

---

EXECUTIVE SUMMARY

Legal Compass proposes a partnership with [Partner Name] to provide member attorneys with exclusive access to our client-matching platform, helping solo practitioners and small firms grow their practices.

---

ABOUT LEGAL COMPASS

Legal Compass is an attorney-client matching platform that:
• Connects verified attorneys with qualified leads
• Provides case management and client communication tools
• Offers AI-powered legal research and guidance
• Serves all practice areas across multiple states

---

MEMBER BENEFITS PROGRAM

We propose offering [Partner Name] members:

1. EXCLUSIVE DISCOUNTS
   ✓ First 3 months at 50% off ($75/month instead of $150)
   ✓ Free premium account features ($99/year value)
   ✓ Priority placement in search results
   ✓ Waived verification fees

2. PRACTICE GROWTH TOOLS
   ✓ Lead matching in member's practice area
   ✓ Case management platform
   ✓ Client communication tools
   ✓ Document management and e-signature
   ✓ Automated intake forms

3. PROFESSIONAL DEVELOPMENT
   ✓ Monthly webinars on practice management
   ✓ Marketing best practices training
   ✓ Technology adoption resources
   ✓ Peer networking opportunities

---

BENEFITS FOR BAR MEMBERS

Solo Practitioners & Small Firms:
• Steady stream of qualified leads (up to 10/month)
• Subscription-based pricing ($150/month or $1,260/year)
• All-inclusive platform access
• Pre-screened, qualified clients
• Reduced marketing overhead

Mid-Size Firms:
• Supplement existing marketing efforts
• Fill practice area gaps
• Geographic expansion opportunities
• Junior attorney development leads

---

BENEFITS FOR [PARTNER NAME]

✓ Enhanced Member Value: Offer tangible practice growth benefit
✓ Member Retention: Exclusive benefit increases bar membership value
✓ No Cost to Association: Zero financial investment required
✓ Data Insights: Understand member needs and practice trends
✓ Modern Image: Associate with innovative legal tech

---

MARKETING & PROMOTION

Joint Marketing Plan:
• Bar association newsletter feature
• Member email campaign
• Webinar series on practice growth
• Conference booth and presentation
• Continuing legal education (CLE) opportunities

Legal Compass Will Provide:
• Co-branded marketing materials
• Member discount codes
• Dedicated landing page
• Email templates
• Social media assets

---

IMPLEMENTATION

Phase 1 (Month 1): Agreement and planning
Phase 2 (Month 2): Member communication campaign
Phase 3 (Month 3): Soft launch with pilot group
Phase 4 (Month 4): Full member rollout
Phase 5 (Ongoing): Quarterly review and optimization

---

SUCCESS METRICS

We'll track and report:
• Number of members who join
• Leads delivered to members
• Member satisfaction scores
• Revenue generated for member firms
• Platform usage and engagement

---

PARTNERSHIP TERMS

• 2-year initial partnership term
• Exclusive benefit for [Partner Name] members
• Quarterly business reviews
• Annual renewal with performance review
• No exclusivity required from Bar

---

INVESTMENT

From [Partner Name]:
• Email introduction to members
• Newsletter feature (quarterly)
• Website listing as member benefit
• Conference presentation opportunity

From Legal Compass:
• All technical infrastructure
• Customer support for members
• Marketing materials
• Performance reporting

---

NEXT STEPS

1. Schedule presentation to board/committee
2. Review partnership agreement
3. Plan member communication strategy
4. Set launch date
5. Begin member outreach

---

CONTACT INFORMATION

Legal Compass Partnerships Team
Email: partnerships@legalcompass.com
Website: www.legalcompass.com

We're committed to helping [Partner Name] members grow their practices and better serve their communities.

${customDetails}`,

    law_school: `PARTNERSHIP PROPOSAL
Legal Compass x [Partner Name]

TO: [Contact Person]
FROM: Legal Compass Team
DATE: ${new Date().toLocaleDateString()}
RE: Law School Partnership Opportunity

---

EXECUTIVE SUMMARY

Legal Compass proposes a partnership with [Partner Name] to provide students and recent graduates with hands-on experience in legal technology, practice management, and client services while building their professional networks.

---

ABOUT LEGAL COMPASS

Legal Compass is a legal technology platform combining AI-powered research with verified attorney-client matching. We're building the future of accessible legal services.

---

PARTNERSHIP OPPORTUNITIES

We propose a multi-faceted partnership:

1. STUDENT EXTERNSHIP PROGRAM
   • Semester-long externships in legal tech
   • Exposure to AI, product management, legal operations
   • Academic credit opportunities
   • Supervision by practicing attorneys

2. CAREER PLACEMENT PIPELINE
   • Recent graduates can join as verified attorneys
   • Exclusive onboarding support and training
   • 50% off subscription for first 6 months ($75/month)
   • Mentorship from experienced platform attorneys

3. CLINICAL LEGAL EDUCATION
   • Students handle initial case assessments
   • Faculty supervision of student work
   • Real client interactions (supervised)
   • Technology integration in clinical programs

4. RESEARCH COLLABORATION
   • Access to anonymized platform data
   • Legal access to justice research
   • Technology adoption studies
   • Student research projects and papers

---

BENEFITS FOR [PARTNER NAME]

✓ Enhanced Curriculum: Modern legal tech exposure for students
✓ Career Services: Additional placement opportunities for graduates
✓ Clinical Programs: Technology tools for clinical faculty
✓ Research Opportunities: Unique dataset for faculty research
✓ Alumni Network: Connect graduates with practice opportunities
✓ No Cost: Zero financial investment required

---

BENEFITS FOR STUDENTS

Current Students:
• Hands-on legal tech experience
• Resume builder for modern practice
• Networking with practicing attorneys
• Understanding of practice management
• Exposure to diverse practice areas

Recent Graduates:
• Immediate client flow (subscription-based access)
• Practice management infrastructure
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
                onChange={(e) => setPartnerName(e.target.value)}
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
