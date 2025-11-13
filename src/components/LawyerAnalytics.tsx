import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Briefcase, CheckCircle, Clock, TrendingUp } from "lucide-react";

interface LawyerAnalyticsProps {
  lawyerId: string;
}

interface AnalyticsData {
  totalCases: number;
  activeCases: number;
  closedCases: number;
  totalRevenue: number;
  avgCaseValue: number;
  casesByTopic: { topic: string; count: number }[];
  casesByState: { state: string; count: number }[];
  recentActivity: number;
}

export const LawyerAnalytics = ({ lawyerId }: LawyerAnalyticsProps) => {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalCases: 0,
    activeCases: 0,
    closedCases: 0,
    totalRevenue: 0,
    avgCaseValue: 0,
    casesByTopic: [],
    casesByState: [],
    recentActivity: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, [lawyerId]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      // Fetch all purchased leads
      const { data: purchases, error: purchasesError } = await supabase
        .from('lead_purchases')
        .select(`
          *,
          legal_cases!inner(*)
        `)
        .eq('lawyer_id', lawyerId);

      if (purchasesError) throw purchasesError;

      if (!purchases) {
        setLoading(false);
        return;
      }

      // Calculate metrics
      const totalCases = purchases.length;
      const activeCases = purchases.filter(p => p.status === 'active').length;
      const closedCases = purchases.filter(p => p.status === 'closed').length;
      const totalRevenue = purchases.reduce((sum, p) => sum + (p.amount_paid || 0), 0);
      const avgCaseValue = totalCases > 0 ? totalRevenue / totalCases : 0;

      // Group by topic
      const topicMap = new Map<string, number>();
      purchases.forEach(p => {
        const topic = (p.legal_cases as any).legal_topic;
        topicMap.set(topic, (topicMap.get(topic) || 0) + 1);
      });
      const casesByTopic = Array.from(topicMap.entries())
        .map(([topic, count]) => ({ topic, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      // Group by state
      const stateMap = new Map<string, number>();
      purchases.forEach(p => {
        const state = (p.legal_cases as any).state;
        stateMap.set(state, (stateMap.get(state) || 0) + 1);
      });
      const casesByState = Array.from(stateMap.entries())
        .map(([state, count]) => ({ state, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      // Recent activity (last 7 days)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const recentActivity = purchases.filter(p => 
        new Date(p.purchased_at) >= sevenDaysAgo
      ).length;

      setAnalytics({
        totalCases,
        activeCases,
        closedCases,
        totalRevenue,
        avgCaseValue,
        casesByTopic,
        casesByState,
        recentActivity
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-8">
          <p className="text-center text-muted-foreground">Loading analytics...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cases</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalCases}</div>
            <p className="text-xs text-muted-foreground">
              {analytics.recentActivity} in last 7 days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Cases</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.activeCases}</div>
            <p className="text-xs text-muted-foreground">
              Currently working on
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Closed Cases</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.closedCases}</div>
            <p className="text-xs text-muted-foreground">
              Successfully resolved
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(analytics.totalRevenue / 100).toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Avg: ${(analytics.avgCaseValue / 100).toFixed(2)} per case
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Practice Areas</CardTitle>
            <CardDescription>Cases by legal topic</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics.casesByTopic.length === 0 ? (
                <p className="text-sm text-muted-foreground">No data yet</p>
              ) : (
                analytics.casesByTopic.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.topic}</span>
                    <Badge variant="secondary">{item.count} cases</Badge>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>States Served</CardTitle>
            <CardDescription>Cases by jurisdiction</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics.casesByState.length === 0 ? (
                <p className="text-sm text-muted-foreground">No data yet</p>
              ) : (
                analytics.casesByState.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.state}</span>
                    <Badge variant="secondary">{item.count} cases</Badge>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};