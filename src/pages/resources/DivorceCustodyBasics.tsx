import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Home, Scale } from "lucide-react";
import { Helmet } from "react-helmet";

const DivorceCustodyBasics = () => {
  return (
    <>
      <Helmet>
        <title>Divorce & Child Custody Basics: State-by-State Guide | Legal Compass</title>
        <meta name="description" content="Navigate divorce proceedings, child custody arrangements, and family court procedures. State-by-state guide to divorce and custody laws." />
        <meta name="keywords" content="divorce process, child custody laws, family court, custody arrangements, divorce by state, custody rights" />
        <link rel="canonical" href="https://legalcompass.shop/resources/divorce-custody-basics" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://legalcompass.shop/resources/divorce-custody-basics" />
        <meta property="og:title" content="Divorce & Child Custody Basics: State-by-State Guide" />
        <meta property="og:description" content="Navigate divorce proceedings, child custody arrangements, and family court procedures. State-by-state guide to divorce and custody laws." />
        <meta property="og:site_name" content="Legal Compass" />
        <meta property="article:published_time" content="2025-01-15T00:00:00Z" />
        <meta property="article:modified_time" content="2025-01-15T00:00:00Z" />
        <meta property="article:author" content="Legal Compass Team" />
        <meta property="article:section" content="Family Law" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://legalcompass.shop/resources/divorce-custody-basics" />
        <meta name="twitter:title" content="Divorce & Child Custody Basics: State-by-State Guide" />
        <meta name="twitter:description" content="Navigate divorce proceedings, child custody arrangements, and family court procedures. State-by-state guide to divorce and custody laws." />
        
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Divorce & Child Custody Basics: State-by-State Guide",
            "description": "Navigate divorce proceedings, child custody arrangements, and family court procedures. State-by-state guide to divorce and custody laws.",
            "author": {
              "@type": "Organization",
              "name": "Legal Compass"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Legal Compass",
              "url": "https://legalcompass.shop"
            },
            "datePublished": "2025-01-15",
            "dateModified": "2025-01-15",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://legalcompass.shop/resources/divorce-custody-basics"
            },
            "articleSection": "Family Law",
            "keywords": "divorce process, child custody laws, family court, custody arrangements, divorce by state, custody rights"
          })}
        </script>
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
                <span className="text-sm font-semibold">Family Law</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Divorce & Child Custody Basics: State Guide
              </h1>
              <p className="text-lg text-muted-foreground">
                Navigate divorce proceedings, child custody arrangements, and family court procedures.
              </p>
            </div>

            <div className="prose prose-lg max-w-none space-y-6 text-foreground">
              <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg mb-8">
                <p className="text-lg font-medium mb-3">
                  What You'll Learn on This Page
                </p>
                <p className="text-muted-foreground">
                  This comprehensive state-by-state guide walks you through divorce and child custody fundamentals, including types of divorce (contested vs. uncontested), residency requirements, the difference between legal and physical custody, child support calculations, property division methods (community property vs. equitable distribution), and when you need an attorney versus when mediation might work.
                </p>
              </div>

              <div className="bg-card border border-border/50 p-6 rounded-lg mb-8">
                <p className="text-muted-foreground italic">
                  <strong>What makes this guide unique:</strong> Family law varies dramatically by state, but this guide identifies the universal principles that apply everywhere while highlighting critical state-specific differences. Whether you're in a community property state or an equitable distribution state, you'll understand how the law treats custody, support, and marital assets where you live.
                </p>
              </div>

              <p>
                Going through divorce and custody battles ranks among life's most stressful experiences. The legal system can feel overwhelming, especially when your children's future is at stake. While state laws differ, certain core principles and procedures apply nationwide. This guide breaks down everything you need to know about divorce and custody in plain English.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Types of Divorce</h2>
              <p>
                <strong>Uncontested divorce:</strong> Both spouses agree on all major issues including property division, child custody, and support. This is typically faster, cheaper, and less adversarial. Many states offer simplified or summary divorce procedures for uncontested cases without children or significant assets.
              </p>
              <p>
                <strong>Contested divorce:</strong> Spouses disagree on one or more issues, requiring court intervention to resolve disputes. This process involves discovery (exchanging financial information), negotiations, and potentially a trial where a judge decides contested issues.
              </p>
              <p>
                <strong>Fault vs. no-fault:</strong> All states now allow no-fault divorce (based on "irreconcilable differences" or "irretrievable breakdown"). Some states still allow fault-based divorce (adultery, abuse, abandonment), which can affect property division and support in certain jurisdictions.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Residency Requirements</h2>
              <p>
                To file for divorce, at least one spouse must meet the state's residency requirement, typically ranging from 6 weeks (Idaho, Nevada) to 1 year (many states). You file in the state where you or your spouse currently reside, not where you were married. If you've recently moved, you may need to wait before filing.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Child Custody: Legal vs. Physical</h2>
              <p>
                <strong>Legal custody:</strong> The right to make major decisions about the child's life (education, healthcare, religion). Can be sole (one parent decides) or joint (both parents decide together). Most courts prefer joint legal custody unless there's evidence of abuse or inability to co-parent.
              </p>
              <p>
                <strong>Physical custody:</strong> Where the child lives day-to-day. Can be sole (child lives primarily with one parent, the other has visitation) or joint (child splits time between both parents, often 50/50 or 60/40). The parent with more physical custody time is typically the "custodial parent."
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Best Interest of the Child Standard</h2>
              <p>
                All states use the "best interest of the child" standard to determine custody. Factors courts consider include: each parent's ability to care for the child, the child's relationship with each parent, the child's preference (if old enough, typically 12-14+), each parent's mental and physical health, history of domestic violence or substance abuse, stability of each home environment, and each parent's willingness to foster the child's relationship with the other parent.
              </p>
              <p>
                Courts do NOT automatically favor mothers over fathers. Gender-neutral custody standards have been the norm for decades, though biases can still exist in practice.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Child Support</h2>
              <p>
                All states have child support guidelines based on parents' income and the amount of time each parent has custody. Generally, the non-custodial parent (or parent with less custody time) pays support to the custodial parent. Support covers the child's basic needs: food, housing, clothing, medical care, and education.
              </p>
              <p>
                Child support is the child's right, not the parent's. You cannot waive child support in a divorce agreement—courts must approve any support arrangement and will reject agreements that don't meet the child's needs. Support typically continues until the child turns 18 (or 19-21 in some states) or graduates high school.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Property Division</h2>
              <p>
                <strong>Community property states</strong> (AZ, CA, ID, LA, NV, NM, TX, WA, WI) divide marital property 50/50. All assets and debts acquired during marriage are community property, regardless of whose name is on the title.
              </p>
              <p>
                <strong>Equitable distribution states</strong> (all others) divide property "fairly" but not necessarily equally. Courts consider factors like length of marriage, each spouse's income and earning potential, contributions to marital assets (including homemaking), and economic circumstances.
              </p>
              <p>
                <strong>Separate property</strong> (assets owned before marriage, inheritances, gifts) typically remains with the owning spouse, though commingling (mixing separate and marital funds) can make this complicated.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Spousal Support (Alimony)</h2>
              <p>
                Spousal support is not automatic. Courts award it based on: length of marriage (longer marriages more likely to result in support), income disparity between spouses, each spouse's earning capacity, age and health of both parties, contributions to the marriage (including supporting the other's career), and standard of living during marriage.
              </p>
              <p>
                <strong>Temporary support</strong> is paid during divorce proceedings. <strong>Rehabilitative support</strong> helps a lower-earning spouse become self-supporting (e.g., completing education or training). <strong>Permanent support</strong> is rare and typically reserved for long marriages where one spouse cannot become self-supporting due to age or disability.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Divorce Mediation vs. Litigation</h2>
              <p>
                <strong>Mediation:</strong> A neutral third party helps spouses negotiate agreements. Faster, cheaper, and less adversarial than litigation. Recommended for couples who can communicate civilly and want control over outcomes. Some courts require mediation before trial.
              </p>
              <p>
                <strong>Litigation:</strong> Judge decides disputed issues after trial. Necessary when spouses can't agree or when there's domestic violence, substance abuse, or other serious issues. More expensive and time-consuming but provides protection through formal legal procedures.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Get Personalized Legal Research</h2>
              <p>
                Family law varies significantly by state. If you're considering divorce or facing custody issues, <Link to="/auth" className="text-primary hover:underline font-semibold">Legal Compass AI</Link> can provide detailed research on your state's divorce procedures, custody standards, support calculations, and property division rules with citations to relevant statutes and case law.
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-border">
              <h3 className="text-lg font-semibold mb-4">Related Resources</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Link to="/resources/small-claims-court-process" className="text-primary hover:underline">
                  Small Claims Court Process
                </Link>
                <Link to="/resources/breach-of-contract-freelancers" className="text-primary hover:underline">
                  Breach of Contract Guide
                </Link>
                <Link to="/resources/consumer-refund-rights" className="text-primary hover:underline">
                  Consumer Refund Rights
                </Link>
                <Link to="/" className="text-primary hover:underline">
                  Legal Compass Home
                </Link>
              </div>
            </div>

            <div className="mt-12 bg-primary/10 border-2 border-primary/30 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-3">Need Family Law Research?</h3>
              <p className="text-muted-foreground mb-6">
                Get state-specific information about divorce and custody laws with Legal Compass AI.
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

export default DivorceCustodyBasics;
