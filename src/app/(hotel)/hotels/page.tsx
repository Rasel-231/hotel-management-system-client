import type { Metadata } from "next";
import HotelListing from "../../feature/components/hotels/listing/HotelListing";

export const metadata: Metadata = {
  title: "Search Hotels & Resorts | Hotel NextStay",
  description:
    "Search and compare curated hotels, resorts, villas and lodges. Filter by price, rating, amenities and property type — book your perfect stay.",
};

export default function HotelsPage() {
  return <HotelListing />;
}
