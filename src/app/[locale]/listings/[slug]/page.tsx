import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { Listing } from "@/data/sample-data";
import { ListingDetailContent } from "@/components/listings/listing-detail-content";
import { getListingBySlug, getAllListings } from "@/lib/data/listings";
import { getListingMetadata } from "@/lib/seo/metadata";

type ListingDetailPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: ListingDetailPageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const listing = await getListingBySlug(slug);
  
  if (!listing) {
    return {
      title: "Property Not Found",
      description: "The requested property could not be found.",
    };
  }

  return getListingMetadata(listing, locale);
}

export default async function ListingDetailPage({ params }: ListingDetailPageProps) {
  const { slug } = await params;
  
  if (!slug) {
    notFound();
  }

  const listing = await getListingBySlug(slug);

  if (!listing) {
    notFound();
  }

  const similarListings: Listing[] = (await getAllListings({
    category: listing.category,
  }))
    .filter((item) => item.slug !== listing.slug)
    .slice(0, 3);

  return <ListingDetailContent listing={listing} similarListings={similarListings} />;
}

