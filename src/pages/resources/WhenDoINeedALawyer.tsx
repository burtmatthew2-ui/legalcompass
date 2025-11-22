import { Helmet } from "react-helmet";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BreadcrumbNav } from "@/components/BreadcrumbNav";
import { InternalLinks } from "@/components/InternalLinks";
import { RelatedArticles } from "@/components/RelatedArticles";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle, Scale, FileText, Users, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const WhenDoINeedALawyer = () => {
  const navigate = useNavigate();

  const relatedArticles = [
    {
      title: "How to Find an Affordable Lawyer",
      description: "Strategies for getting quality legal help on a budget",
      slug: "how-to-find-affordable-lawyer"
    },
    {
      title: "Cost of Hiring an Attorney",
      description: "Understand legal fees and pricing structures",
      slug: "cost-of-hiring-attorney"
    },
    {
      title: "How to Get Free Legal Advice",
      description: "Access no-cost legal assistance resources",
      slug: "how-to-get-free-legal-advice"
    }
  ];

  return (
    <>
      <Helmet>
        <title>When Do I Need a Lawyer? (Complete 2024 Guide) | Legal Compass</title>
        <meta 
          name="description" 
          content="Determine if you need legal representation. Learn which situations require an attorney, when you can handle matters yourself, and how to decide." 
        />
        <meta name="keywords" content="do i need a lawyer, when to hire attorney, legal representation, self-representation, legal advice" />
        
        {/* Open Graph */}
        <meta property="og:title" content="When Do I Need a Lawyer? (Complete 2024 Guide)" />
        <meta property="og:description" content="Determine if you need legal representation and learn which situations require an attorney." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://legalcompass.shop/resources/when-do-i-need-a-lawyer" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="When Do I Need a Lawyer? (Complete Guide)" />
        <meta name="twitter:description" content="Determine if you need legal representation for your situation." />
        
        <link rel="canonical" href="https://legalcompass.shop/resources/when-do-i-need-a-lawyer" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        
        <main className="flex-1">
          <article className="max-w-4xl mx-auto px-4 py-12">
            <BreadcrumbNav />
            
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                When Do I Need a Lawyer?
              </h1>
              <p className="text-xl text-muted-foreground">
                Not every legal issue requires an attorney, but some situations demand professional representation. Learn how to make the right decision for your circumstances.
              </p>
            </header>

            <Card className="mb-8 bg-primary/10 border-primary">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <AlertCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-foreground">Not Sure If You Need a Lawyer?</h3>
                    <p className="text-muted-foreground mb-4">
                      Describe your situation to our AI assistant for a free assessment. We'll help you understand your options and whether legal representation is recommended.
                    </p>
                    <Button onClick={() => navigate("/case-analyzer")} className="bg-primary text-primary-foreground hover:bg-primary/90">
                      Get Free Case Analysis
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <section className="prose prose-lg max-w-none mb-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground flex items-center gap-3">
                <Shield className="w-8 h-8 text-primary" />
                Situations That Require a Lawyer
              </h2>

              <Card className="mb-6 border-destructive">
                <CardContent className="p-6">
                  <AlertCircle className="w-8 h-8 text-destructive mb-4" />
                  <h3 className="text-2xl font-semibold mb-4 text-foreground">You NEED a Lawyer If:</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="text-destructive mt-1 text-xl">•</span>
                      <div>
                        <p className="font-semibold text-foreground">You're Facing Criminal Charges</p>
                        <p className="text-sm text-muted-foreground">Any criminal charge, even a misdemeanor, can result in jail time and a permanent record. Constitutional right to attorney in criminal cases.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-destructive mt-1 text-xl">•</span>
                      <div>
                        <p className="font-semibold text-foreground">You're Being Sued</p>
                        <p className="text-sm text-muted-foreground">Defending a lawsuit without legal help risks default judgment and significant financial liability.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-destructive mt-1 text-xl">•</span>
                      <div>
                        <p className="font-semibold text-foreground">Large Amounts of Money Are at Stake</p>
                        <p className="text-sm text-muted-foreground">Business deals, major contracts, or litigation involving substantial sums justify legal fees.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-destructive mt-1 text-xl">•</span>
                      <div>
                        <p className="font-semibold text-foreground">Child Custody Is Disputed</p>
                        <p className="text-sm text-muted-foreground">Court decisions affect your parental rights permanently. Too important to risk self-representation.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-destructive mt-1 text-xl">•</span>
                      <div>
                        <p className="font-semibold text-foreground">Complex Legal Issues</p>
                        <p className="text-sm text-muted-foreground">Tax law, corporate structure, intellectual property, immigration—specialized areas require expertise.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-destructive mt-1 text-xl">•</span>
                      <div>
                        <p className="font-semibold text-foreground">The Other Party Has a Lawyer</p>
                        <p className="text-sm text-muted-foreground">You're at a severe disadvantage if opposing counsel knows the law and you don't.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-primary" />
                When You Might Handle It Yourself
              </h2>

              <Card className="mb-6">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold mb-4 text-foreground">Self-Representation May Work For:</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-primary" />
                        Simple Legal Matters
                      </h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Traffic tickets (non-criminal)</li>
                        <li>• Small claims court ($10,000 or less)</li>
                        <li>• Uncontested divorce (no kids/assets)</li>
                        <li>• Name changes</li>
                        <li>• Simple wills (small estates)</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                        <Users className="w-5 h-5 text-primary" />
                        Low Stakes Situations
                      </h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Security deposit disputes</li>
                        <li>• Consumer complaints</li>
                        <li>• Basic contract review</li>
                        <li>• Demand letters</li>
                        <li>• Information requests</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-foreground">Pro Tip:</strong> Even for simple matters, a brief consultation with an attorney can prevent costly mistakes. Many lawyers offer free or low-cost initial consultations.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground flex items-center gap-3">
                <Scale className="w-8 h-8 text-primary" />
                Decision-Making Factors
              </h2>

              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4 text-foreground">Complexity of the Issue</h3>
                    <p className="text-muted-foreground mb-3">Ask yourself:</p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Do I understand the laws that apply to my situation?</li>
                      <li>• Are there multiple legal issues involved?</li>
                      <li>• Will I need to gather and present evidence?</li>
                      <li>• Are there filing deadlines I could miss?</li>
                    </ul>
                    <p className="mt-3 text-sm text-foreground font-semibold">
                      If you answered "no" to the first question or "yes" to any others, consider hiring a lawyer.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4 text-foreground">Potential Consequences</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <span className="text-primary mt-1">→</span>
                        <div>
                          <p className="font-semibold text-foreground">Could you go to jail?</p>
                          <p className="text-sm text-muted-foreground">Definitely need a lawyer</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-primary mt-1">→</span>
                        <div>
                          <p className="font-semibold text-foreground">Could you lose custody of your children?</p>
                          <p className="text-sm text-muted-foreground">Definitely need a lawyer</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-primary mt-1">→</span>
                        <div>
                          <p className="font-semibold text-foreground">Could you lose more than $5,000?</p>
                          <p className="text-sm text-muted-foreground">Strongly consider a lawyer</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-primary mt-1">→</span>
                        <div>
                          <p className="font-semibold text-foreground">Could it affect your immigration status?</p>
                          <p className="text-sm text-muted-foreground">Definitely need a lawyer</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4 text-foreground">Cost vs. Benefit Analysis</h3>
                    <p className="text-muted-foreground mb-4">
                      Compare the cost of hiring a lawyer against potential losses from handling it yourself:
                    </p>
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-sm text-foreground mb-2"><strong>Example:</strong> $500 security deposit dispute</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Lawyer cost: $1,500+ (not worth it)</li>
                        <li>• Small claims filing: $75 (handle yourself)</li>
                      </ul>
                    </div>
                    <div className="bg-muted p-4 rounded-lg mt-3">
                      <p className="text-sm text-foreground mb-2"><strong>Example:</strong> $50,000 personal injury case</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Lawyer on contingency: 33% of recovery (worth it)</li>
                        <li>• Self-representation: Risk getting nothing</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground">Hybrid Approaches</h2>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-foreground">Limited Scope Representation</h3>
                  <p className="text-muted-foreground mb-4">
                    You don't have to choose between full representation and doing everything yourself. Many attorneys offer "unbundled" services:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="border-l-4 border-primary pl-4">
                      <h4 className="font-semibold text-foreground mb-2">Document Review Only</h4>
                      <p className="text-sm text-muted-foreground">Lawyer reviews contracts or court filings you prepared</p>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <h4 className="font-semibold text-foreground mb-2">Coaching/Consultation</h4>
                      <p className="text-sm text-muted-foreground">Attorney advises you on strategy and procedure</p>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <h4 className="font-semibold text-foreground mb-2">Draft Documents</h4>
                      <p className="text-sm text-muted-foreground">Lawyer prepares filings, you handle court appearances</p>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <h4 className="font-semibold text-foreground mb-2">Settlement Negotiation</h4>
                      <p className="text-sm text-muted-foreground">Attorney handles negotiations, you manage other aspects</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    This can save significantly on legal fees while still getting professional guidance on critical issues.
                  </p>
                </CardContent>
              </Card>

              <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground">Red Flags: Get a Lawyer Immediately</h2>
              
              <Card className="border-destructive">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-destructive">
                      <AlertCircle className="w-6 h-6 flex-shrink-0" />
                      <p className="font-semibold">You've been served with legal papers</p>
                    </div>
                    <div className="flex items-center gap-3 text-destructive">
                      <AlertCircle className="w-6 h-6 flex-shrink-0" />
                      <p className="font-semibold">Police want to question you</p>
                    </div>
                    <div className="flex items-center gap-3 text-destructive">
                      <AlertCircle className="w-6 h-6 flex-shrink-0" />
                      <p className="font-semibold">You're being investigated (IRS, regulatory agency, etc.)</p>
                    </div>
                    <div className="flex items-center gap-3 text-destructive">
                      <AlertCircle className="w-6 h-6 flex-shrink-0" />
                      <p className="font-semibold">Someone threatens to sue you</p>
                    </div>
                    <div className="flex items-center gap-3 text-destructive">
                      <AlertCircle className="w-6 h-6 flex-shrink-0" />
                      <p className="font-semibold">Your rights are being violated</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm font-semibold text-foreground">
                    ⚠️ Time-sensitive! Missing deadlines can forfeit your rights. Contact an attorney within 24-48 hours.
                  </p>
                </CardContent>
              </Card>

              <div className="mt-8 bg-primary/10 border-l-4 border-primary p-6 rounded-r-lg">
                <h3 className="font-semibold text-lg mb-2 text-foreground">Still Unsure?</h3>
                <p className="text-muted-foreground mb-4">
                  Most attorneys offer free initial consultations. A 30-minute call can clarify whether you need representation and give you valuable guidance. It costs nothing to ask.
                </p>
                <Button onClick={() => navigate("/find-lawyers")} className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Find Lawyers in Your Area
                </Button>
              </div>
            </section>

            <RelatedArticles articles={relatedArticles} />
            <InternalLinks />
          </article>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default WhenDoINeedALawyer;