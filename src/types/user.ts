import type { User as SupabaseUser } from "@supabase/supabase-js";

// Re-export Supabase User type
export type User = SupabaseUser;

export interface SubscriptionStatus {
  subscribed: boolean;
  product_id: string | null;
  subscription_end: string | null;
  is_admin?: boolean;
}
