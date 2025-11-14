import { useState, useEffect } from "react";
import { Users, Shield, TrendingUp, CheckCircle2 } from "lucide-react";

export const LiveStatsCounter = () => {
  const [casesThisWeek, setCasesThisWeek] = useState(247);
  const [matchRate, setMatchRate] = useState(85);

  useEffect(() => {
    // Simulate live updates for engagement
    const casesInterval = setInterval(() => {
      setCasesThisWeek((prev) => {
        const change = Math.floor(Math.random() * 3);
        return Math.max(240, Math.min(260, prev + change));
      });
    }, 15000);

    const rateInterval = setInterval(() => {
      setMatchRate((prev) => {
        const change = Math.random() > 0.5 ? 1 : -1;
        return Math.max(83, Math.min(87, prev + change));
      });
    }, 20000);

    return () => {
      clearInterval(casesInterval);
      clearInterval(rateInterval);
    };
  }, []);

  return (
    <div className="py-12 px-6 bg-gradient-to-br from-primary/5 via-white to-blue-50 border-y border-primary/10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Real-Time Success Metrics
          </h2>
          <p className="text-muted-foreground">
            Join thousands getting matched with qualified attorneys
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl bg-white/80 backdrop-blur-sm border border-primary/20 shadow-lg hover:shadow-xl transition-shadow">
            <div className="p-3 rounded-full bg-gradient-to-br from-green-500 to-emerald-600">
              <CheckCircle2 className="w-7 h-7 text-white" />
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-1">{matchRate}%</div>
              <div className="text-sm font-medium text-slate-600">Match Rate</div>
              <div className="text-xs text-slate-500 mt-1">Within 24 hours</div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl bg-white/80 backdrop-blur-sm border border-primary/20 shadow-lg hover:shadow-xl transition-shadow">
            <div className="p-3 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600">
              <TrendingUp className="w-7 h-7 text-white" />
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-1">{casesThisWeek}</div>
              <div className="text-sm font-medium text-slate-600">Cases This Week</div>
              <div className="text-xs text-slate-500 mt-1">And growing</div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl bg-white/80 backdrop-blur-sm border border-primary/20 shadow-lg hover:shadow-xl transition-shadow">
            <div className="p-3 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600">
              <Users className="w-7 h-7 text-white" />
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-1">10K+</div>
              <div className="text-sm font-medium text-slate-600">Active Users</div>
              <div className="text-xs text-slate-500 mt-1">Trust us daily</div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl bg-white/80 backdrop-blur-sm border border-primary/20 shadow-lg hover:shadow-xl transition-shadow">
            <div className="p-3 rounded-full bg-gradient-to-br from-amber-500 to-orange-600">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-600 mb-1">100%</div>
              <div className="text-sm font-medium text-slate-600">Confidential</div>
              <div className="text-xs text-slate-500 mt-1">Private & secure</div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 font-medium">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Live updates every few seconds
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
