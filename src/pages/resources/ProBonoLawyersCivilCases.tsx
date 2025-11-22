import { Helmet } from "react-helmet";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BreadcrumbNav } from "@/components/BreadcrumbNav";
import { InternalLinks } from "@/components/InternalLinks";
import { RelatedArticles } from "@/components/RelatedArticles";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Scale, Users, FileText, Heart, Search, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProBonoLawyersCivilCases = () => {
  const navigate = useNavigate();

  const relatedArticles = [
    {
      title: "How to Get Free Legal Advice",
      description: "Multiple pathways to accessing no-cost legal help",
      slug: "how-to-get-free-legal-advice"
    },
    {
      title: "Legal Aid Services Near Me",
      description: "Find local legal aid organizations",
      slug: "legal-aid-services-near-me"
    },
    {
      title: "When Do I Need a Lawyer",
      description: "Determine if your situation requires legal representation",
      slug: "when-do-i-need-a-lawyer"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Pro Bono Lawyers for Civil Cases (Free Legal Help) | Legal Compass</title>
        <meta 
          name="description" 
          content="Find pro bono attorneys for your civil case. Learn how to qualify for free legal representation in family law, housing, immigration, and more." 
        />
        <meta name="keywords" content="pro bono lawyer, free attorney, civil case help, volunteer lawyers, free legal representation" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Pro Bono Lawyers for Civil Cases (Free Legal Help)" />
        <meta property="og:description" content="Find pro bono attorneys for your civil case. Learn how to qualify for free legal representation." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://legalcompass.shop/resources/pro-bono-lawyers-civil-cases" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pro Bono Lawyers for Civil Cases (Free Legal Help)" />
        <meta name="twitter:description" content="Find pro bono attorneys for your civil case and learn eligibility requirements." />
        
        <link rel="canonical" href="https://legalcompass.shop/resources/pro-bono-lawyers-civil-cases" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        
        <main className="flex-1">
          <article className="max-w-4xl mx-auto px-4 py-12">
            <BreadcrumbNav />
            
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                Pro Bono Lawyers for Civil Cases
              </h1>
              <p className="text-xl text-muted-foreground">
                Access free legal representation from volunteer attorneys. Pro bono services provide quality legal help to those who qualify, ensuring justice isn't limited by financial means.
              </p>
            </header>

            <Card className="mb-8 bg-primary/10 border-primary">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Heart className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-foreground">Connect with Legal Help</h3>
                    <p className="text-muted-foreground mb-4">
                      While searching for pro bono representation, get immediate legal guidance from our AI assistant. Available 24/7 at no cost.
                    </p>
                    <Button onClick={() => navigate("/dashboard")} className="bg-primary text-primary-foreground hover:bg-primary/90">
                      Get Help Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <section className="prose prose-lg max-w-none mb-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground flex items-center gap-3">
                <Scale className="w-8 h-8 text-primary" />
                What is Pro Bono Legal Service?
              </h2>

              <Card className="mb-8">
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4">
                    <strong className="text-foreground">Pro bono</strong> comes from the Latin phrase "pro bono publico," meaning "for the public good." Pro bono legal services are provided by licensed attorneys who volunteer their time and expertise to help those who cannot afford legal representation.
                  </p>
                  <p className="text-muted-foreground">
                    Unlike legal aid organizations that employ staff attorneys, pro bono programs connect clients with private practice lawyers who donate their services. This means you receive the same quality representation as paying clients would receive from these attorneys.
                  </p>
                </CardContent>
              </Card>

              <h2 className="text-3xl font-bold mb-6 text-foreground flex items-center gap-3">
                <Search className="w-8 h-8 text-primary" />
                How to Find Pro Bono Lawyers
              </h2>

              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-semibold mb-4 text-foreground">1. State Bar Association Programs</h3>
                    <p className="text-muted-foreground mb-4">
                      Most state bar associations coordinate pro bono programs that match volunteer attorneys with eligible clients.
                    </p>
                    <div className="bg-muted p-4 rounded-lg mb-4">
                      <p className="font-semibold text-foreground mb-2">Find Your State Bar:</p>
                      <a href="https://www.americanbar.org/groups/legal_services/flh-home/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                        ABA Free Legal Help Directory
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-semibold mb-4 text-foreground">2. ProBono.Net</h3>
                    <p className="text-muted-foreground mb-4">
                      National network connecting people with pro bono opportunities and resources across all 50 states.
                    </p>
                    <a href="https://www.probono.net" className="text-primary hover:underline block" target="_blank" rel="noopener noreferrer">
                      Visit ProBono.Net →
                    </a>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-semibold mb-4 text-foreground">3. Legal Aid Referrals</h3>
                    <p className="text-muted-foreground mb-4">
                      Contact your local legal aid office—even if you don't qualify for their services, they often maintain referral lists for pro bono attorneys.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-semibold mb-4 text-foreground">4. Law Firm Pro Bono Programs</h3>
                    <p className="text-muted-foreground mb-4">
                      Many large law firms have dedicated pro bono coordinators. Contact firms in your area to inquire about their programs.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground flex items-center gap-3">
                <FileText className="w-8 h-8 text-primary" />
                Civil Cases Commonly Handled Pro Bono
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <CheckCircle className="w-6 h-6 text-primary mb-3" />
                    <h3 className="text-xl font-semibold mb-2 text-foreground">Family Law</h3>
                    <ul className="text-muted-foreground space-y-1 text-sm">
                      <li>• Divorce proceedings</li>
                      <li>• Child custody disputes</li>
                      <li>• Domestic violence protection orders</li>
                      <li>• Child support modifications</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <CheckCircle className="w-6 h-6 text-primary mb-3" />
                    <h3 className="text-xl font-semibold mb-2 text-foreground">Housing Issues</h3>
                    <ul className="text-muted-foreground space-y-1 text-sm">
                      <li>• Eviction defense</li>
                      <li>• Housing discrimination</li>
                      <li>• Landlord-tenant disputes</li>
                      <li>• Foreclosure prevention</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <CheckCircle className="w-6 h-6 text-primary mb-3" />
                    <h3 className="text-xl font-semibold mb-2 text-foreground">Immigration</h3>
                    <ul className="text-muted-foreground space-y-1 text-sm">
                      <li>• Asylum applications</li>
                      <li>• DACA renewals</li>
                      <li>• Citizenship applications</li>
                      <li>• Deportation defense</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <CheckCircle className="w-6 h-6 text-primary mb-3" />
                    <h3 className="text-xl font-semibold mb-2 text-foreground">Consumer Rights</h3>
                    <ul className="text-muted-foreground space-y-1 text-sm">
                      <li>• Debt collection abuse</li>
                      <li>• Identity theft</li>
                      <li>• Predatory lending</li>
                      <li>• Credit reporting errors</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <CheckCircle className="w-6 h-6 text-primary mb-3" />
                    <h3 className="text-xl font-semibold mb-2 text-foreground">Employment</h3>
                    <ul className="text-muted-foreground space-y-1 text-sm">
                      <li>• Discrimination claims</li>
                      <li>• Wrongful termination</li>
                      <li>• Wage theft</li>
                      <li>• Workplace harassment</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <CheckCircle className="w-6 h-6 text-primary mb-3" />
                    <h3 className="text-xl font-semibold mb-2 text-foreground">Veterans Issues</h3>
                    <ul className="text-muted-foreground space-y-1 text-sm">
                      <li>• VA benefits appeals</li>
                      <li>• Discharge upgrades</li>
                      <li>• Military records correction</li>
                      <li>• Service-connected disability claims</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground">Eligibility for Pro Bono Services</h2>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-foreground">General Requirements</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1">•</span>
                      <span><strong>Income limits:</strong> Typically 200-300% of federal poverty level (more flexible than legal aid)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1">•</span>
                      <span><strong>Case merit:</strong> Strong legal grounds and likelihood of success</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1">•</span>
                      <span><strong>Case type:</strong> Civil matters (not criminal defense or fee-generating cases)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1">•</span>
                      <span><strong>Attorney availability:</strong> Match with lawyer who has relevant expertise and capacity</span>
                    </li>
                  </ul>
                  <p className="mt-4 text-sm text-foreground font-semibold">
                    Note: Income limits are more flexible for pro bono than legal aid. Programs consider assets, family size, and case-specific factors.
                  </p>
                </CardContent>
              </Card>

              <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground">Application Process</h2>
              
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">1</span>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">Submit Application</h4>
                        <p className="text-muted-foreground text-sm">Complete intake form through bar association or pro bono program website</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">2</span>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">Initial Screening</h4>
                        <p className="text-muted-foreground text-sm">Program staff review for eligibility and case suitability</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">3</span>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">Attorney Matching</h4>
                        <p className="text-muted-foreground text-sm">Case matched with volunteer attorney who has relevant experience</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">4</span>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">Initial Consultation</h4>
                        <p className="text-muted-foreground text-sm">Meet with your attorney to discuss case strategy</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">5</span>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">Representation Begins</h4>
                        <p className="text-muted-foreground text-sm">Attorney takes on your case through resolution</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground">Pro Bono vs. Legal Aid: What's the Difference?</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Pro Bono</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary">✓</span>
                        <span>Private attorneys volunteer time</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">✓</span>
                        <span>More flexible income limits</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">✓</span>
                        <span>May handle more complex cases</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">✓</span>
                        <span>Shorter waiting times possible</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Legal Aid</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary">✓</span>
                        <span>Dedicated staff attorneys</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">✓</span>
                        <span>Strict income requirements</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">✓</span>
                        <span>Focus on basic civil needs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">✓</span>
                        <span>May have waiting lists</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8 bg-primary/10 border-l-4 border-primary p-6 rounded-r-lg">
                <p className="text-foreground font-semibold mb-2">💡 Pro Tip</p>
                <p className="text-muted-foreground">
                  Apply to both pro bono programs AND legal aid. Different organizations have different criteria and capacity. Applying to multiple sources increases your chances of getting representation.
                </p>
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

export default ProBonoLawyersCivilCases;