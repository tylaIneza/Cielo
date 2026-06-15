import { redirect } from "next/navigation";

export default function WomenSubcategoryPage({
  params,
}: {
  params: { subcategory: string };
}) {
  redirect(`/shop?collection=WOMEN&category=${params.subcategory}`);
}
