import { Helmet } from "react-helmet";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BreadcrumbNav } from "@/components/BreadcrumbNav";
import { InternalLinks } from "@/components/InternalLinks";
import { RelatedArticles } from "@/components/RelatedArticles";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Search, Phone, Building2, Users, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FloatingAIButton } from "@/components/FloatingAIButton";

const LegalAidServicesNearMe = () => {
  const navigate = useNavigate();

  const relatedArticles = [
    {
      title: "How to Get Free Legal Advice",
      description: "Comprehensive guide to accessing no-cost legal help",
      slug: "how-to-get-free-legal-advice"
    },
    {
      title: "Pro Bono Lawyers for Civil Cases",
      description: "Find attorneys offering free representation",
      slug: "pro-bono-lawyers-civil-cases"
    },
    {
      title: "How to Find an Affordable Lawyer",
      description: "Strategies for getting quality legal help on a budget",
      slug: "how-to-find-affordable-lawyer"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Legal Aid Services Near Me (2024 Directory) | Legal Compass</title>
        <meta 
          name="description" 
          content="Find legal aid organizations in your area. Access free legal services, income-based assistance, and community legal clinics near you." 
        />
        <meta name="keywords" content="legal aid near me, free legal services, legal aid society, community legal help, low-cost legal assistance" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Legal Aid Services Near Me (2024 Directory)" />
        <meta property="og:description" content="Find legal aid organizations in your area offering free legal services and income-based assistance." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://legalcompass.shop/resources/legal-aid-services-near-me" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Legal Aid Services Near Me (2024 Directory)" />
        <meta name="twitter:description" content="Find legal aid organizations in your area offering free legal services." />
        
        <link rel="canonical" href="https://legalcompass.shop/resources/legal-aid-services-near-me" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        
        <main className="flex-1">
          <article className="max-w-4xl mx-auto px-4 py-12">
            <BreadcrumbNav />
            
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                Legal Aid Services Near Me
              </h1>
              <p className="text-xl text-muted-foreground">
                Locate free and low-cost legal assistance in your community. Legal aid organizations provide critical support to those who cannot afford private attorneys.
              </p>
            </header>

            <Card className="mb-8 bg-primary/10 border-primary">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-foreground">Quick Help Finder</h3>
                    <p className="text-muted-foreground mb-4">
                      Can't find local legal aid? Use our AI assistant to get immediate legal guidance and find resources specific to your situation.
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
                <Search className="w-8 h-8 text-primary" />
                How to Find Legal Aid in Your Area
              </h2>

              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-semibold mb-4 text-foreground">National Legal Aid Directory</h3>
                    <p className="text-muted-foreground mb-4">
                      The Legal Services Corporation (LSC) maintains a comprehensive directory of all federally-funded legal aid programs across the United States.
                    </p>
                    <div className="bg-muted p-4 rounded-lg mb-4">
                      <p className="font-semibold text-foreground mb-2">Visit: <a href="https://www.lsc.gov/what-legal-aid/find-legal-aid" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">LSC.gov/find-legal-aid</a></p>
                      <p className="text-sm text-muted-foreground">Enter your zip code to find local programs instantly</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-semibold mb-4 text-foreground">State-by-State Resources</h3>
                    <p className="text-muted-foreground mb-4">
                      LawHelp.org provides state-specific directories of legal aid programs, self-help resources, and local court information.
                    </p>
                    <div className="space-y-2">
                      <a href="https://www.lawhelp.org" className="text-primary hover:underline block" target="_blank" rel="noopener noreferrer">→ LawHelp.org</a>
                      <a href="https://www.probono.net/openstates/" className="text-primary hover:underline block" target="_blank" rel="noopener noreferrer">→ ProBonoNet State Resources</a>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground flex items-center gap-3">
                <Building2 className="w-8 h-8 text-primary" />
                Types of Legal Aid Services Available
              </h2>

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardContent className="p-6">
                    <Phone className="w-8 h-8 text-primary mb-3" />
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Legal Aid Hotlines</h3>
                    <p className="text-muted-foreground">
                      Free phone consultations for quick legal questions and referrals to local resources.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <Users className="w-8 h-8 text-primary mb-3" />
                    <h3 className="text-xl font-semibold mb-3 text-foreground">In-Person Legal Clinics</h3>
                    <p className="text-muted-foreground">
                      Walk-in or appointment-based services at community centers, libraries, and courthouses.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <FileText className="w-8 h-8 text-primary mb-3" />
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Full Legal Representation</h3>
                    <p className="text-muted-foreground">
                      Complete attorney services for eligible cases including court representation.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <MapPin className="w-8 h-8 text-primary mb-3" />
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Self-Help Resources</h3>
                    <p className="text-muted-foreground">
                      Court forms, instructional videos, and workshops to handle simple legal matters yourself.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground">Common Legal Issues Covered</h2>
              
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4">Legal aid organizations typically assist with:</p>
                  <ul className="grid md:grid-cols-2 gap-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Housing and eviction defense</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Family law (divorce, custody, domestic violence)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Public benefits (SSI, SNAP, Medicaid)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Consumer protection and debt issues</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Employment discrimination</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Veterans benefits</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Immigration assistance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Elder law and healthcare issues</span>
                    </li>
                  </ul>
                  <p className="mt-4 text-sm text-muted-foreground italic">
                    Note: Legal aid typically does NOT handle criminal defense or fee-generating cases like personal injury.
                  </p>
                </CardContent>
              </Card>

              <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground">Eligibility Requirements</h2>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-foreground">Income Guidelines</h3>
                  <p className="text-muted-foreground mb-4">
                    Most legal aid programs serve individuals and families with income at or below 125% of the federal poverty level. Some programs may have higher limits.
                  </p>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="font-semibold text-foreground mb-2">2024 Federal Poverty Guidelines (125%)</p>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Individual: $16,875/year</li>
                      <li>• Family of 2: $22,875/year</li>
                      <li>• Family of 3: $28,875/year</li>
                      <li>• Family of 4: $34,875/year</li>
                    </ul>
                    <p className="text-xs mt-2 italic">Add $6,000 for each additional family member</p>
                  </div>
                </CardContent>
              </Card>

              <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground">What to Bring to Your Appointment</h2>
              
              <Card>
                <CardContent className="p-6">
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1">•</span>
                      <span><strong>Photo ID:</strong> Driver's license, passport, or state ID</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1">•</span>
                      <span><strong>Proof of income:</strong> Pay stubs, tax returns, benefits statements</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1">•</span>
                      <span><strong>Relevant documents:</strong> Court papers, contracts, leases, letters</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1">•</span>
                      <span><strong>Timeline:</strong> Written summary of important dates and events</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1">•</span>
                      <span><strong>Questions list:</strong> Prepared questions about your legal issue</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </section>

            <div className="mt-12 p-8 bg-gradient-to-r from-primary/10 to-primary/5 border-2 border-primary rounded-lg">
              <div className="text-center max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold mb-4 text-foreground">Can't Find Legal Aid? Try Legal Compass AI</h3>
                <p className="text-muted-foreground mb-6">
                  While waiting for legal aid appointments or searching for resources, get immediate help with Legal Compass—the best free legal help tool utilizing AI to provide real answers tailored to your unique situation. No waiting, no appointments, just instant legal guidance.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={() => navigate("/dashboard")} size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Get Free Legal Help Now
                  </Button>
                  <Button onClick={() => navigate("/case-analyzer")} variant="outline" size="lg">
                    Analyze Your Case Free
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  ✓ Instant answers • ✓ Personalized to your situation • ✓ 100% free
                </p>
              </div>
            </div>

            <RelatedArticles articles={relatedArticles} />
            <InternalLinks />
          </article>
        </main>

        <FloatingAIButton topicContext="Legal Aid Services" />
        <Footer />
      </div>
    </>
  );
};

export default LegalAidServicesNearMe;