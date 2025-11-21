import { Shield, Lock, Database, Eye, Key, FileCheck } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet";
import { BreadcrumbNav } from "@/components/BreadcrumbNav";

const Security = () => {
  return (
    <>
      <Helmet>
        <title>Security & Privacy | Legal Compass - Enterprise-Grade Protection</title>
        <meta name="description" content="Legal Compass security: end-to-end encryption, row-level security policies, AI confidentiality, zero data sharing, and complete data privacy protection for your legal consultations." />
        <meta name="keywords" content="legal data security, encrypted legal research, privacy protection, secure legal consultation, data encryption, row level security" />
        <link rel="canonical" href="https://legalcompass.shop/security" />
        
        <meta property="og:title" content="Security & Privacy - Enterprise-Grade Protection | Legal Compass" />
        <meta property="og:description" content="End-to-end encryption, AI confidentiality, and complete data privacy for your legal research." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://legalcompass.shop/security" />
        <meta property="og:image" content="https://legalcompass.shop/icon-512.png" />
        
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Legal Compass Security & Privacy" />
        <meta name="twitter:description" content="Enterprise-grade security and data privacy protection." />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Security & Privacy",
            "description": "Comprehensive security and privacy protection measures for Legal Compass users",
            "publisher": {
              "@type": "Organization",
              "name": "Legal Compass"
            }
          })}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <BreadcrumbNav />
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="p-4 rounded-full bg-gradient-primary">
              <Shield className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-4">
            Security & Privacy
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your legal consultations are protected by enterprise-grade security measures
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Lock className="h-6 w-6 text-primary" />
                <CardTitle>End-to-End Encryption</CardTitle>
              </div>
              <CardDescription>
                All data transmitted between you and our servers is encrypted using TLS 1.3
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>✓ HTTPS encryption for all connections</p>
              <p>✓ Passwords hashed with bcrypt + unique salts</p>
              <p>✓ Database encryption at rest</p>
              <p>✓ Secure JWT session tokens</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Database className="h-6 w-6 text-primary" />
                <CardTitle>Row-Level Security</CardTitle>
              </div>
              <CardDescription>
                Database policies ensure you can only access your own data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>✓ Isolated user profiles and conversations</p>
              <p>✓ Protected chat message history</p>
              <p>✓ Secure subscription management</p>
              <p>✓ No cross-user data leakage</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Eye className="h-6 w-6 text-primary" />
                <CardTitle>AI Confidentiality</CardTitle>
              </div>
              <CardDescription>
                Our AI assistant is bound by strict non-disclosure rules
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>✓ AI-level NDA embedded in system prompt</p>
              <p>✓ Zero cross-user data reuse</p>
              <p>✓ Only public legal databases accessed</p>
              <p>✓ Attorney-client privilege protection</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Key className="h-6 w-6 text-primary" />
                <CardTitle>Secure Authentication</CardTitle>
              </div>
              <CardDescription>
                Industry-standard authentication with automatic session management
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>✓ Secure password requirements (6+ chars)</p>
              <p>✓ Input validation & sanitization</p>
              <p>✓ Protected routes requiring auth</p>
              <p>✓ Auto token refresh for sessions</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-primary/30 bg-primary/5 backdrop-blur-sm mb-16">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <FileCheck className="h-6 w-6 text-primary" />
              <CardTitle>Data Privacy Commitment</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold text-foreground mb-2">What We Protect:</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>All legal questions and conversations</li>
                <li>Personal account information and profiles</li>
                <li>Subscription and payment details</li>
                <li>Usage statistics and activity logs</li>
                <li>Any uploaded documents or case files</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">How We Protect It:</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Database-level isolation with Row-Level Security policies</li>
                <li>AI assistant prohibited from sharing data between users</li>
                <li>Encrypted storage and transmission of all sensitive data</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Compliance with legal tech industry standards</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">What Data Sources We Use:</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Public legal databases (case law, statutes, regulations)</li>
                <li>Published legal reference materials and journals</li>
                <li>Your own conversation history (private to you only)</li>
                <li>General legal knowledge and principles</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <div className="text-center bg-card/30 backdrop-blur-sm rounded-2xl p-8 border border-border/50">
          <h2 className="text-2xl font-bold mb-4 text-foreground">Questions About Security?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            We take your privacy seriously. If you have any security concerns or questions about how we protect your data, please don't hesitate to reach out.
          </p>
          <p className="text-sm text-muted-foreground">
            Security Contact: <span className="text-primary font-semibold">security@legalcompass.app</span>
          </p>
        </div>
      </div>
      <Footer />
    </div>
    </>
  );
};

export default Security;
