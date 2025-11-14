export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      bookmarked_messages: {
        Row: {
          created_at: string
          id: string
          message_id: string
          note: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          message_id: string
          note?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          message_id?: string
          note?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookmarked_messages_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "chat_messages"
            referencedColumns: ["id"]
          },
        ]
      }
      case_activity_log: {
        Row: {
          activity_type: string
          actor_id: string
          actor_type: string
          created_at: string
          description: string
          id: string
          lead_id: string
          metadata: Json | null
        }
        Insert: {
          activity_type: string
          actor_id: string
          actor_type: string
          created_at?: string
          description: string
          id?: string
          lead_id: string
          metadata?: Json | null
        }
        Update: {
          activity_type?: string
          actor_id?: string
          actor_type?: string
          created_at?: string
          description?: string
          id?: string
          lead_id?: string
          metadata?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "case_activity_log_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "legal_cases"
            referencedColumns: ["id"]
          },
        ]
      }
      case_deadlines: {
        Row: {
          created_at: string
          deadline_date: string
          description: string | null
          id: string
          lawyer_id: string
          lead_id: string
          notification_timing: string
          reminder_sent: boolean | null
          title: string
        }
        Insert: {
          created_at?: string
          deadline_date: string
          description?: string | null
          id?: string
          lawyer_id: string
          lead_id: string
          notification_timing?: string
          reminder_sent?: boolean | null
          title: string
        }
        Update: {
          created_at?: string
          deadline_date?: string
          description?: string | null
          id?: string
          lawyer_id?: string
          lead_id?: string
          notification_timing?: string
          reminder_sent?: boolean | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "case_deadlines_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "legal_cases"
            referencedColumns: ["id"]
          },
        ]
      }
      case_documents: {
        Row: {
          created_at: string
          document_name: string
          document_path: string | null
          id: string
          lead_id: string
          notes: string | null
          requested_by: string
          signature_required: boolean
          status: string
          uploaded_at: string | null
          uploaded_by: string | null
        }
        Insert: {
          created_at?: string
          document_name: string
          document_path?: string | null
          id?: string
          lead_id: string
          notes?: string | null
          requested_by: string
          signature_required?: boolean
          status?: string
          uploaded_at?: string | null
          uploaded_by?: string | null
        }
        Update: {
          created_at?: string
          document_name?: string
          document_path?: string | null
          id?: string
          lead_id?: string
          notes?: string | null
          requested_by?: string
          signature_required?: boolean
          status?: string
          uploaded_at?: string | null
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "case_documents_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "legal_cases"
            referencedColumns: ["id"]
          },
        ]
      }
      case_meetings: {
        Row: {
          created_at: string
          description: string | null
          id: string
          lawyer_id: string
          lead_id: string
          location: string | null
          meeting_date: string
          meeting_type: string | null
          status: string | null
          title: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          lawyer_id: string
          lead_id: string
          location?: string | null
          meeting_date: string
          meeting_type?: string | null
          status?: string | null
          title: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          lawyer_id?: string
          lead_id?: string
          location?: string | null
          meeting_date?: string
          meeting_type?: string | null
          status?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "case_meetings_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "legal_cases"
            referencedColumns: ["id"]
          },
        ]
      }
      case_messages: {
        Row: {
          attachments: Json | null
          created_at: string
          id: string
          lead_id: string
          message_content: string
          read_by_client: boolean | null
          read_by_lawyer: boolean | null
          sender_id: string
          sender_type: string
        }
        Insert: {
          attachments?: Json | null
          created_at?: string
          id?: string
          lead_id: string
          message_content: string
          read_by_client?: boolean | null
          read_by_lawyer?: boolean | null
          sender_id: string
          sender_type: string
        }
        Update: {
          attachments?: Json | null
          created_at?: string
          id?: string
          lead_id?: string
          message_content?: string
          read_by_client?: boolean | null
          read_by_lawyer?: boolean | null
          sender_id?: string
          sender_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "case_messages_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "legal_cases"
            referencedColumns: ["id"]
          },
        ]
      }
      case_notes: {
        Row: {
          category: string
          content: string
          created_at: string
          id: string
          lawyer_id: string
          lead_id: string
          title: string
          updated_at: string
        }
        Insert: {
          category?: string
          content: string
          created_at?: string
          id?: string
          lawyer_id: string
          lead_id: string
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          content?: string
          created_at?: string
          id?: string
          lawyer_id?: string
          lead_id?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "case_notes_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "legal_cases"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_conversations: {
        Row: {
          created_at: string
          id: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          title?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          id: string
          role: string
          user_id: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          role: string
          user_id: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "chat_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      commission_agreements: {
        Row: {
          agreed_at: string
          commission_rate: number
          contract_text: string
          created_at: string
          id: string
          ip_address: string | null
          lawyer_id: string
          signature_data: string
          user_agent: string | null
        }
        Insert: {
          agreed_at?: string
          commission_rate?: number
          contract_text: string
          created_at?: string
          id?: string
          ip_address?: string | null
          lawyer_id: string
          signature_data: string
          user_agent?: string | null
        }
        Update: {
          agreed_at?: string
          commission_rate?: number
          contract_text?: string
          created_at?: string
          id?: string
          ip_address?: string | null
          lawyer_id?: string
          signature_data?: string
          user_agent?: string | null
        }
        Relationships: []
      }
      commission_tracking: {
        Row: {
          case_value: number
          client_id: string
          commission_amount: number
          commission_rate: number
          created_at: string
          id: string
          lawyer_id: string
          lead_id: string
          paid_at: string | null
          payment_status: string
          reported_at: string
          updated_at: string
        }
        Insert: {
          case_value: number
          client_id: string
          commission_amount: number
          commission_rate?: number
          created_at?: string
          id?: string
          lawyer_id: string
          lead_id: string
          paid_at?: string | null
          payment_status?: string
          reported_at?: string
          updated_at?: string
        }
        Update: {
          case_value?: number
          client_id?: string
          commission_amount?: number
          commission_rate?: number
          created_at?: string
          id?: string
          lawyer_id?: string
          lead_id?: string
          paid_at?: string | null
          payment_status?: string
          reported_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "commission_tracking_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "legal_cases"
            referencedColumns: ["id"]
          },
        ]
      }
      document_signatures: {
        Row: {
          created_at: string
          document_id: string
          id: string
          ip_address: string | null
          signature_data: string
          signed_at: string
          signer_id: string
          signer_type: string
          user_agent: string | null
        }
        Insert: {
          created_at?: string
          document_id: string
          id?: string
          ip_address?: string | null
          signature_data: string
          signed_at?: string
          signer_id: string
          signer_type: string
          user_agent?: string | null
        }
        Update: {
          created_at?: string
          document_id?: string
          id?: string
          ip_address?: string | null
          signature_data?: string
          signed_at?: string
          signer_id?: string
          signer_type?: string
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "document_signatures_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "case_documents"
            referencedColumns: ["id"]
          },
        ]
      }
      document_versions: {
        Row: {
          created_at: string
          document_id: string
          file_path: string
          file_size: number
          id: string
          upload_notes: string | null
          uploaded_by: string
          version_number: number
        }
        Insert: {
          created_at?: string
          document_id: string
          file_path: string
          file_size: number
          id?: string
          upload_notes?: string | null
          uploaded_by: string
          version_number: number
        }
        Update: {
          created_at?: string
          document_id?: string
          file_path?: string
          file_size?: number
          id?: string
          upload_notes?: string | null
          uploaded_by?: string
          version_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "document_versions_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "case_documents"
            referencedColumns: ["id"]
          },
        ]
      }
      email_send_log: {
        Row: {
          created_at: string | null
          error_message: string | null
          id: string
          recipient_email: string
          recipient_name: string | null
          sent_at: string | null
          sent_by: string | null
          status: string
          subject: string
        }
        Insert: {
          created_at?: string | null
          error_message?: string | null
          id?: string
          recipient_email: string
          recipient_name?: string | null
          sent_at?: string | null
          sent_by?: string | null
          status?: string
          subject: string
        }
        Update: {
          created_at?: string | null
          error_message?: string | null
          id?: string
          recipient_email?: string
          recipient_name?: string | null
          sent_at?: string | null
          sent_by?: string | null
          status?: string
          subject?: string
        }
        Relationships: []
      }
      email_unsubscribes: {
        Row: {
          created_at: string | null
          email: string
          id: string
          reason: string | null
          unsubscribed_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          reason?: string | null
          unsubscribed_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          reason?: string | null
          unsubscribed_at?: string | null
        }
        Relationships: []
      }
      lawyer_payment_preferences: {
        Row: {
          commission_rate: number
          created_at: string
          id: string
          lawyer_id: string
          lead_credits_remaining: number
          pricing_model: string
          updated_at: string
        }
        Insert: {
          commission_rate?: number
          created_at?: string
          id?: string
          lawyer_id: string
          lead_credits_remaining?: number
          pricing_model?: string
          updated_at?: string
        }
        Update: {
          commission_rate?: number
          created_at?: string
          id?: string
          lawyer_id?: string
          lead_credits_remaining?: number
          pricing_model?: string
          updated_at?: string
        }
        Relationships: []
      }
      lawyer_profiles: {
        Row: {
          average_rating: number | null
          bar_number: string
          bio: string | null
          created_at: string | null
          email: string
          free_lead_used: boolean | null
          full_name: string
          id: string
          journey_story: string | null
          law_school: string | null
          practice_areas: string[]
          pricing_model: string | null
          profile_image_url: string | null
          specializations: string[] | null
          states_licensed: string[]
          total_leads_purchased: number | null
          total_ratings: number | null
          updated_at: string | null
          user_id: string
          verified_status: boolean | null
          years_of_experience: number | null
        }
        Insert: {
          average_rating?: number | null
          bar_number: string
          bio?: string | null
          created_at?: string | null
          email: string
          free_lead_used?: boolean | null
          full_name: string
          id?: string
          journey_story?: string | null
          law_school?: string | null
          practice_areas: string[]
          pricing_model?: string | null
          profile_image_url?: string | null
          specializations?: string[] | null
          states_licensed: string[]
          total_leads_purchased?: number | null
          total_ratings?: number | null
          updated_at?: string | null
          user_id: string
          verified_status?: boolean | null
          years_of_experience?: number | null
        }
        Update: {
          average_rating?: number | null
          bar_number?: string
          bio?: string | null
          created_at?: string | null
          email?: string
          free_lead_used?: boolean | null
          full_name?: string
          id?: string
          journey_story?: string | null
          law_school?: string | null
          practice_areas?: string[]
          pricing_model?: string | null
          profile_image_url?: string | null
          specializations?: string[] | null
          states_licensed?: string[]
          total_leads_purchased?: number | null
          total_ratings?: number | null
          updated_at?: string | null
          user_id?: string
          verified_status?: boolean | null
          years_of_experience?: number | null
        }
        Relationships: []
      }
      lawyer_ratings: {
        Row: {
          client_id: string
          created_at: string
          id: string
          lawyer_id: string
          lead_id: string | null
          rating: number
          review: string | null
          updated_at: string
        }
        Insert: {
          client_id: string
          created_at?: string
          id?: string
          lawyer_id: string
          lead_id?: string | null
          rating: number
          review?: string | null
          updated_at?: string
        }
        Update: {
          client_id?: string
          created_at?: string
          id?: string
          lawyer_id?: string
          lead_id?: string | null
          rating?: number
          review?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "lawyer_ratings_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "legal_cases"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_pricing_tiers: {
        Row: {
          active: boolean
          created_at: string
          id: string
          leads_count: number
          price_per_lead: number
          stripe_price_id: string
          stripe_product_id: string
          tier_name: string
          total_price: number
        }
        Insert: {
          active?: boolean
          created_at?: string
          id?: string
          leads_count: number
          price_per_lead: number
          stripe_price_id: string
          stripe_product_id: string
          tier_name: string
          total_price: number
        }
        Update: {
          active?: boolean
          created_at?: string
          id?: string
          leads_count?: number
          price_per_lead?: number
          stripe_price_id?: string
          stripe_product_id?: string
          tier_name?: string
          total_price?: number
        }
        Relationships: []
      }
      lead_purchases: {
        Row: {
          amount_paid: number
          id: string
          lawyer_id: string
          lead_id: string
          purchased_at: string | null
          status: string | null
        }
        Insert: {
          amount_paid: number
          id?: string
          lawyer_id: string
          lead_id: string
          purchased_at?: string | null
          status?: string | null
        }
        Update: {
          amount_paid?: number
          id?: string
          lawyer_id?: string
          lead_id?: string
          purchased_at?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lead_purchases_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "legal_cases"
            referencedColumns: ["id"]
          },
        ]
      }
      legal_cases: {
        Row: {
          created_at: string | null
          description: string
          id: string
          legal_topic: string
          snapshot_brief: string | null
          state: string
          status: string | null
          updated_at: string | null
          urgency_level: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description: string
          id?: string
          legal_topic: string
          snapshot_brief?: string | null
          state: string
          status?: string | null
          updated_at?: string | null
          urgency_level: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string
          id?: string
          legal_topic?: string
          snapshot_brief?: string | null
          state?: string
          status?: string | null
          updated_at?: string | null
          urgency_level?: string
          user_id?: string
        }
        Relationships: []
      }
      message_notifications: {
        Row: {
          created_at: string | null
          id: string
          lead_id: string
          message: string
          notification_type: string
          read: boolean | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          lead_id: string
          message: string
          notification_type: string
          read?: boolean | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          lead_id?: string
          message?: string
          notification_type?: string
          read?: boolean | null
          user_id?: string
        }
        Relationships: []
      }
      newsletter_signups: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string | null
          source: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name?: string | null
          source: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string | null
          source?: string
        }
        Relationships: []
      }
      notification_preferences: {
        Row: {
          created_at: string
          deadline_reminder_timing: string
          email_notifications: boolean
          id: string
          notify_case_accepted: boolean
          notify_case_updates: boolean
          notify_deadlines: boolean
          notify_new_leads: boolean
          notify_new_messages: boolean
          phone_number: string | null
          sms_notifications: boolean
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          deadline_reminder_timing?: string
          email_notifications?: boolean
          id?: string
          notify_case_accepted?: boolean
          notify_case_updates?: boolean
          notify_deadlines?: boolean
          notify_new_leads?: boolean
          notify_new_messages?: boolean
          phone_number?: string | null
          sms_notifications?: boolean
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          deadline_reminder_timing?: string
          email_notifications?: boolean
          id?: string
          notify_case_accepted?: boolean
          notify_case_updates?: boolean
          notify_deadlines?: boolean
          notify_new_leads?: boolean
          notify_new_messages?: boolean
          phone_number?: string | null
          sms_notifications?: boolean
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      notification_queue: {
        Row: {
          created_at: string
          error_message: string | null
          id: string
          message: string
          metadata: Json | null
          notification_type: string
          sent_at: string | null
          status: string
          subject: string
          user_id: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          id?: string
          message: string
          metadata?: Json | null
          notification_type: string
          sent_at?: string | null
          status?: string
          subject: string
          user_id: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          id?: string
          message?: string
          metadata?: Json | null
          notification_type?: string
          sent_at?: string | null
          status?: string
          subject?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string
          id: string
          user_type: Database["public"]["Enums"]["user_type"] | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id: string
          user_type?: Database["public"]["Enums"]["user_type"] | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          user_type?: Database["public"]["Enums"]["user_type"] | null
        }
        Relationships: []
      }
      question_usage: {
        Row: {
          created_at: string | null
          id: string
          period_end: string | null
          period_start: string | null
          question_count: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          period_end?: string | null
          period_start?: string | null
          question_count?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          period_end?: string | null
          period_start?: string | null
          question_count?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      uploaded_documents: {
        Row: {
          conversation_id: string | null
          created_at: string
          file_name: string
          file_path: string
          file_size: number
          id: string
          mime_type: string
          user_id: string
        }
        Insert: {
          conversation_id?: string | null
          created_at?: string
          file_name: string
          file_path: string
          file_size: number
          id?: string
          mime_type: string
          user_id: string
        }
        Update: {
          conversation_id?: string | null
          created_at?: string
          file_name?: string
          file_path?: string
          file_size?: number
          id?: string
          mime_type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "uploaded_documents_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "chat_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_subscriptions: {
        Row: {
          created_at: string | null
          current_period_end: string | null
          current_period_start: string | null
          id: string
          status: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_unread_message_count: {
        Args: { user_id: string; user_role: string }
        Returns: number
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      mark_messages_as_read: {
        Args: { p_lead_id: string; p_user_id: string; p_user_role: string }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "admin" | "client" | "attorney"
      user_type: "individual" | "lawyer"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "client", "attorney"],
      user_type: ["individual", "lawyer"],
    },
  },
} as const
