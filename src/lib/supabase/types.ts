// Types representing the database schema for EduMark

export type AdminRole = 'super_admin' | 'admin' | 'editor' | 'counselor' | 'viewer';
export type AdminStatus = 'active' | 'suspended' | 'deleted';
export type ContentStatus = 'draft' | 'review' | 'published' | 'archived';
export type LeadStatus = 'new' | 'contacted' | 'counseling_scheduled' | 'in_progress' | 'converted' | 'lost' | 'spam';
export type BookingStatus = 'requested' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';

export interface Database {
  public: {
    Tables: {
      admin_users: {
        Row: {
          id: string;
          user_id: string | null;
          full_name: string;
          email: string;
          role: AdminRole;
          status: AdminStatus;
          mfa_required: boolean;
          last_seen_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['admin_users']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['admin_users']['Row']>;
      };

      security_events: {
        Row: {
          id: string;
          event_type: string;
          severity: string;
          fingerprint: string | null;
          details: any | null;
          resolved_at: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['security_events']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['security_events']['Row']>;
      };
      media_assets: {
        Row: {
          id: string;
          bucket: string;
          path: string;
          file_name: string;
          mime_type: string;
          size_bytes: number;
          width: number | null;
          height: number | null;
          alt_text: string | null;
          caption: string | null;
          uploaded_by: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['media_assets']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['media_assets']['Row']>;
      };
      site_settings: {
        Row: {
          id: string;
          key: string;
          value: any;
          description: string | null;
          updated_by: string | null;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['site_settings']['Row'], 'id' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['site_settings']['Row']>;
      };
      leads: {
        Row: {
          id: string;
          full_name: string;
          phone: string;
          email: string | null;
          preferred_destination: string | null;
          course_interest: string | null;
          message: string | null;
          source: string;
          status: LeadStatus;
          assigned_to: string | null;
          spam_score: number;
          ip_hash: string | null;
          user_agent_hash: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['leads']['Row'], 'id' | 'spam_score' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['leads']['Row']>;
      };
      lead_notes: {
        Row: {
          id: string;
          lead_id: string;
          author_admin_id: string | null;
          note: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['lead_notes']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['lead_notes']['Row']>;
      };
      consultation_bookings: {
        Row: {
          id: string;
          full_name: string;
          phone: string;
          email: string | null;
          preferred_destination: string | null;
          course_interest: string | null;
          preferred_date: string | null;
          preferred_time: string | null;
          message: string | null;
          status: BookingStatus;
          assigned_to: string | null;
          lead_id: string | null;
          ip_hash: string | null;
          user_agent_hash: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['consultation_bookings']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['consultation_bookings']['Row']>;
      };
      blog_posts: {
        Row: {
          id: string;
          slug: string;
          title: string;
          excerpt: string | null;
          content: any;
          category_id: string | null;
          cover_image_id: string | null;
          author_admin_id: string | null;
          status: ContentStatus;
          featured: boolean;
          published_at: string | null;
          seo_title: string | null;
          seo_description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['blog_posts']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['blog_posts']['Row']>;
      };
      destinations: {
        Row: {
          id: string;
          slug: string;
          name: string;
          country_code: string | null;
          summary: string | null;
          hero_title: string | null;
          hero_body: string | null;
          cost_range: string | null;
          intake_badges: string[] | null;
          featured: boolean;
          status: ContentStatus;
          seo_title: string | null;
          seo_description: string | null;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['destinations']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['destinations']['Row']>;
      };
      // ... Add others as needed
    };
  };
}
