import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PropertyDetail from "../../../feature/components/hotels/detail/PropertyDetail";
import { getPropertyById } from "@/lib/data/properties";
import { Props } from "@/types/types";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const property = getPropertyById(id);
  if (!property) return { title: "Property not found | Hotel NextStay" };
  return {
    title: `${property.name} — Book from $${property.price}/night`,
    description: property.description,
  };
}

export default async function PropertyPage({ params }: Props) {
  const { id } = await params;
  const property = getPropertyById(id);
  if (!property) notFound();

  return <PropertyDetail property={property} />;
}
