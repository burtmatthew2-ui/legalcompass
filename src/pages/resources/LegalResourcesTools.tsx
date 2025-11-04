import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import { ShareButton } from "@/components/ShareButton";
import { RelatedArticles } from "@/components/RelatedArticles";
import { ArticleAuthor } from "@/components/ArticleAuthor";
import { Home, ExternalLink, BookOpen } from "lucide-react";
import { Helmet } from "react-helmet";

const LegalResourcesTools = () => {
  return (
    <>
      <Helmet>
        <title>Free Legal Resources & Research Tools | Legal Compass</title>
        <meta name="description" content="Comprehensive directory of free legal research tools including the Constitution, federal and state laws, court systems, legal forms, and Legal Compass AI for instant legal answers." />
        <meta name="keywords" content="legal research tools, free legal resources, US Constitution, state laws, federal laws, legal forms, legal aid, law library, legal compass" />
        <link rel="canonical" href="https://legalcompass.shop/resources/legal-resources-tools" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-primary/5">
        <div className="flex-1">
          {/* Header */}
          <div className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-10">
            <div className="max-w-4xl mx-auto px-4 py-4">
              <Link to="/resources" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <Home className="h-4 w-4" />
                <span>Back to Resources</span>
              </Link>
            </div>
          </div>

          {/* Main Content */}
          <article className="max-w-4xl mx-auto px-4 py-8 md:py-12">
            {/* Title Section */}
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Free Legal Resources & Research Tools
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                Your comprehensive directory of free legal research tools, government resources, and where to find the laws that apply to your situation.
              </p>
              <div className="flex items-center justify-between">
                <ArticleAuthor />
                <ShareButton />
              </div>
            </header>

            <div className="prose prose-lg max-w-none">
              {/* Introduction */}
              <section className="mb-10">
                <p className="text-lg leading-relaxed text-foreground/90">
                  Understanding the law starts with knowing where to find it. This guide compiles the most useful free legal research tools, official government resources, and databases to help you research laws, find legal forms, and understand your rights.
                </p>
              </section>

              {/* AI-Powered Legal Research */}
              <section className="mb-10 p-6 bg-primary/10 border-2 border-primary/30 rounded-xl">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <BookOpen className="h-6 w-6 text-primary" />
                  Legal Compass AI - Start Here
                </h2>
                <p className="mb-4">
                  Before diving into complex legal databases, try <strong>Legal Compass AI</strong> for instant, personalized legal research with case law citations.
                </p>
                <ul className="space-y-2 mb-4">
                  <li>✓ Plain-English legal answers in seconds</li>
                  <li>✓ Cite relevant case law automatically</li>
                  <li>✓ State-specific guidance</li>
                  <li>✓ No legal jargon required</li>
                </ul>
                <Link to="/auth">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    Try Legal Compass AI Free
                  </Button>
                </Link>
              </section>

              {/* US Constitution & Founding Documents */}
              <section className="mb-10">
                <h2 className="text-3xl font-bold text-foreground mb-4">US Constitution & Founding Documents</h2>
                
                <div className="space-y-4">
                  <div className="p-4 bg-card border border-border rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Constitution of the United States</h3>
                    <p className="text-muted-foreground mb-2">
                      The supreme law of the United States, including all 27 amendments.
                    </p>
                    <a 
                      href="https://www.archives.gov/founding-docs/constitution" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1"
                    >
                      National Archives - Constitution <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>

                  <div className="p-4 bg-card border border-border rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Bill of Rights & Amendments</h3>
                    <p className="text-muted-foreground mb-2">
                      The first 10 amendments and all subsequent amendments with historical context.
                    </p>
                    <a 
                      href="https://www.archives.gov/founding-docs/bill-of-rights" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1"
                    >
                      National Archives - Bill of Rights <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </section>

              {/* Federal Laws */}
              <section className="mb-10">
                <h2 className="text-3xl font-bold text-foreground mb-4">Federal Laws & Regulations</h2>
                
                <div className="space-y-4">
                  <div className="p-4 bg-card border border-border rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">United States Code (USC)</h3>
                    <p className="text-muted-foreground mb-2">
                      Official compilation of all permanent federal laws organized by subject.
                    </p>
                    <a 
                      href="https://uscode.house.gov/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1"
                    >
                      US Code - Official Site <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>

                  <div className="p-4 bg-card border border-border rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Code of Federal Regulations (CFR)</h3>
                    <p className="text-muted-foreground mb-2">
                      Federal agency rules and regulations with full-text search.
                    </p>
                    <a 
                      href="https://www.ecfr.gov/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1"
                    >
                      eCFR - Electronic Code <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>

                  <div className="p-4 bg-card border border-border rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Congress.gov</h3>
                    <p className="text-muted-foreground mb-2">
                      Track current and past federal legislation, bills, and congressional activity.
                    </p>
                    <a 
                      href="https://www.congress.gov/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1"
                    >
                      Congress.gov <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </section>

              {/* State Laws */}
              <section className="mb-10">
                <h2 className="text-3xl font-bold text-foreground mb-4">State Laws & Statutes</h2>
                
                <div className="space-y-4">
                  <div className="p-4 bg-card border border-border rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">State Legislature Websites</h3>
                    <p className="text-muted-foreground mb-2">
                      Every state maintains its own searchable database of state statutes and codes.
                    </p>
                    <a 
                      href="https://www.ncsl.org/about-state-legislatures/state-legislative-websites-directory" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1"
                    >
                      Directory of State Legislature Sites <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>

                  <div className="p-4 bg-card border border-border rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Justia State Law Resources</h3>
                    <p className="text-muted-foreground mb-2">
                      Free searchable database of state codes, statutes, and regulations for all 50 states.
                    </p>
                    <a 
                      href="https://law.justia.com/codes/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1"
                    >
                      Justia State Codes <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>

                  <div className="p-4 bg-card border border-border rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">FindLaw State Laws</h3>
                    <p className="text-muted-foreground mb-2">
                      State-by-state legal information and statute search organized by topic.
                    </p>
                    <a 
                      href="https://statelaws.findlaw.com/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1"
                    >
                      FindLaw State Laws <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </section>

              {/* Local Laws & Ordinances */}
              <section className="mb-10">
                <h2 className="text-3xl font-bold text-foreground mb-4">Local Laws & City Ordinances</h2>
                
                <div className="space-y-4">
                  <div className="p-4 bg-card border border-border rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">How to Find Local Ordinances</h3>
                    <p className="text-muted-foreground mb-3">
                      Local laws (city and county ordinances) aren't centralized. Here's how to find them:
                    </p>
                    <ul className="space-y-2 text-muted-foreground">
                      <li><strong>1. Visit your city/county website</strong> - Search "[City Name] municipal code" or "[County Name] ordinances"</li>
                      <li><strong>2. Check the city clerk's office</strong> - Most cities publish codes online or at city hall</li>
                      <li><strong>3. Use Municode.com</strong> - Large database of municipal codes across the US</li>
                      <li><strong>4. Contact local government</strong> - Call city hall or county clerk for specific ordinances</li>
                    </ul>
                    <a 
                      href="https://www.municode.com/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1 mt-3"
                    >
                      Municode Library <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </section>

              {/* Court Systems */}
              <section className="mb-10">
                <h2 className="text-3xl font-bold text-foreground mb-4">Court Systems & Case Law</h2>
                
                <div className="space-y-4">
                  <div className="p-4 bg-card border border-border rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">PACER (Federal Courts)</h3>
                    <p className="text-muted-foreground mb-2">
                      Public Access to Court Electronic Records - Search federal court cases and filings.
                    </p>
                    <a 
                      href="https://pacer.uscourts.gov/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1"
                    >
                      PACER System <ExternalLink className="h-4 w-4" />
                    </a>
                    <p className="text-sm text-muted-foreground mt-2">Note: Requires registration, charges per page viewed</p>
                  </div>

                  <div className="p-4 bg-card border border-border rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Google Scholar Legal Opinions</h3>
                    <p className="text-muted-foreground mb-2">
                      Free searchable database of US federal and state court opinions.
                    </p>
                    <a 
                      href="https://scholar.google.com/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1"
                    >
                      Google Scholar - Case Law <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>

                  <div className="p-4 bg-card border border-border rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Justia Case Law</h3>
                    <p className="text-muted-foreground mb-2">
                      Free access to federal and state court opinions with citation tools.
                    </p>
                    <a 
                      href="https://law.justia.com/cases/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1"
                    >
                      Justia Case Law <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>

                  <div className="p-4 bg-card border border-border rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">CourtListener</h3>
                    <p className="text-muted-foreground mb-2">
                      Free searchable database of millions of legal opinions from federal and state courts.
                    </p>
                    <a 
                      href="https://www.courtlistener.com/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1"
                    >
                      CourtListener <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </section>

              {/* Legal Forms */}
              <section className="mb-10">
                <h2 className="text-3xl font-bold text-foreground mb-4">Legal Forms & Documents</h2>
                
                <div className="space-y-4">
                  <div className="p-4 bg-card border border-border rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">US Courts Forms</h3>
                    <p className="text-muted-foreground mb-2">
                      Official federal court forms for bankruptcy, civil cases, criminal cases, and more.
                    </p>
                    <a 
                      href="https://www.uscourts.gov/forms" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1"
                    >
                      Federal Court Forms <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>

                  <div className="p-4 bg-card border border-border rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Legal Aid Society Forms</h3>
                    <p className="text-muted-foreground mb-2">
                      Free legal forms for housing, family law, immigration, and consumer issues.
                    </p>
                    <a 
                      href="https://legalaidnyc.org/get-help/legal-forms/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1"
                    >
                      Legal Aid Forms <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>

                  <div className="p-4 bg-card border border-border rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">State Court Forms</h3>
                    <p className="text-muted-foreground mb-2">
                      Most state courts provide free downloadable forms for common cases.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Search "[Your State] court forms" to find your state's official forms portal.
                    </p>
                  </div>
                </div>
              </section>

              {/* Legal Aid & Free Help */}
              <section className="mb-10">
                <h2 className="text-3xl font-bold text-foreground mb-4">Legal Aid & Free Legal Help</h2>
                
                <div className="space-y-4">
                  <div className="p-4 bg-card border border-border rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Legal Services Corporation (LSC)</h3>
                    <p className="text-muted-foreground mb-2">
                      Find free legal aid providers in your area based on income eligibility.
                    </p>
                    <a 
                      href="https://www.lsc.gov/what-legal-aid/find-legal-aid" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1"
                    >
                      Find Legal Aid <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>

                  <div className="p-4 bg-card border border-border rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">State Bar Associations</h3>
                    <p className="text-muted-foreground mb-2">
                      Most state bars offer lawyer referral services and free legal clinics.
                    </p>
                    <a 
                      href="https://www.americanbar.org/groups/legal_services/flh-home/flh-find-legal-help/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1"
                    >
                      ABA Find Legal Help <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>

                  <div className="p-4 bg-card border border-border rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Pro Bono Net</h3>
                    <p className="text-muted-foreground mb-2">
                      Network of free legal services, self-help resources, and legal aid organizations.
                    </p>
                    <a 
                      href="https://www.probono.net/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1"
                    >
                      Pro Bono Net <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </section>

              {/* Government Resources */}
              <section className="mb-10">
                <h2 className="text-3xl font-bold text-foreground mb-4">Government Legal Resources</h2>
                
                <div className="space-y-4">
                  <div className="p-4 bg-card border border-border rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">USA.gov Legal Resources</h3>
                    <p className="text-muted-foreground mb-2">
                      Official US government portal with links to legal topics, court info, and government services.
                    </p>
                    <a 
                      href="https://www.usa.gov/legal-issues" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1"
                    >
                      USA.gov Legal Portal <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>

                  <div className="p-4 bg-card border border-border rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Federal Trade Commission (FTC)</h3>
                    <p className="text-muted-foreground mb-2">
                      Consumer protection resources, scam alerts, and identity theft help.
                    </p>
                    <a 
                      href="https://consumer.ftc.gov/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1"
                    >
                      FTC Consumer Portal <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>

                  <div className="p-4 bg-card border border-border rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Department of Labor</h3>
                    <p className="text-muted-foreground mb-2">
                      Employment law resources, wage information, and workers' rights.
                    </p>
                    <a 
                      href="https://www.dol.gov/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1"
                    >
                      Department of Labor <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </section>

              {/* Legal Research Tips */}
              <section className="mb-10">
                <h2 className="text-3xl font-bold text-foreground mb-4">How to Research Laws Effectively</h2>
                
                <div className="space-y-4">
                  <div className="p-4 bg-card border border-border rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Start Broad, Then Narrow</h3>
                    <ol className="space-y-2 text-muted-foreground list-decimal list-inside">
                      <li>Identify whether it's a federal, state, or local issue</li>
                      <li>Use plain-English searches first (Google, Legal Compass AI)</li>
                      <li>Find the specific statute or code section</li>
                      <li>Read related case law to understand how it's applied</li>
                      <li>Check for recent changes or amendments</li>
                    </ol>
                  </div>

                  <div className="p-4 bg-card border border-border rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Understanding Legal Citations</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li><strong>42 U.S.C. § 1983</strong> = Title 42 of US Code, Section 1983</li>
                      <li><strong>Cal. Civ. Code § 1950.5</strong> = California Civil Code, Section 1950.5</li>
                      <li><strong>Brown v. Board, 347 U.S. 483 (1954)</strong> = Supreme Court case from 1954</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Conclusion CTA */}
              <section className="mt-12 p-6 bg-primary/10 border-2 border-primary/30 rounded-xl">
                <h2 className="text-2xl font-bold mb-4">Skip the Legal Jargon - Get Instant Answers</h2>
                <p className="mb-4">
                  While these resources are invaluable, they can be overwhelming for non-lawyers. <strong>Legal Compass AI</strong> searches these databases for you and explains the law in plain English with citations.
                </p>
                <Link to="/auth">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    Try Legal Compass AI Free
                  </Button>
                </Link>
              </section>
            </div>
          </article>

          <RelatedArticles currentSlug="legal-resources-tools" />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default LegalResourcesTools;