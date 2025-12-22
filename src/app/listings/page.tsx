import { redirect } from "next/navigation";

// This page will be handled by middleware which redirects to /[locale]/listings
// This is a fallback in case middleware doesn't catch it
export default function ListingsIndexPage() {
  redirect("/en/listings/category/homes-sale");
}

