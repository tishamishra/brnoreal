import { redirect } from "next/navigation";

type ListingsIndexPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ListingsIndexPage({ params }: ListingsIndexPageProps) {
  const { locale } = await params;
  redirect(`/${locale}/listings/category/homes-sale`);
}
