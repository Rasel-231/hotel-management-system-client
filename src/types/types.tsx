import { LucideIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

export interface GalleryProps {
  property: Property;
}

export interface RoomVariant {
  id: string;
  name: string;
  guests: number;
  bed: string;
  size: number;
  price: number;
  perks: string[];
  image: string;
}

export type Retreat = {
  id: string;
  image: string;
  title: string;
  location: string;
  description: string;
};

export type DiscoverVideoBannerProps = {
  videoUrl?: string;
  youtubeId?: string;
  thumbnail?: string;
  duration?: string;
};

export interface CategoryDto {
  label: string;
  icon: string;
}

export interface Destination {
  name: string;
  tag: string;
  src: string;
  mobileClassName: string;
  desktopClassName: string;
}

export interface Category {
  label: string;
  icon: LucideIcon;
}

export interface CategoryPillProps {
  icon: LucideIcon;
  label: string;
  active: boolean;
  onClick: () => void;
}

export type Offer = {
  id: string;
  title: string;
  description: string;
  bg: string;
  textColor: string;
  subColor: string;
  icon?: React.ElementType;
  image?: string;
};

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  location: string;
  avatar: string;
};

export type Feature = {
  icon: React.ElementType;
  title: string;
  subtitle: string;
};

export interface DateRangePickerProps {
  value: DateRange | undefined;
  onChange: (range: DateRange | undefined) => void;
  className?: string;
  placeholder?: string;
  align?: "start" | "center" | "end";
}

export interface GuestsState {
  adults: number;
  children: number;
  rooms: number;
}

export interface GuestsSelectorProps {
  value: GuestsState;
  onChange: (value: GuestsState) => void;
  className?: string;
  align?: "start" | "center" | "end";
}

export interface PropertyCardProps {
  property: Property;
  index?: number;
  className?: string;
}

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export interface Property {
  id: string;
  name: string;
  location: string;
  country: string;
  badge?: string;
  rating: number;
  reviewCount: number;
  price: number;
  currency: string;
  images: string[];
  description: string;
  highlights: string[];
  amenities: string[];
  type: "resort" | "villa" | "boutique" | "hotel" | "lodge";
  stars: number;
}

export interface BookingState {
  propertyId: string | null;
  checkIn: Date | null;
  checkOut: Date | null;
  adults: number;
  children: number;
  rooms: number;
  promoCode: string;
  selectProperty: (propertyId: string) => void;
  setDates: (checkIn: Date | null, checkOut: Date | null) => void;
  setGuests: (adults: number, children: number, rooms: number) => void;
  setPromoCode: (code: string) => void;
  clear: () => void;
}

export interface SearchQuery {
  destination: string;
  checkIn: Date | null;
  checkOut: Date | null;
  adults: number;
  children: number;
  rooms: number;
}

export type SortOption =
  | "recommended"
  | "price-asc"
  | "price-desc"
  | "rating"
  | "popular";

export interface SearchFilters {
  priceRange: [number, number];
  stars: number[];
  propertyTypes: string[];
  amenities: string[];
  sort: SortOption;
}

export interface WishlistState {
  ids: string[];
  toggle: (id: string) => boolean;
  has: (id: string) => boolean;
  remove: (id: string) => void;
}

export interface Props {
  params: Promise<{ id: string }>;
}

export interface DestinationCardProps extends Destination {
  index: number;
}

export type Commitment = {
  icon: LucideIcon;
  title: string;
  subtitle: string;
};
