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

// ---------------------------------------------------------------------------
// Admin dashboard types.
// Replace the mock data in mock-data.ts with data from your RTK Query hooks —
// every section component takes typed props, so wiring is a drop-in swap.
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Booking domain types (used by the admin dashboard + booking flow).
// NOTE: these mirror the server's Prisma Booking/Room/Hotel models closely so
// the mock JSON in /public/mock can be swapped for real API responses without
// reshaping the component tree. Field names/types should be kept in lockstep
// with the Prisma schema on migration.
// ---------------------------------------------------------------------------

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "checked-in"
  | "checked-out"
  | "cancelled"
  | "no-show"
  | "completed";

export type BookingChannel =
  | "direct"
  | "ota"
  | "corporate"
  | "walk-in";

export interface BookingGuest {
  name: string;
  email: string;
  phone?: string;
  nationality?: string;
}

export interface BookingRoomRef {
  number: string;
  type: string;
  floor?: string;
  rateName: string;
}

export interface Booking {
  id: string;
  guest: BookingGuest;
  room: BookingRoomRef;
  checkIn: string; // ISO date yyyy-mm-dd
  checkOut: string; // ISO date yyyy-mm-dd (exclusive)
  status: BookingStatus;
  amount: number; // numeric, minor-currency-agnostic (BDT taka)
  currency: string;
  channel: BookingChannel;
  adults: number;
  children: number;
  nights: number;
  createdAt: string; // ISO datetime
  source?: string; // e.g. "booking.com", "hotel website"
  note?: string;
  hotelId?: string;
  /** Government ID + purpose captured at reservation time (Bangladesh hotels). */
  registration?: {
    idType: string;
    idNumber: string;
    address: string;
    purposeOfVisit: string;
  };
}

// Hotel staff / platform roles. SUPER_ADMIN and ADMIN/OWNER operate at
// platform / hotel level, MANAGER / FRONT_DESK / HOUSEKEEPING are in-hotel
// sub-roles. Keep in sync with the server's role enum once real auth lands.
export type HotelRole =
  | "SUPER_ADMIN"
  | "ADMIN"
  | "OWNER"
  | "MANAGER"
  | "FRONT_DESK"
  | "HOUSEKEEPING";

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: HotelRole;
  hotelId?: string;
  hotelName?: string;
  avatarUrl?: string | null;
}

export type RoomStatus =
  | "available"
  | "occupied"
  | "reserved"
  | "maintenance";

export interface Room {
  id: string;
  number: string;
  type: string;
  floor: string;
  baseRate: number; // BDT per night
  capacity: number;
  bedConfig: string;
  status: RoomStatus;
  amenities: string[];
}

// Backward-compatible aliases: the availability grid now operates directly on
// the shared `Room` model.
export type RoomAvailabilityStatus = RoomStatus;
export type RoomAvailabilityItem = Room;

export interface DashboardStats {
  occupancyPct: number;
  totalRevenue: number; // MTD
  activeBookings: number;
  availableRooms: number;
  totalRooms: number;
  arrivalsToday: number;
  departuresToday: number;
  pendingCheckIns: number;
  hotelsPendingApproval: number; // SUPER_ADMIN only
}

export interface HotelApproval {
  id: string;
  name: string;
  location: string;
  submittedAt: string;
  rooms: number;
}

export interface HotelMockPayload {
  hotel: HotelProfile;
  stats: HotelStats;
  kpis: KpiItem[];
  revenue: RevenuePoint[];
  channelBreakdown: ChannelShare[];
  recentGuests: RecentGuest[];
  bookings: Booking[];
  rooms: RoomType[];
  serviceRequests: ServiceRequest[];
  roomAvailability: RoomAvailabilityItem[];
  staff: StaffMember[];
  staffTasks: StaffTask[];
  chatThreads: ChatThread[];
  chatMessages: Record<string, ChatMessage[]>;
  guestMessages: GuestMessage[];
  websiteSections: WebsiteSection[];
}

export interface RoomType {
  name: string;
  total: number;
  occupied: number;
  price: string;
  activeRequests: number;
}

export interface ServiceRequest {
  room: string;
  guest: string;
  request: string;
  time: string;
  urgent: boolean;
}

export interface KpiItem {
  label: string;
  value: string;
  delta?: string;
  up?: boolean;
}

export interface RevenuePoint {
  label: string;
  value: number;
}

export interface ChatThread {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
}

export interface ChatMessage {
  from: "me" | "them";
  text: string;
}

export interface GuestMessage {
  id: number;
  name: string;
  room: string;
  phone: string;
  message: string;
  time: string;
  replied: boolean;
  reply?: string;
}

export interface WebsiteSection {
  label: string;
  live: boolean;
}

export interface HotelProfile {
  name: string;
  brand: string;
  manager: string;
  role: string;
  dateLabel: string;
  greetingName: string;
  address: string;
  phone: string;
  email: string;
  timezone: string;
  currency: string;
  taxRate: string;
  checkInTime: string;
  checkOutTime: string;
}

export interface HotelStats {
  occupancyRate: string;
  totalRevenue: string;
  activeBookings: number;
  availableRooms: number;
  totalRooms: number;
  checkInsToday: number;
  checkOutsToday: number;
}

export interface RecentGuest {
  id: string;
  name: string;
  room: string;
  nights: number;
  status: BookingStatus;
  email: string;
  arrived: string;
}

export type StaffDutyStatus = "on-duty" | "off-duty" | "on-break";

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  shift: string;
  status: StaffDutyStatus;
  department: string;
}

export type TaskPriority = "high" | "medium" | "low";

export interface StaffTask {
  id: string;
  title: string;
  assignee: string;
  priority: TaskPriority;
  due: string;
  done: boolean;
}

export interface ChannelShare {
  label: string;
  value: number;
}
