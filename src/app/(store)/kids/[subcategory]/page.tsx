import { redirect } from "next/navigation";

export default function KidsSubcategoryPage({
  params,
}: {
  params: { subcategory: string };
}) {
  redirect(`/shop?collection=KIDS&category=${params.subcategory}`);
}
