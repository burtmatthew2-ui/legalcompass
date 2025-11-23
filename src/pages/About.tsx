import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import { Compass, Shield, Users, BookOpen, Home, Scale, CheckCircle } from "lucide-react";
import { Helmet } from "react-helmet";
import { BreadcrumbNav } from "@/components/BreadcrumbNav";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us | AI Legal Research Made Accessible | Legal Compass</title>
        <meta name="description" content="Making legal research accessible with AI. Free legal help, templates, and attorney connections. Our mission: professional legal guidance for everyone." />
        <meta name="keywords" content="about legal compass, AI legal research, legal tech company, accessible legal information, legal research platform mission" />
        <link rel="canonical" href="https://legalcompass.shop/about" />
        
        <meta property="og:title" content="About Legal Compass | AI Legal Research for Everyone" />
        <meta property="og:description" content="Free legal help, AI guidance, and verified attorneys. Making professional legal research accessible to all." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://legalcompass.shop/about" />
        <meta property="og:image" content="https://legalcompass.shop/icon-512.png" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Legal Compass | AI Legal Research Platform" />
        <meta name="twitter:description" content="Free legal help and AI research made accessible for everyone." />
        <meta name="twitter:image" content="https://legalcompass.shop/icon-512.png" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "About Legal Compass",
            "description": "Legal Compass is an AI-powered legal research platform making professional legal information accessible to everyone.",
            "publisher": {
              "@type": "Organization",
              "name": "Legal Compass",
              "logo": {
                "@type": "ImageObject",
                "url": "https://legalcompass.shop/icon-512.png"
              },
              "sameAs": ["https://legalcompass.shop"]
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-primary/5">
        <div className="flex-1">
          {/* Header */}
          <div className="border-b border-border/50 bg-card/30 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 py-6">
              <div className="flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                  <Home className="h-5 w-5" />
                  <span>Home</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Hero Section */}
          <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
            <BreadcrumbNav />
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center mb-4">
                <Compass className="w-16 h-16 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                About Legal Compass
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Making professional legal research accessible to everyone through AI-powered technology
              </p>
            </div>

            {/* Mission Section */}
            <section className="mb-12 bg-card border border-border rounded-xl p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Scale className="h-6 w-6 text-primary" />
                Our Mission
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Legal Compass was created to bridge the gap between complex legal information and everyday people who need it. 
                We believe that understanding your legal rights and options shouldn't require a law degree or expensive attorney consultations.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our platform uses advanced AI technology to help you research legal questions, understand your rights, and make informed decisions 
                about your legal matters—all while maintaining complete privacy and confidentiality.
              </p>
            </section>

            {/* How It Works */}
            <section className="mb-12 bg-card border border-border rounded-xl p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-primary" />
                How Legal Compass Works
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary font-semibold">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">AI-Powered Research Engine</h3>
                    <p className="text-sm text-muted-foreground">
                      Our advanced AI searches through vast legal databases, statutes, case law, and regulations to find information relevant to your specific question.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary font-semibold">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Multi-Jurisdiction Coverage</h3>
                    <p className="text-sm text-muted-foreground">
                      We analyze laws across all 50 US states, federal law, and major international jurisdictions including the EU, UK, Canada, Australia, and New Zealand.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary font-semibold">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Educational Information Only</h3>
                    <p className="text-sm text-muted-foreground">
                      We provide educational legal information to help you understand concepts, rights, and procedures. We do not provide legal advice or representation.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary font-semibold">4</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Privacy & Security First</h3>
                    <p className="text-sm text-muted-foreground">
                      All conversations are encrypted and completely confidential. We never share your data with anyone, and you can delete your information at any time.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* What We Are / Are Not */}
            <section className="mb-12 grid md:grid-cols-2 gap-6">
              <div className="bg-emerald-50 dark:bg-emerald-950/20 border-2 border-emerald-200 dark:border-emerald-800 rounded-xl p-6">
                <h3 className="text-lg font-bold text-emerald-900 dark:text-emerald-100 mb-4 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  What We Are
                </h3>
                <ul className="space-y-2 text-sm text-emerald-800 dark:text-emerald-200">
                  <li>✓ Legal research platform</li>
                  <li>✓ Educational resource provider</li>
                  <li>✓ AI-powered legal information tool</li>
                  <li>✓ Privacy-focused service</li>
                  <li>✓ Accessible to everyone</li>
                </ul>
              </div>

              <div className="bg-amber-50 dark:bg-amber-950/20 border-2 border-amber-200 dark:border-amber-800 rounded-xl p-6">
                <h3 className="text-lg font-bold text-amber-900 dark:text-amber-100 mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  What We Are Not
                </h3>
                <ul className="space-y-2 text-sm text-amber-800 dark:text-amber-200">
                  <li>✗ Not a law firm</li>
                  <li>✗ Not legal representation</li>
                  <li>✗ Not a substitute for an attorney</li>
                  <li>✗ Not personalized legal advice</li>
                  <li>✗ Not licensed to practice law</li>
                </ul>
              </div>
            </section>

            {/* Important Disclaimer */}
            <section className="mb-12 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-xl p-8">
              <h2 className="text-xl font-bold text-amber-900 dark:text-amber-100 mb-4">
                Important Legal Notice
              </h2>
              <p className="text-sm text-amber-900 dark:text-amber-100 leading-relaxed mb-4">
                <strong>Legal Compass is not a law firm</strong> and does not provide legal advice, opinions, or recommendations about your specific legal rights, 
                remedies, defenses, options, or strategies. The information provided through Legal Compass is general legal information only and should not be 
                relied upon as legal advice for any specific situation.
              </p>
              <p className="text-sm text-amber-900 dark:text-amber-100 leading-relaxed mb-4">
                <strong>We do not create an attorney-client relationship.</strong> Use of Legal Compass does not establish any attorney-client relationship. 
                For specific legal advice tailored to your situation, you should always consult with a licensed attorney in your jurisdiction.
              </p>
              <p className="text-sm text-amber-900 dark:text-amber-100 leading-relaxed">
                <strong>Always verify information.</strong> Laws change frequently and vary by jurisdiction. While we strive for accuracy, you should always 
                verify legal information with official sources and consult with a qualified attorney before making legal decisions.
              </p>
            </section>

            {/* Privacy Commitment */}
            <section className="mb-12 bg-card border border-border rounded-xl p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Shield className="h-6 w-6 text-primary" />
                Privacy & Confidentiality
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Your privacy is our top priority. We understand that legal matters are sensitive and personal.
              </p>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>End-to-end encryption:</strong> All conversations are encrypted and secured</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>No data sharing:</strong> We never sell or share your personal information</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Private by design:</strong> Your searches are completely isolated and confidential</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>You control your data:</strong> Delete your account and data anytime</span>
                </li>
              </ul>
              <div className="mt-6">
                <Link to="/privacy-policy">
                  <Button variant="outline">Read Our Privacy Policy</Button>
                </Link>
              </div>
            </section>

            {/* CTA */}
            <div className="text-center bg-primary/10 border-2 border-primary/30 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Join thousands of people who use Legal Compass to understand their legal rights and options.
              </p>
              <Link to="/auth">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Start Free Trial
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default About;