import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useQuestionUsage = () => {
  const [questionCount, setQuestionCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchQuestionCount = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setQuestionCount(0);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('question_usage')
        .select('question_count')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;

      setQuestionCount(data?.question_count || 0);
    } catch (error) {
      console.error('Error fetching question usage:', error);
      setQuestionCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestionCount();

    const channel = supabase
      .channel('question_usage_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'question_usage'
        },
        () => {
          fetchQuestionCount();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { questionCount, loading, remainingFreeQuestions: Math.max(0, 3 - questionCount), refetch: fetchQuestionCount };
};
