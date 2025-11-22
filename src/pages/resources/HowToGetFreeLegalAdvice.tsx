import { Helmet } from "react-helmet";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BreadcrumbNav } from "@/components/BreadcrumbNav";
import { InternalLinks } from "@/components/InternalLinks";
import { RelatedArticles } from "@/components/RelatedArticles";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Scale, FileText, Users, Phone, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FloatingAIButton } from "@/components/FloatingAIButton";

const HowToGetFreeLegalAdvice = () => {
  const navigate = useNavigate();

  const relatedArticles = [
    {
      title: "Legal Aid Services Near Me",
      description: "Find local legal aid organizations in your area",
      slug: "legal-aid-services-near-me"
    },
    {
      title: "Pro Bono Lawyers for Civil Cases",
      description: "Connect with attorneys offering free legal services",
      slug: "pro-bono-lawyers-civil-cases"
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
        <title>How to Get Free Legal Advice (2024 Guide) | Legal Compass</title>
        <meta 
          name="description" 
          content="Discover legitimate ways to access free legal advice. Learn about legal aid societies, pro bono services, law school clinics, and online legal resources available to you." 
        />
        <meta name="keywords" content="free legal advice, legal aid, pro bono lawyers, free consultation, legal help, online legal advice" />
        
        {/* Open Graph */}
        <meta property="og:title" content="How to Get Free Legal Advice (2024 Guide)" />
        <meta property="og:description" content="Discover legitimate ways to access free legal advice including legal aid societies and pro bono services." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://legalcompass.shop/resources/how-to-get-free-legal-advice" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="How to Get Free Legal Advice (2024 Guide)" />
        <meta name="twitter:description" content="Discover legitimate ways to access free legal advice including legal aid societies and pro bono services." />
        
        <link rel="canonical" href="https://legalcompass.shop/resources/how-to-get-free-legal-advice" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        
        <main className="flex-1">
          <article className="max-w-4xl mx-auto px-4 py-12">
            <BreadcrumbNav />
            
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                How to Get Free Legal Advice
              </h1>
              <p className="text-xl text-muted-foreground">
                Legal help doesn't always require expensive attorney fees. Learn about the many free and low-cost resources available when you need legal guidance.
              </p>
            </header>

            <Card className="mb-8 bg-primary/10 border-primary">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <MessageSquare className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-foreground">Try Legal Compass AI</h3>
                    <p className="text-muted-foreground mb-4">
                      Get instant answers to your legal questions with our free AI legal assistant. Available 24/7 with no appointment needed.
                    </p>
                    <Button onClick={() => navigate("/dashboard")} className="bg-primary text-primary-foreground hover:bg-primary/90">
                      Start Free Chat
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <section className="prose prose-lg max-w-none mb-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground flex items-center gap-3">
                <Scale className="w-8 h-8 text-primary" />
                Top Ways to Access Free Legal Advice
              </h2>

              <div className="space-y-8">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Building2 className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-2xl font-semibold mb-3 text-foreground">1. Legal Aid Organizations</h3>
                        <p className="text-muted-foreground mb-4">
                          Legal Aid societies provide free legal services to low-income individuals. These nonprofit organizations receive federal and state funding to help those who cannot afford private attorneys.
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                          <li>Eligibility based on income (typically 125% of federal poverty level)</li>
                          <li>Cover civil matters like housing, family law, and public benefits</li>
                          <li>Find your local office at <a href="https://www.lsc.gov/what-legal-aid/find-legal-aid" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">LSC.gov</a></li>
                          <li>May have waiting lists due to high demand</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Users className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-2xl font-semibold mb-3 text-foreground">2. Pro Bono Legal Services</h3>
                        <p className="text-muted-foreground mb-4">
                          Many lawyers donate their time to provide free legal help through pro bono programs. These services connect you with licensed attorneys who volunteer their expertise.
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                          <li>Available through bar associations and nonprofit legal organizations</li>
                          <li>Quality representation from experienced attorneys</li>
                          <li>Income requirements less strict than legal aid</li>
                          <li>Search at <a href="https://www.probono.net" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">ProBono.net</a></li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <FileText className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-2xl font-semibold mb-3 text-foreground">3. Law School Legal Clinics</h3>
                        <p className="text-muted-foreground mb-4">
                          Nearly every law school operates free legal clinics where supervised law students provide legal assistance under attorney oversight.
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                          <li>Free or very low-cost services</li>
                          <li>Students supervised by experienced professors</li>
                          <li>Specialize in various practice areas</li>
                          <li>Contact nearby law schools to find available clinics</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Phone className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-2xl font-semibold mb-3 text-foreground">4. State Bar Association Hotlines</h3>
                        <p className="text-muted-foreground mb-4">
                          Most state bar associations operate free legal hotlines offering brief consultations and referrals to appropriate resources.
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                          <li>Quick answers to simple legal questions</li>
                          <li>Referrals to local legal aid and pro bono programs</li>
                          <li>Some offer specific hotlines (senior, veteran, disability)</li>
                          <li>Find your state bar at <a href="https://www.americanbar.org/groups/legal_services/flh-home/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">ABA.org</a></li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground">Online Free Legal Resources</h2>
              
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold mb-3 text-foreground">Legal Compass AI Assistant</h3>
                  <p className="text-muted-foreground mb-4">
                    Our AI-powered legal assistant provides instant answers to legal questions, helps you understand your rights, and guides you through legal processes—completely free.
                  </p>
                  <Button onClick={() => navigate("/dashboard")} className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Try It Free
                  </Button>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-foreground">LawHelp.org</h3>
                    <p className="text-muted-foreground">
                      State-by-state directory of free legal aid programs, self-help resources, and court forms.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-foreground">Court Self-Help Centers</h3>
                    <p className="text-muted-foreground">
                      Many courts offer free self-help centers with forms, instructions, and limited legal guidance.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground">Tips for Getting Free Legal Help</h2>
              
              <Card>
                <CardContent className="p-6">
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1">•</span>
                      <span><strong>Act early:</strong> Don't wait until the last minute. Many free services have waiting periods.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1">•</span>
                      <span><strong>Gather documents:</strong> Have all relevant paperwork organized before seeking help.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1">•</span>
                      <span><strong>Know income limits:</strong> Check eligibility requirements before applying to legal aid.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1">•</span>
                      <span><strong>Be persistent:</strong> If denied by one program, try others—eligibility varies.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1">•</span>
                      <span><strong>Consider unbundled services:</strong> Some lawyers offer limited scope representation at reduced costs.</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </section>

            <div className="mt-12 p-8 bg-gradient-to-r from-primary/10 to-primary/5 border-2 border-primary rounded-lg">
              <div className="text-center max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold mb-4 text-foreground">Get Instant Legal Help with Legal Compass AI</h3>
                <p className="text-muted-foreground mb-6">
                  Don't wait for callbacks or appointments. Legal Compass offers the best free legal help tool powered by advanced AI technology. Get real, personalized answers to your specific legal situation in seconds—completely free and confidential.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={() => navigate("/dashboard")} size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Start Free Chat Now
                  </Button>
                  <Button onClick={() => navigate("/case-analyzer")} variant="outline" size="lg">
                    Analyze Your Case
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  ✓ No signup required • ✓ 100% confidential • ✓ Available 24/7
                </p>
              </div>
            </div>

            <RelatedArticles articles={relatedArticles} />
            <InternalLinks />
          </article>
        </main>

        <FloatingAIButton topicContext="Free Legal Advice" />
        <Footer />
      </div>
    </>
  );
};

export default HowToGetFreeLegalAdvice;