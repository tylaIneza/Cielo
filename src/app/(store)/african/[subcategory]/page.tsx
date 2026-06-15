import { redirect } from "next/navigation";

export default function AfricanSubcategoryPage({
  params,
}: {
  params: { subcategory: string };
}) {
  redirect(`/shop?collection=AFRICAN&category=${params.subcategory}`);
}
