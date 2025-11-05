import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { ArrowLeft, Users, FileText, Scale, AlertCircle, Heart } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { RelatedArticles } from "@/components/RelatedArticles";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import { ArticleAuthor } from "@/components/ArticleAuthor";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const relatedArticles = [
  {
    title: "Divorce and Custody Basics",
    slug: "divorce-custody-basics",
    description: "Essential information about divorce and custody arrangements"
  },
  {
    title: "Child Support Calculation & Guidelines",
    slug: "child-support",
    description: "Understanding child support obligations and modifications"
  },
  {
    title: "How to Get a Restraining Order",
    slug: "restraining-order-guide",
    description: "Protecting yourself and children from abuse"
  }
];

export default function CustodyModificationGuide() {
  return (
    <>
      <Helmet>
        <title>How to Modify Child Custody: Complete Guide 2025 | Legal Compass</title>
        <meta name="description" content="Complete guide to modifying child custody orders. Learn when you can change custody, the legal process, required evidence, and how to win a custody modification case." />
        <meta name="keywords" content="modify custody, change custody order, custody modification, child custody change, modify visitation, material change in circumstances" />
        <link rel="canonical" href="https://legalcompass.shop/resources/custody-modification-guide" />
        
        <meta property="og:title" content="How to Modify Child Custody: Complete Guide 2025" />
        <meta property="og:description" content="Learn when and how to modify child custody orders, including legal requirements and evidence needed." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://legalcompass.shop/resources/custody-modification-guide" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "How to Modify Child Custody: Complete Guide 2025",
            "description": "Complete guide to modifying child custody orders including when you can change custody, the legal process, and required evidence.",
            "author": {
              "@type": "Organization",
              "name": "Legal Compass"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Legal Compass",
              "logo": {
                "@type": "ImageObject",
                "url": "https://legalcompass.shop/icon-512.png"
              }
            },
            "datePublished": "2025-01-15",
            "dateModified": "2025-01-15"
          })}
        </script>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        
        <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
          <Link to="/resources" className="inline-flex items-center text-primary hover:text-primary/80 mb-6 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Resources
          </Link>

          <article>
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                How to Modify Child Custody: Complete Guide
              </h1>
              <VerifiedBadge lastReviewed="2025-01-15" />
            </header>

            <ArticleAuthor />

            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Life circumstances change, and sometimes custody arrangements need to change too. Whether you're seeking 
                more time with your child or believe the current arrangement isn't in their best interest, this guide 
                explains the custody modification process and what courts look for.
              </p>

              <div className="bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 p-6 mb-8 rounded-r">
                <div className="flex items-start">
                  <Heart className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">Best Interest of the Child</h3>
                    <p className="text-blue-800 dark:text-blue-300 text-sm mb-0">
                      All custody decisions are made based on what's best for the child, not what's convenient for parents. 
                      Courts prioritize stability, safety, and the child's emotional and physical well-being.
                    </p>
                  </div>
                </div>
              </div>

              <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-6 flex items-center text-foreground">
                  <Scale className="mr-3 h-8 w-8 text-primary" />
                  When Can You Modify Custody?
                </h2>
                
                <p className="mb-6">
                  Courts don't modify custody easily. You must prove a <strong>"material change in circumstances"</strong> 
                  that affects the child's well-being. This high standard prevents parents from repeatedly returning to 
                  court over minor disputes.
                </p>

                <h3 className="text-xl font-semibold mb-4 text-foreground">Common Valid Reasons for Custody Modification:</h3>

                <div className="space-y-4">
                  <Card className="border-l-4 border-primary">
                    <CardContent className="p-6">
                      <h4 className="font-semibold mb-2 text-foreground">1. Parent's Relocation</h4>
                      <p className="text-sm text-muted-foreground">
                        Moving to a different state or far away makes the existing custody schedule impossible. Courts 
                        weigh the reason for the move, impact on child, and relocation distance.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-primary">
                    <CardContent className="p-6">
                      <h4 className="font-semibold mb-2 text-foreground">2. Child's Safety at Risk</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Evidence of abuse, neglect, or dangerous conditions such as:
                      </p>
                      <ul className="text-sm space-y-1">
                        <li>• Physical, emotional, or sexual abuse</li>
                        <li>• Substance abuse affecting parenting</li>
                        <li>• Domestic violence in the home</li>
                        <li>• Dangerous or unsanitary living conditions</li>
                        <li>• Mental health crisis affecting child safety</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-primary">
                    <CardContent className="p-6">
                      <h4 className="font-semibold mb-2 text-foreground">3. Child's Preference (If Old Enough)</h4>
                      <p className="text-sm text-muted-foreground">
                        Once children reach a certain age (typically 12-14), courts may consider their preference. The 
                        child's maturity and reasons matter more than age alone.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-primary">
                    <CardContent className="p-6">
                      <h4 className="font-semibold mb-2 text-foreground">4. Parent's Failure to Follow Court Orders</h4>
                      <p className="text-sm text-muted-foreground">
                        Chronic violation of custody orders, such as withholding visitation, alienating the child from 
                        the other parent, or refusing to communicate about the child.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-primary">
                    <CardContent className="p-6">
                      <h4 className="font-semibold mb-2 text-foreground">5. Significant Change in Parent's Circumstances</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Major life changes affecting ability to care for child:
                      </p>
                      <ul className="text-sm space-y-1">
                        <li>• Serious illness or disability</li>
                        <li>• Incarceration</li>
                        <li>• Job loss affecting ability to provide care</li>
                        <li>• Remarriage creating unsafe environment</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-primary">
                    <CardContent className="p-6">
                      <h4 className="font-semibold mb-2 text-foreground">6. Child's Needs Have Changed</h4>
                      <p className="text-sm text-muted-foreground">
                        As children grow, their needs change. Examples: teenager needs closer proximity to school, 
                        child has special educational/medical needs one parent can better address.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-primary">
                    <CardContent className="p-6">
                      <h4 className="font-semibold mb-2 text-foreground">7. Both Parents Agree to Modification</h4>
                      <p className="text-sm text-muted-foreground">
                        If both parents agree on new terms, courts typically approve without extensive hearing (still 
                        must be in child's best interest).
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-6 rounded mt-6">
                  <h3 className="font-semibold text-red-900 dark:text-red-200 mb-3">NOT Valid Reasons to Modify Custody:</h3>
                  <ul className="space-y-2 text-sm text-red-800 dark:text-red-300">
                    <li>• You don't like the other parent's new partner</li>
                    <li>• The other parent has a different parenting style</li>
                    <li>• You want to reduce child support payments</li>
                    <li>• Minor disagreements about school, activities, or diet</li>
                    <li>• Your work schedule changed (unless dramatic impact)</li>
                    <li>• Revenge or spite toward ex-partner</li>
                  </ul>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-6 flex items-center text-foreground">
                  <FileText className="mr-3 h-8 w-8 text-primary" />
                  Step-by-Step Custody Modification Process
                </h2>

                <div className="space-y-8">
                  <div className="border-l-4 border-primary pl-6">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Step 1: Try to Negotiate with the Other Parent First</h3>
                    <p className="mb-3">
                      Before going to court, attempt to reach an agreement. Benefits include:
                    </p>
                    <ul className="space-y-2 mb-4">
                      <li>• Lower cost (no attorney fees for contested trial)</li>
                      <li>• Faster resolution</li>
                      <li>• More control over outcome</li>
                      <li>• Less stress for children</li>
                    </ul>
                    <p className="text-sm text-muted-foreground italic">
                      Consider mediation if direct negotiation isn't working ($100-$300/hour, split between parents)
                    </p>
                  </div>

                  <div className="border-l-4 border-primary pl-6">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Step 2: File a Motion to Modify Custody</h3>
                    <p className="mb-3">
                      If negotiation fails, file paperwork with the court that issued the original custody order. You'll need:
                    </p>
                    <ul className="space-y-2 mb-4">
                      <li>• Motion to Modify Child Custody</li>
                      <li>• Declaration/Affidavit explaining why modification is needed</li>
                      <li>• Proposed new custody order</li>
                      <li>• Filing fee ($200-$500 depending on state)</li>
                    </ul>
                    <p className="text-sm text-muted-foreground">
                      Forms typically available on your county court website or family law facilitator's office.
                    </p>
                  </div>

                  <div className="border-l-4 border-primary pl-6">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Step 3: Serve the Other Parent</h3>
                    <p className="mb-3">
                      The other parent must be officially notified ("served") of your motion. Methods include:
                    </p>
                    <ul className="space-y-2 mb-4">
                      <li>• Sheriff or process server (recommended)</li>
                      <li>• Certified mail (in some states)</li>
                      <li>• Someone over 18 (not you) who delivers documents</li>
                    </ul>
                    <p className="text-sm text-muted-foreground">
                      Proof of service must be filed with the court. The other parent has 20-30 days to respond.
                    </p>
                  </div>

                  <div className="border-l-4 border-primary pl-6">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Step 4: Attend Mediation (If Required)</h3>
                    <p className="mb-3">
                      Many states require mediation before a custody trial. A neutral mediator helps parents reach 
                      agreement. Mediation is typically:
                    </p>
                    <ul className="space-y-2 mb-4">
                      <li>• Confidential (discussions can't be used in court)</li>
                      <li>• Less adversarial than court</li>
                      <li>• 2-4 hours long</li>
                      <li>• Free or low-cost through court programs</li>
                    </ul>
                    <p className="text-sm text-muted-foreground">
                      If you reach agreement, it becomes a court order. If not, you proceed to trial.
                    </p>
                  </div>

                  <div className="border-l-4 border-primary pl-6">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Step 5: Custody Evaluation (If Ordered)</h3>
                    <p className="mb-3">
                      In contested cases, the court may order a custody evaluation by a psychologist or social worker:
                    </p>
                    <ul className="space-y-2 mb-4">
                      <li>• Home visits to both parents</li>
                      <li>• Interviews with parents and children</li>
                      <li>• Psychological testing</li>
                      <li>• Review of school, medical records</li>
                      <li>• Interviews with teachers, doctors, others involved</li>
                    </ul>
                    <p className="text-sm mb-3">
                      <strong>Cost:</strong> $1,500-$10,000 (split between parents or ordered to one party)
                    </p>
                    <p className="text-sm text-muted-foreground">
                      The evaluator provides a recommendation to the court, which judges heavily weigh.
                    </p>
                  </div>

                  <div className="border-l-4 border-primary pl-6">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Step 6: Prepare for the Hearing</h3>
                    <p className="mb-3">Gather and organize evidence to support your case:</p>
                    <ul className="space-y-2 mb-4">
                      <li>• Documentation of abuse, neglect, or dangerous conditions</li>
                      <li>• Police reports, CPS records, medical records</li>
                      <li>• Text messages, emails showing violations or concerning behavior</li>
                      <li>• School records, report cards</li>
                      <li>• Witness testimony (teachers, therapists, family members)</li>
                      <li>• Calendar showing custody violations</li>
                      <li>• Photos or videos</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-primary pl-6">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Step 7: Attend the Court Hearing</h3>
                    <p className="mb-3">
                      At the hearing, both parents present evidence and testimony. The judge will consider:
                    </p>
                    <ul className="space-y-2 mb-4">
                      <li>• Evidence of material change in circumstances</li>
                      <li>• Child's best interests (safety, stability, education)</li>
                      <li>• Each parent's ability to provide care</li>
                      <li>• Child's preference (if applicable)</li>
                      <li>• Custody evaluator's recommendation</li>
                      <li>• Each parent's willingness to support child's relationship with other parent</li>
                    </ul>
                    <p className="text-sm text-muted-foreground">
                      Hearings typically last 1-3 hours for uncontested cases, multiple days for complex contested cases.
                    </p>
                  </div>

                  <div className="border-l-4 border-primary pl-6">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Step 8: Receive the Court's Decision</h3>
                    <p className="mb-3">
                      The judge will issue a ruling either:
                    </p>
                    <ul className="space-y-2 mb-4">
                      <li>• Immediately at the end of the hearing (verbal decision)</li>
                      <li>• In writing days or weeks later (more common for complex cases)</li>
                    </ul>
                    <p className="mb-3">The judge can:</p>
                    <ul className="space-y-2 mb-4">
                      <li>• Grant your requested modification</li>
                      <li>• Deny the modification (keep existing order)</li>
                      <li>• Order a different arrangement than what either parent requested</li>
                      <li>• Order supervised visitation if safety concerns exist</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-6 flex items-center text-foreground">
                  <Users className="mr-3 h-8 w-8 text-primary" />
                  What Evidence Do You Need?
                </h2>
                
                <p className="mb-6">
                  Strong evidence is critical to winning custody modification. Document everything and be specific:
                </p>

                <div className="space-y-4">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-3 text-foreground">To Prove Abuse or Neglect:</h3>
                      <ul className="text-sm space-y-2">
                        <li>• Police reports and 911 call records</li>
                        <li>• Medical records documenting injuries</li>
                        <li>• CPS investigation reports</li>
                        <li>• Photos of injuries or unsafe conditions</li>
                        <li>• Witness statements from teachers, doctors, family</li>
                        <li>• Child's therapist records (may require subpoena)</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-3 text-foreground">To Prove Substance Abuse:</h3>
                      <ul className="text-sm space-y-2">
                        <li>• DUI convictions or arrests</li>
                        <li>• Drug test results</li>
                        <li>• Rehab or treatment records</li>
                        <li>• Photos/videos of intoxication around children</li>
                        <li>• Witnesses who observed impaired behavior</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-3 text-foreground">To Prove Violation of Custody Orders:</h3>
                      <ul className="text-sm space-y-2">
                        <li>• Calendar documenting missed visitations</li>
                        <li>• Text messages/emails refusing visitation</li>
                        <li>• Police reports for custody interference</li>
                        <li>• Witness testimony confirming violations</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-3 text-foreground">To Prove Child's Best Interest in Your Care:</h3>
                      <ul className="text-sm space-y-2">
                        <li>• School records showing improved grades</li>
                        <li>• Medical records showing consistent healthcare</li>
                        <li>• Evidence of stable home environment</li>
                        <li>• Involvement in child's activities and school</li>
                        <li>• Letters from teachers, coaches, counselors</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-500 p-6 rounded-r mt-6">
                  <div className="flex items-start">
                    <AlertCircle className="h-6 w-6 text-amber-600 mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-amber-900 dark:text-amber-200 mb-2">Evidence Tips</h3>
                      <ul className="text-amber-800 dark:text-amber-300 text-sm space-y-1">
                        <li>• Document incidents as they happen (dates, times, details)</li>
                        <li>• Keep communications businesslike and respectful (texts/emails may be shown to judge)</li>
                        <li>• Never falsify evidence or coach your child</li>
                        <li>• Focus on facts, not emotions or opinions</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-6 text-foreground">Cost of Custody Modification</h2>
                
                <div className="space-y-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-foreground">Filing Fees</h3>
                        <span className="text-primary font-semibold">$200-$500</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Court fees to file motion. May be waived if you qualify for indigency.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-foreground">Attorney Fees (Uncontested)</h3>
                        <span className="text-primary font-semibold">$1,500-$5,000</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        If both parents agree or case is straightforward
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-foreground">Attorney Fees (Contested)</h3>
                        <span className="text-primary font-semibold">$5,000-$30,000+</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        For trial preparation, hearings, and lengthy litigation
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-foreground">Custody Evaluation</h3>
                        <span className="text-primary font-semibold">$1,500-$10,000</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        If court orders professional evaluation (split between parents)
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-foreground">Mediation</h3>
                        <span className="text-primary font-semibold">$0-$1,500</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Court-provided mediation often free; private mediators $100-$300/hour
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-6 text-foreground">Tips for a Successful Custody Modification</h2>
                
                <div className="space-y-4">
                  <Card className="border-l-4 border-emerald-500">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-emerald-900 dark:text-emerald-200 mb-2">✓ Focus on Child's Needs, Not Your Convenience</h3>
                      <p className="text-sm text-emerald-800 dark:text-emerald-300">
                        Frame everything in terms of what's best for your child. Courts don't care about parent preferences.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-emerald-500">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-emerald-900 dark:text-emerald-200 mb-2">✓ Document Everything</h3>
                      <p className="text-sm text-emerald-800 dark:text-emerald-300">
                        Keep detailed records of all incidents, communications, and interactions. Memories fade; documents don't.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-emerald-500">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-emerald-900 dark:text-emerald-200 mb-2">✓ Be Cooperative and Reasonable</h3>
                      <p className="text-sm text-emerald-800 dark:text-emerald-300">
                        Courts favor parents who encourage the other parent's relationship with the child. Show flexibility.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-emerald-500">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-emerald-900 dark:text-emerald-200 mb-2">✓ Follow Current Court Orders Religiously</h3>
                      <p className="text-sm text-emerald-800 dark:text-emerald-300">
                        Even if you think they're unfair, violating orders hurts your case. Document when the other parent violates.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-red-500">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-red-900 dark:text-red-200 mb-2">✗ Don't Bad-Mouth the Other Parent</h3>
                      <p className="text-sm text-red-800 dark:text-red-300">
                        Judges view parental alienation very negatively. Never speak poorly of the other parent to your child or in public.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-red-500">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-red-900 dark:text-red-200 mb-2">✗ Don't Use Your Child as a Messenger or Spy</h3>
                      <p className="text-sm text-red-800 dark:text-red-300">
                        Don't ask your child to report on the other parent or deliver messages. This is harmful to the child.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-red-500">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-red-900 dark:text-red-200 mb-2">✗ Don't Make False Allegations</h3>
                      <p className="text-sm text-red-800 dark:text-red-300">
                        False abuse claims will backfire spectacularly. Only report legitimate concerns with evidence.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </section>

              <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-r mb-8">
                <h3 className="font-semibold text-lg mb-3 text-foreground">Need Help with Custody Modification?</h3>
                <p className="mb-4 text-sm">
                  Custody cases are among the most emotionally charged legal matters. A family law attorney can help you 
                  build a strong case, navigate court procedures, and fight for your child's best interests. Many offer 
                  free consultations.
                </p>
                <Link to="/dashboard">
                  <Button className="w-full sm:w-auto">
                    Get Free Legal Research with Legal Compass AI
                  </Button>
                </Link>
              </div>
            </div>

            <RelatedArticles articles={relatedArticles} />
          </article>
        </main>

        <NewsletterSignup />
        <Footer />
      </div>
    </>
  );
}