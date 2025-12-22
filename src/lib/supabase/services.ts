import { getSupabaseClient } from './client';
import type { Database } from './database.types';
import type { Listing } from '@/data/sample-data';

type ListingRow = Database['public']['Tables']['listings']['Row'];
type DestinationRow = Database['public']['Tables']['destinations']['Row'];

// Convert database row to Listing type
function mapListingRow(row: ListingRow): Listing {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    location: row.location,
    locationValue: row.location_value,
    category: row.category,
    propertyType: row.property_type,
    priceCZK: row.price_czk,
    beds: row.beds ?? 0,
    baths: row.baths ?? 0,
    areaSqm: row.area_sqm,
    description: row.description,
    highlights: row.highlights,
    status: row.status ?? undefined,
    image: row.image,
    coordinates: row.coordinates,
    postalCode: row.postal_code ?? undefined,
    streetAddress: row.street_address ?? undefined,
    features: row.features ?? undefined,
  };
}

// Listings service
export const listingsService = {
  // Get all listings with optional filters
  async getAll(filters?: {
    category?: string;
    location?: string;
    minPrice?: number;
    maxPrice?: number;
    beds?: number;
    baths?: number;
    features?: string[];
    postalCode?: string;
    featured?: boolean;
  }) {
    const supabase = getSupabaseClient();
    if (!supabase) {
      throw new Error('Supabase is not configured');
    }

    let query = supabase.from('listings').select('*');

    if (filters?.category) {
      query = query.eq('category', filters.category);
    }

    if (filters?.location) {
      query = query.eq('location_value', filters.location);
    }

    if (filters?.minPrice !== undefined) {
      query = query.gte('price_czk', filters.minPrice);
    }

    if (filters?.maxPrice !== undefined) {
      query = query.lte('price_czk', filters.maxPrice);
    }

    if (filters?.beds !== undefined) {
      query = query.gte('beds', filters.beds);
    }

    if (filters?.baths !== undefined) {
      query = query.gte('baths', filters.baths);
    }

    if (filters?.postalCode) {
      query = query.eq('postal_code', filters.postalCode);
    }

    if (filters?.featured) {
      query = query.eq('status', 'featured');
    }

    if (filters?.features && filters.features.length > 0) {
      // Filter by features array overlap
      query = query.contains('features', filters.features);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching listings:', error);
      return [];
    }

    return data.map(mapListingRow);
  },

  // Get a single listing by slug
  async getBySlug(slug: string): Promise<Listing | null> {
    const supabase = getSupabaseClient();
    if (!supabase) {
      throw new Error('Supabase is not configured');
    }

    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      console.error('Error fetching listing:', error);
      return null;
    }

    return data ? mapListingRow(data) : null;
  },

  // Get featured listings
  async getFeatured(limit?: number) {
    const supabase = getSupabaseClient();
    if (!supabase) {
      throw new Error('Supabase is not configured');
    }

    let query = supabase
      .from('listings')
      .select('*')
      .eq('status', 'featured')
      .order('created_at', { ascending: false });

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching featured listings:', error);
      return [];
    }

    return data.map(mapListingRow);
  },

  // Create a new listing
  async create(listing: Omit<Listing, 'id'>) {
    const supabase = getSupabaseClient();
    if (!supabase) {
      throw new Error('Supabase is not configured');
    }

    const insertData: any = {
      title: listing.title,
      slug: listing.slug,
      location: listing.location,
      location_value: listing.locationValue,
      category: listing.category,
      property_type: listing.propertyType,
      price_czk: listing.priceCZK,
      beds: listing.beds || null,
      baths: listing.baths || null,
      area_sqm: listing.areaSqm,
      description: listing.description,
      highlights: listing.highlights,
      status: listing.status || null,
      image: listing.image,
      coordinates: listing.coordinates,
      postal_code: listing.postalCode || null,
      street_address: listing.streetAddress || null,
      features: listing.features || null,
    };

    // Add agent_id if provided (using type assertion for dynamic property)
    if ('agentId' in listing && listing.agentId !== undefined) {
      insertData.agent_id = listing.agentId === "" ? null : (listing.agentId || null);
    }

    const { data, error } = await supabase
      .from('listings')
      .insert(insertData)
      .select()
      .single();

    if (error) {
      console.error('Error creating listing:', error);
      const errorMessage = error.message || JSON.stringify(error) || 'Failed to create listing';
      throw new Error(errorMessage);
    }

    return data ? mapListingRow(data) : null;
  },

  // Update an existing listing
  async update(slug: string, updates: Partial<Omit<Listing, 'id' | 'slug'>>) {
    const supabase = getSupabaseClient();
    if (!supabase) {
      throw new Error('Supabase is not configured');
    }

    const updateData: any = {};
    if (updates.title !== undefined) updateData.title = updates.title;
    if (updates.location !== undefined) updateData.location = updates.location;
    if (updates.locationValue !== undefined) updateData.location_value = updates.locationValue;
    if (updates.category !== undefined) updateData.category = updates.category;
    if (updates.propertyType !== undefined) updateData.property_type = updates.propertyType;
    if (updates.priceCZK !== undefined) updateData.price_czk = updates.priceCZK;
    if (updates.beds !== undefined) updateData.beds = updates.beds;
    if (updates.baths !== undefined) updateData.baths = updates.baths;
    if (updates.areaSqm !== undefined) updateData.area_sqm = updates.areaSqm;
    if (updates.description !== undefined) updateData.description = updates.description;
    if (updates.highlights !== undefined) updateData.highlights = updates.highlights;
    if (updates.status !== undefined) updateData.status = updates.status;
    if (updates.image !== undefined) updateData.image = updates.image;
    if (updates.coordinates !== undefined) updateData.coordinates = updates.coordinates;
    if (updates.postalCode !== undefined) updateData.postal_code = updates.postalCode;
    if (updates.streetAddress !== undefined) updateData.street_address = updates.streetAddress;
    if (updates.features !== undefined) updateData.features = updates.features;
    if ('agentId' in updates) {
      // Handle agent_id: convert empty string to null, undefined means don't update
      if (updates.agentId !== undefined) {
        updateData.agent_id = updates.agentId === "" ? null : (updates.agentId || null);
      }
    }

    const { data, error } = await supabase
      .from('listings')
      .update(updateData)
      .eq('slug', slug)
      .select()
      .single();

    if (error) {
      console.error('Error updating listing:', error);
      // More detailed error logging
      const errorDetails = {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      };
      console.error('Error details:', errorDetails);
      const errorMessage = error.message || error.details || error.hint || JSON.stringify(errorDetails) || 'Failed to update listing';
      throw new Error(errorMessage);
    }

    return data ? mapListingRow(data) : null;
  },

  // Delete a listing
  async delete(slug: string) {
    const supabase = getSupabaseClient();
    if (!supabase) {
      throw new Error('Supabase is not configured');
    }

    const { error } = await supabase
      .from('listings')
      .delete()
      .eq('slug', slug);

    if (error) {
      console.error('Error deleting listing:', error);
      const errorMessage = error.message || JSON.stringify(error) || 'Failed to delete listing';
      throw new Error(errorMessage);
    }

    return true;
  },
};

// Destinations service
export const destinationsService = {
  // Get all destinations
  async getAll() {
    const supabase = getSupabaseClient();
    if (!supabase) {
      throw new Error('Supabase is not configured');
    }

    const { data, error } = await supabase
      .from('destinations')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching destinations:', error);
      return [];
    }

    return data;
  },

  // Get destination by slug
  async getBySlug(slug: string) {
    const supabase = getSupabaseClient();
    if (!supabase) {
      throw new Error('Supabase is not configured');
    }

    const { data, error } = await supabase
      .from('destinations')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      console.error('Error fetching destination:', error);
      return null;
    }

    return data;
  },
};

