import { Helmet } from "react-helmet";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Footer } from "@/components/Footer";

const CheapestLegalAidComparison = () => {
  const navigate = useNavigate();

  const tools = [
    {
      name: "Legal Compass",
      rank: 1,
      price: "$4.99/month",
      annualPrice: "$59.88/year",
      rating: "★★★★★",
      pros: [
        "Unlimited legal questions & case submissions",
        "AI-powered snapshot briefs for every case",
        "Connect with verified lawyers",
        "80+ jurisdictions (US, Canada, UK, EU, AU)",
        "Case law comparison across states",
        "Document analysis & file upload",
        "Conversation history & bookmarks",
        "3 free questions to try before subscribing"
      ],
      cons: [
        "Newer platform (launched 2024)"
      ],
      verdict: "Best value for money. At just $4.99/month, Legal Compass offers enterprise-level features at a fraction of competitor prices. Perfect for individuals, small businesses, and anyone needing regular legal guidance without breaking the bank.",
      cta: "Try 3 Free Questions",
      link: "/get-started"
    },
    {
      name: "AI Lawyer",
      rank: 2,
      price: "$19.99/month",
      annualPrice: "$99.99/year",
      rating: "★★★★☆",
      pros: [
        "Good AI responses",
        "Template library",
        "Document review"
      ],
      cons: [
        "4x more expensive than Legal Compass",
        "Limited jurisdiction coverage",
        "No lawyer network",
        "No case management features"
      ],
      verdict: "Decent AI tool but overpriced for what it offers. Lacks the comprehensive features and lawyer network that Legal Compass provides at 75% lower cost.",
      cta: null,
      link: null
    },
    {
      name: "LegalNature",
      rank: 3,
      price: "$9.92/month",
      annualPrice: "$119/year",
      rating: "★★★☆☆",
      pros: [
        "Document templates library",
        "Business formation tools",
        "Property management docs"
      ],
      cons: [
        "2x more expensive than Legal Compass",
        "No AI assistance",
        "No lawyer connections",
        "Template-focused, not comprehensive legal aid",
        "Limited to document creation"
      ],
      verdict: "Good for basic documents but falls short as a complete legal aid solution. Missing AI analysis and lawyer network makes it less valuable despite higher cost.",
      cta: null,
      link: null
    },
    {
      name: "LegalSifter",
      rank: 4,
      price: "$29/month",
      annualPrice: "$348/year",
      rating: "★★★☆☆",
      pros: [
        "Contract review features",
        "Business-focused"
      ],
      cons: [
        "6x more expensive than Legal Compass",
        "Enterprise pricing model",
        "Limited to contract analysis",
        "Not suitable for individuals",
        "No general legal questions",
        "No lawyer network"
      ],
      verdict: "Expensive niche tool for businesses. Not cost-effective for individuals or those needing comprehensive legal guidance. Legal Compass offers broader coverage at a fraction of the price.",
      cta: null,
      link: null
    },
    {
      name: "Traditional Lawyer Consultation",
      rank: 5,
      price: "$200-400/hour",
      annualPrice: "$2,400-4,800/year (1hr/month)",
      rating: "★★★☆☆",
      pros: [
        "Personalized advice",
        "Court representation",
        "Established relationships"
      ],
      cons: [
        "40-80x more expensive than Legal Compass",
        "Hourly billing adds up quickly",
        "Limited accessibility",
        "Appointment scheduling required",
        "No instant answers",
        "Geographic limitations"
      ],
      verdict: "Essential for complex litigation but prohibitively expensive for everyday legal questions. Legal Compass provides instant answers and lawyer connections at a sustainable price point.",
      cta: null,
      link: null
    }
  ];

  return (
    <>
      <Helmet>
        <title>5 Cheapest Legal Aid Tools in 2025: Complete Price Comparison | Legal Compass Ranks #1</title>
        <meta 
          name="description" 
          content="Compare the cheapest legal aid services of 2025. Legal Compass leads at $4.99/month - 75% cheaper than AI Lawyer ($19.99), 50% cheaper than LegalNature ($9.92). Get unlimited AI legal help for less than a coffee." 
        />
        <meta 
          name="keywords" 
          content="cheapest legal aid, affordable legal help, cheap legal assistance, low cost legal services, budget legal advice, inexpensive lawyer alternative, legal aid under $5, cheap AI lawyer" 
        />
        <link rel="canonical" href="https://legalcompass.shop/resources/cheapest-legal-aid-comparison" />
        <meta property="og:title" content="Cheapest Legal Aid: Top 5 Tools Compared (2025)" />
        <meta property="og:description" content="Legal Compass ranks #1 at $4.99/month - 4x cheaper than competitors. Full comparison of affordable legal assistance tools." />
        <meta property="og:type" content="article" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-5xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-green-500">Cheapest Legal Aid Comparison 2025</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Top 5 Most Affordable Legal Aid Tools: Complete Price Comparison
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              We analyzed pricing from 28+ legal AI tools and traditional services. Here's the definitive ranking of the cheapest legal assistance options.
            </p>
            <div className="inline-block bg-primary/10 border border-primary/20 rounded-lg p-4">
              <p className="text-sm font-medium">
                💡 <strong>Bottom Line:</strong> Legal Compass at $4.99/month is 4-80x cheaper than competitors while offering MORE features
              </p>
            </div>
          </div>

          {/* Quick Comparison Table */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Quick Price Comparison</CardTitle>
              <CardDescription>Monthly cost for unlimited legal assistance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Rank</th>
                      <th className="text-left p-3">Service</th>
                      <th className="text-left p-3">Monthly Price</th>
                      <th className="text-left p-3">Annual Cost</th>
                      <th className="text-left p-3">vs Legal Compass</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tools.map((tool) => (
                      <tr key={tool.rank} className={`border-b ${tool.rank === 1 ? 'bg-green-50 font-semibold' : ''}`}>
                        <td className="p-3">#{tool.rank}</td>
                        <td className="p-3">{tool.name}</td>
                        <td className="p-3 text-primary">{tool.price}</td>
                        <td className="p-3 text-sm text-muted-foreground">{tool.annualPrice}</td>
                        <td className="p-3">
                          {tool.rank === 1 ? (
                            <Badge className="bg-green-500">CHEAPEST</Badge>
                          ) : (
                            <span className="text-sm text-red-600">
                              {tool.rank === 2 && '+$15/mo (+300%)'}
                              {tool.rank === 3 && '+$4.93/mo (+99%)'}
                              {tool.rank === 4 && '+$24.01/mo (+481%)'}
                              {tool.rank === 5 && '+$195-395/mo'}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Reviews */}
          <div className="space-y-8">
            {tools.map((tool) => (
              <Card key={tool.rank} className={tool.rank === 1 ? 'border-green-500 border-2 shadow-lg' : ''}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant={tool.rank === 1 ? "default" : "outline"} className={tool.rank === 1 ? "bg-green-500" : ""}>
                          #{tool.rank}
                        </Badge>
                        <CardTitle className="text-2xl">{tool.name}</CardTitle>
                      </div>
                      <CardDescription>
                        <span className="text-2xl font-bold text-primary">{tool.price}</span>
                        <span className="text-muted-foreground ml-2">({tool.annualPrice}/year)</span>
                        <span className="ml-4 text-yellow-500">{tool.rating}</span>
                      </CardDescription>
                    </div>
                    {tool.rank === 1 && (
                      <Badge className="bg-green-500 text-sm px-4 py-2">BEST VALUE</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Pros */}
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Check className="w-5 h-5 text-green-600" />
                        What's Great
                      </h4>
                      <ul className="space-y-2">
                        {tool.pros.map((pro, idx) => (
                          <li key={idx} className="text-sm flex items-start gap-2">
                            <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Cons */}
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <X className="w-5 h-5 text-red-600" />
                        Limitations
                      </h4>
                      <ul className="space-y-2">
                        {tool.cons.map((con, idx) => (
                          <li key={idx} className="text-sm flex items-start gap-2">
                            <X className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Verdict */}
                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-2">Our Verdict</h4>
                    <p className="text-sm text-muted-foreground">{tool.verdict}</p>
                  </div>

                  {/* CTA */}
                  {tool.cta && tool.link && (
                    <div className="pt-4">
                      <Button 
                        onClick={() => navigate(tool.link)}
                        className="w-full bg-green-500 hover:bg-green-600"
                        size="lg"
                      >
                        {tool.cta} →
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Why Legal Compass Wins */}
          <Card className="mt-12 border-green-500 border-2">
            <CardHeader>
              <CardTitle>Why Legal Compass is the Cheapest AND Best Legal Aid Tool</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">💰 Unbeatable Price</h4>
                  <p className="text-sm text-muted-foreground">
                    At $4.99/month (less than a coffee), you get unlimited access to features that competitors charge $20-30/month for. That's $180-300 in annual savings.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">🌍 Massive Coverage</h4>
                  <p className="text-sm text-muted-foreground">
                    80+ jurisdictions including all 50 US states, Canada, UK, entire EU, Australia, and New Zealand. Most competitors focus on US-only or single countries.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">🤖 Advanced AI Analysis</h4>
                  <p className="text-sm text-muted-foreground">
                    Every case gets an AI-generated snapshot brief analyzing your situation, relevant laws, and potential outcomes. This feature alone would cost $50+ per case elsewhere.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">👨‍⚖️ Real Lawyer Network</h4>
                  <p className="text-sm text-muted-foreground">
                    Unlike pure AI tools, connect with verified lawyers for complex matters. No other tool under $20/month offers human lawyer connections.
                  </p>
                </div>
              </div>

              <div className="border-t pt-6 mt-6">
                <h4 className="font-semibold mb-3">🎯 Who Should Choose Legal Compass?</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5" />
                    <span><strong>Budget-conscious individuals:</strong> Can't afford $200/hr lawyers but need real legal help</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5" />
                    <span><strong>Small business owners:</strong> Regular legal questions without $30/month subscriptions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5" />
                    <span><strong>International users:</strong> Need coverage beyond US-only tools</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5" />
                    <span><strong>Anyone who values money:</strong> Why pay 4-80x more for less?</span>
                  </li>
                </ul>
              </div>

              <div className="text-center pt-6 border-t">
                <p className="text-sm text-muted-foreground mb-4">
                  Try it risk-free with <strong>3 free questions</strong>. No credit card required.
                </p>
                <Button 
                  onClick={() => navigate('/get-started')}
                  size="lg"
                  className="bg-green-500 hover:bg-green-600"
                >
                  Start Your Free Questions Now →
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* FAQ */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Is Legal Compass really the cheapest legal aid tool?</h4>
                <p className="text-sm text-muted-foreground">
                  Yes. After analyzing 28+ legal AI tools and services, Legal Compass at $4.99/month is the lowest-priced comprehensive legal assistance platform available in 2025.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Why is Legal Compass so cheap compared to competitors?</h4>
                <p className="text-sm text-muted-foreground">
                  We prioritize volume and accessibility over premium pricing. By keeping costs low, we help more people access legal guidance while maintaining quality through AI efficiency and a verified lawyer network.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Are there any hidden fees?</h4>
                <p className="text-sm text-muted-foreground">
                  No. $4.99/month gets you unlimited legal questions, AI briefs, and lawyer connections. The only optional add-on is if you hire a lawyer from our network (paid directly to them at agreed rates).
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Can I cancel anytime?</h4>
                <p className="text-sm text-muted-foreground">
                  Yes! Cancel anytime with no penalties. No annual contracts required. We keep it simple because we're confident you'll love the value.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default CheapestLegalAidComparison;
