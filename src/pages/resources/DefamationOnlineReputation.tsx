import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Home, Scale } from "lucide-react";
import { Helmet } from "react-helmet";

const DefamationOnlineReputation = () => {
  return (
    <>
      <Helmet>
        <title>Defamation & Online Reputation Protection Guide | Legal Compass</title>
        <meta name="description" content="Protect your reputation from false statements, libel, and online defamation. Learn about legal remedies and how to fight defamation." />
        <meta name="keywords" content="defamation law, online defamation, libel, slander, reputation protection, false statements, defamation lawsuit" />
        <link rel="canonical" href="https://legalcompass.shop/resources/defamation-online-reputation" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-primary/5">
        <div className="flex-1">
          <div className="border-b border-border/50 bg-card/30 backdrop-blur-sm">
            <div className="max-w-4xl mx-auto px-4 py-6">
              <div className="flex items-center justify-between">
                <Link to="/resources" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                  <ArrowLeft className="h-5 w-5" />
                  <span>All Resources</span>
                </Link>
                <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                  <Home className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>

          <article className="max-w-4xl mx-auto px-4 py-12">
            <div className="mb-8">
              <div className="flex items-center gap-2 text-primary mb-4">
                <Scale className="h-5 w-5" />
                <span className="text-sm font-semibold">Personal Rights</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Defamation and Online Reputation Protection
              </h1>
              <p className="text-lg text-muted-foreground">
                Protect your reputation from false statements, libel, slander, and online defamation attacks.
              </p>
            </div>

            <div className="prose prose-lg max-w-none space-y-6 text-foreground">
              <p>
                In the digital age, your reputation can be damaged in seconds through false online reviews, social media posts, or blog articles. Defamation law protects individuals and businesses from false statements that harm their reputation. Understanding when speech crosses the line from opinion to defamation—and what legal remedies are available—is crucial for protecting yourself online.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">What Is Defamation?</h2>
              <p>
                Defamation is a false statement of fact (not opinion) that is communicated to a third party and causes reputational harm. There are two types: <strong>libel</strong> (written defamation, including online posts, articles, and reviews) and <strong>slander</strong> (spoken defamation, including podcasts, videos, and verbal statements).
              </p>
              <p>
                To prove defamation, you must establish: (1) the statement was false, (2) it was presented as fact (not opinion), (3) it was published/communicated to someone other than you, (4) it caused reputational harm or financial loss, and (5) the speaker acted with negligence or malice. For public figures and matters of public concern, you must also prove "actual malice"—that the speaker knew the statement was false or recklessly disregarded the truth.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Defamation vs. Protected Speech</h2>
              <p>
                Not all negative statements are defamatory. The First Amendment protects: <strong>opinions</strong> ("I think their service is terrible"), <strong>true statements</strong> (even if harmful, truth is an absolute defense), <strong>satire and parody</strong> (clearly exaggerated statements not meant to be taken as fact), and <strong>matters of public concern</strong> (criticism of public officials receives heightened protection).
              </p>
              <p>
                The line between opinion and defamatory fact can be blurry. "John is a thief" is a statement of fact (defamatory if false). "I believe John stole from the company" might be opinion but could still be defamatory if it implies facts. Context matters significantly.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Common Online Defamation Scenarios</h2>
              <p>
                <strong>False online reviews:</strong> A competitor or angry customer posts false claims about your business (e.g., "They steal credit card information"). This is actionable defamation if demonstrably false.
              </p>
              <p>
                <strong>Social media attacks:</strong> Someone posts false accusations on Facebook, Twitter, or LinkedIn claiming you committed crimes, cheated, or engaged in unethical conduct.
              </p>
              <p>
                <strong>Revenge blogs/websites:</strong> An ex-partner, former employee, or business rival creates a website making false claims about you, often designed to appear in Google search results for your name.
              </p>
              <p>
                <strong>Deepfakes and manipulated content:</strong> Increasingly, AI-generated videos or edited images create false impressions, which can constitute defamation per se.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Defamation Per Se</h2>
              <p>
                Certain false statements are so inherently harmful that damages are presumed without proof. These include false claims that: you committed a crime, you have a loathsome disease, you engaged in sexual misconduct, or your business is dishonest or incompetent (business defamation).
              </p>
              <p>
                If defamation per se applies, you don't need to prove financial harm—reputational damage alone is sufficient. This makes these cases easier to win and often results in higher damages.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Steps to Address Defamation</h2>
              <p>
                <strong>Step 1: Document everything.</strong> Take screenshots of the defamatory content, including URLs, timestamps, and author information. Use archive services like Archive.org to preserve evidence in case the content is deleted. Document any financial losses (lost contracts, declined job offers) resulting from the defamation.
              </p>
              <p>
                <strong>Step 2: Send a cease and desist letter.</strong> Demand that the person remove the false content and issue a retraction. Many defamation cases settle after a strongly worded legal letter. Include specific false statements, explain why they're false, and threaten legal action if not removed.
              </p>
              <p>
                <strong>Step 3: Request removal from platforms.</strong> Report defamatory content to the hosting platform (Google, Facebook, Yelp, etc.). While platforms have immunity under Section 230 of the Communications Decency Act, many will remove clearly defamatory content to avoid association with illegal activity.
              </p>
              <p>
                <strong>Step 4: File a lawsuit.</strong> If the defamer doesn't comply and you've suffered significant harm, consult with a defamation attorney. Lawsuits can result in compensatory damages (financial losses), punitive damages (punishment for malicious conduct), and injunctions (court orders to remove content).
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Challenges in Defamation Cases</h2>
              <p>
                <strong>Anonymous defendants:</strong> Many online defamers hide behind pseudonyms. You can file a "John Doe" lawsuit and subpoena the platform to reveal the user's identity, though this adds time and cost.
              </p>
              <p>
                <strong>Section 230 immunity:</strong> Website operators (Google, Facebook, Yelp) generally can't be sued for content posted by users. You must sue the individual who made the statement, not the platform.
              </p>
              <p>
                <strong>Jurisdiction issues:</strong> If the defamer lives in another state or country, enforcing judgments can be difficult. You may need to file in their jurisdiction.
              </p>
              <p>
                <strong>Proof of damages:</strong> Unless defamation per se applies, you must prove actual financial or reputational harm, which can be difficult to quantify.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Online Reputation Management</h2>
              <p>
                Beyond legal action, proactive reputation management can mitigate defamation's impact. Create positive content (blogs, press releases, social media) to push negative content down in search results. Monitor your online presence using Google Alerts and reputation monitoring services. Respond professionally to negative reviews (even false ones) to show potential customers you care about feedback. Consider hiring a reputation management firm for severe cases involving multiple platforms.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Get Personalized Legal Research</h2>
              <p>
                Defamation law varies by state and involves complex First Amendment considerations. If someone has posted false information about you or your business, <Link to="/auth" className="text-primary hover:underline font-semibold">Legal Compass AI</Link> can help you research defamation standards in your jurisdiction, determine if statements are actionable, and draft a cease and desist letter with proper legal citations.
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-border">
              <h3 className="text-lg font-semibold mb-4">Related Resources</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Link to="/resources/write-cease-desist-letter" className="text-primary hover:underline">
                  How to Write a Cease and Desist Letter
                </Link>
                <Link to="/resources/small-claims-court-process" className="text-primary hover:underline">
                  Small Claims Court Process
                </Link>
                <Link to="/resources/breach-of-contract-freelancers" className="text-primary hover:underline">
                  Breach of Contract Guide
                </Link>
                <Link to="/" className="text-primary hover:underline">
                  Legal Compass Home
                </Link>
              </div>
            </div>

            <div className="mt-12 bg-primary/10 border-2 border-primary/30 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-3">Dealing with Online Defamation?</h3>
              <p className="text-muted-foreground mb-6">
                Research defamation law and learn how to protect your reputation with Legal Compass AI.
              </p>
              <Link to="/auth">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Try Legal Compass AI Free
                </Button>
              </Link>
            </div>
          </article>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default DefamationOnlineReputation;
