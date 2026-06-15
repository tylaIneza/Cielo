import { redirect } from "next/navigation";

export default function MenSubcategoryPage({
  params,
}: {
  params: { subcategory: string };
}) {
  redirect(`/shop?collection=MEN&category=${params.subcategory}`);
}
