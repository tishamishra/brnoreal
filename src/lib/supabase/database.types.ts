export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      listings: {
        Row: {
          id: string;
          title: string;
          slug: string;
          location: string;
          location_value: string;
          category: string;
          property_type: string;
          price_czk: number;
          beds: number | null;
          baths: number | null;
          area_sqm: number;
          description: string;
          highlights: string[];
          status: 'featured' | 'new' | 'sold' | null;
          image: string;
          coordinates: [number, number];
          postal_code: string | null;
          street_address: string | null;
          features: string[] | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          location: string;
          location_value: string;
          category: string;
          property_type: string;
          price_czk: number;
          beds?: number | null;
          baths?: number | null;
          area_sqm: number;
          description: string;
          highlights: string[];
          status?: 'featured' | 'new' | 'sold' | null;
          image: string;
          coordinates: [number, number];
          postal_code?: string | null;
          street_address?: string | null;
          features?: string[] | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          location?: string;
          location_value?: string;
          category?: string;
          property_type?: string;
          price_czk?: number;
          beds?: number | null;
          baths?: number | null;
          area_sqm?: number;
          description?: string;
          highlights?: string[];
          status?: 'featured' | 'new' | 'sold' | null;
          image?: string;
          coordinates?: [number, number];
          postal_code?: string | null;
          street_address?: string | null;
          features?: string[] | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      destinations: {
        Row: {
          id: string;
          slug: string;
          name: string;
          name_cs: string;
          image: string;
          description: string;
          description_cs: string;
          location_value: string;
          why_invest: string[];
          why_invest_cs: string[];
          features: string[];
          features_cs: string[];
          highlights: string[];
          highlights_cs: string[];
          coordinates: [number, number];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          name_cs: string;
          image: string;
          description: string;
          description_cs: string;
          location_value: string;
          why_invest: string[];
          why_invest_cs: string[];
          features: string[];
          features_cs: string[];
          highlights: string[];
          highlights_cs: string[];
          coordinates: [number, number];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          name?: string;
          name_cs?: string;
          image?: string;
          description?: string;
          description_cs?: string;
          location_value?: string;
          why_invest?: string[];
          why_invest_cs?: string[];
          features?: string[];
          features_cs?: string[];
          highlights?: string[];
          highlights_cs?: string[];
          coordinates?: [number, number];
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      listing_status: 'featured' | 'new' | 'sold';
    };
  };
}


