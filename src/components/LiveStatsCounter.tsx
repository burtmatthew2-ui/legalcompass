import { useState, useEffect } from "react";
import { Users, MessageSquare, Globe } from "lucide-react";

export const LiveStatsCounter = () => {
  const [questionsToday, setQuestionsToday] = useState(1247);
  const [activeUsers, setActiveUsers] = useState(89);

  useEffect(() => {
    // Simulate live updates for engagement
    const questionInterval = setInterval(() => {
      setQuestionsToday((prev) => prev + Math.floor(Math.random() * 3));
    }, 8000);

    const userInterval = setInterval(() => {
      setActiveUsers((prev) => {
        const change = Math.floor(Math.random() * 5) - 2;
        return Math.max(75, Math.min(125, prev + change));
      });
    }, 12000);

    return () => {
      clearInterval(questionInterval);
      clearInterval(userInterval);
    };
  }, []);

  return (
    <div className="py-8 px-6 bg-white border-y border-slate-200">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center justify-center gap-4 p-6 rounded-lg bg-gradient-to-br from-primary/5 to-blue-50 border border-primary/20">
            <MessageSquare className="w-8 h-8 text-primary" />
            <div>
              <div className="text-3xl font-bold text-primary">{questionsToday.toLocaleString()}</div>
              <div className="text-sm text-slate-600">Questions answered today</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 p-6 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200">
            <Users className="w-8 h-8 text-green-600" />
            <div>
              <div className="text-3xl font-bold text-green-700">{activeUsers}</div>
              <div className="text-sm text-slate-600">Active users now</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 p-6 rounded-lg bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200">
            <Globe className="w-8 h-8 text-purple-600" />
            <div>
              <div className="text-3xl font-bold text-purple-700">80+</div>
              <div className="text-sm text-slate-600">Jurisdictions covered</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
