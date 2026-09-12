import {
    Booking,
    ChannelShare,
    ChatMessage,
    ChatThread,
    GuestMessage,
    HotelMockPayload,
    HotelProfile,
    HotelStats,
    KpiItem,
    RecentGuest,
    RevenuePoint,
    RoomAvailabilityItem,
    RoomType,
    ServiceRequest,
    StaffMember,
    StaffTask,
    WebsiteSection,
} from "@/types/types";


export const mockBookings: Booking[] = [
    {
        id: "PB-2291",
        guest: { name: "Farhan Ahmed", email: "farhan.ahmed@email.com", phone: "+880 17•• ••2210" },
        room: { number: "402", type: "Deluxe Twin", floor: "4th floor", rateName: "Twin Beds" },
        checkIn: "2026-09-12",
        checkOut: "2026-09-15",
        status: "confirmed",
        amount: 18600,
        currency: "BDT",
        channel: "ota",
        adults: 2,
        children: 1,
        nights: 3,
        createdAt: "2026-09-10T11:20:00Z",
        source: "booking.com",
    },
    {
        id: "PB-2290",
        guest: { name: "Nusrat Jahan", email: "nusrat.j@email.com", phone: "+880 19•• ••4401" },
        room: { number: "701", type: "Executive Suite", floor: "7th floor", rateName: "King Bed" },
        checkIn: "2026-09-11",
        checkOut: "2026-09-13",
        status: "checked-in",
        amount: 26400,
        currency: "BDT",
        channel: "corporate",
        adults: 2,
        children: 0,
        nights: 2,
        createdAt: "2026-09-05T09:10:00Z",
        source: "corporate direct",
    },
    {
        id: "PB-2289",
        guest: { name: "Rezaul Karim", email: "rezaul.k@email.com", phone: "+880 17•• ••6622" },
        room: { number: "118", type: "Garden View", floor: "1st floor", rateName: "King Bed" },
        checkIn: "2026-09-10",
        checkOut: "2026-09-11",
        status: "checked-out",
        amount: 9200,
        currency: "BDT",
        channel: "direct",
        adults: 1,
        children: 0,
        nights: 1,
        createdAt: "2026-09-08T16:45:00Z",
        source: "nextstay.hotel",
    },
    {
        id: "PB-2288",
        guest: { name: "Ayesha Siddiqua", email: "ayesha.s@email.com", phone: "+880 19•• ••8841" },
        room: { number: "305", type: "Deluxe King", floor: "3rd floor", rateName: "King Bed" },
        checkIn: "2026-09-13",
        checkOut: "2026-09-16",
        status: "pending",
        amount: 21000,
        currency: "BDT",
        channel: "ota",
        adults: 2,
        children: 0,
        nights: 3,
        createdAt: "2026-09-11T12:30:00Z",
        source: "agoda",
    },
    {
        id: "PB-2287",
        guest: { name: "Tanvir Hasan", email: "tanvir.h@email.com", phone: "+880 16•• ••0093" },
        room: { number: "210", type: "Standard", floor: "2nd floor", rateName: "Double Bed" },
        checkIn: "2026-09-09",
        checkOut: "2026-09-10",
        status: "cancelled",
        amount: 6800,
        currency: "BDT",
        channel: "walk-in",
        adults: 1,
        children: 0,
        nights: 1,
        createdAt: "2026-09-08T10:00:00Z",
        source: "front desk",
    },
];

export const mockRooms: RoomType[] = [
    { name: "Standard", total: 24, occupied: 18, price: "৳ 4,500", activeRequests: 1 },
    { name: "Deluxe Twin", total: 16, occupied: 13, price: "৳ 7,200", activeRequests: 3 },
    { name: "Deluxe King", total: 12, occupied: 10, price: "৳ 8,400", activeRequests: 0 },
    { name: "Garden View", total: 10, occupied: 6, price: "৳ 9,600", activeRequests: 2 },
    { name: "Executive Suite", total: 8, occupied: 7, price: "৳ 15,800", activeRequests: 1 },
];

export const mockServiceRequests: ServiceRequest[] = [
    { room: "402", guest: "Farhan Ahmed", request: "Extra towels", time: "10 min ago", urgent: false },
    { room: "701", guest: "Nusrat Jahan", request: "Room service — breakfast at 8am", time: "22 min ago", urgent: false },
    { room: "118", guest: "Rezaul Karim", request: "AC not cooling properly", time: "1 hr ago", urgent: true },
    { room: "305", guest: "Ayesha Siddiqua", request: "Late checkout request", time: "2 hr ago", urgent: false },
];

export const mockKpis: KpiItem[] = [
    { label: "Occupancy today", value: "82%", delta: "4.2%", up: true },
    { label: "Revenue (MTD)", value: "৳ 14.6L", delta: "11%", up: true },
    { label: "Check-ins today", value: "9" },
    { label: "Open service requests", value: "4", delta: "1 urgent", up: false },
];

export const mockRevenue: RevenuePoint[] = [
    { label: "Mon", value: 42 }, { label: "Tue", value: 51 }, { label: "Wed", value: 38 },
    { label: "Thu", value: 61 }, { label: "Fri", value: 74 }, { label: "Sat", value: 88 }, { label: "Sun", value: 69 },
];

export const mockChatThreads: ChatThread[] = [
    { id: 1, name: "Front Desk — Rifat", lastMessage: "Room 305 er key card ready", time: "2m", unread: 2, online: true },
    { id: 2, name: "Housekeeping — Team", lastMessage: "4th floor cleaning done", time: "18m", unread: 0, online: true },
    { id: 3, name: "Maintenance — Jasim", lastMessage: "AC repair er part lagbe 118 e", time: "1h", unread: 1, online: false },
    { id: 4, name: "Manager — Salma", lastMessage: "Weekend occupancy report pathaisi", time: "3h", unread: 0, online: false },
];

export const mockChatMessages: Record<number, ChatMessage[]> = {
    1: [
        { from: "them", text: "Room 305 er key card ready, guest asche 3 tay" },
        { from: "me", text: "Thanks, front desk e রেখে দিয়েছি" },
    ],
    3: [{ from: "them", text: "118 e AC compressor issue, part order dite hobe" }],
};

export const mockGuestMessages: GuestMessage[] = [
    { id: 1, name: "Rezaul Karim", room: "118", phone: "+880 17•• ••2210", message: "AC theke thanda batas ashse na, kew ki ektu dekhbe?", time: "18m ago", replied: false },
    { id: 2, name: "Ayesha Siddiqua", room: "305", phone: "+880 19•• ••8841", message: "Ami ki 2pm porjonto late checkout pete pari?", time: "1h ago", replied: false },
    { id: 3, name: "Tanvir Hasan", room: "—", phone: "+880 16•• ••0093", message: "Booking confirm hoyeche kina confirm korte parben?", time: "3h ago", replied: true, reply: "Ji, apnar booking PB-2287 confirmed. Dhonnobad!" },
];

export const mockWebsiteSections: WebsiteSection[] = [
    { label: "Homepage hero", live: true },
    { label: "Room gallery", live: true },
    { label: "Online booking widget", live: true },
    { label: "Restaurant menu", live: true },
    { label: "Offers & promotions", live: false },
    { label: "Guest reviews", live: true },
];

export const mockRoomAvailability: RoomAvailabilityItem[] = [
    { id: "R-101", number: "101", type: "Standard", floor: "1st floor", baseRate: 4500, capacity: 2, bedConfig: "1 Double Bed", status: "available", amenities: ["Wi-Fi", "TV"] },
    { id: "R-102", number: "102", type: "Standard", floor: "1st floor", baseRate: 4500, capacity: 2, bedConfig: "1 Double Bed", status: "occupied", amenities: ["Wi-Fi", "TV"] },
    { id: "R-103", number: "103", type: "Standard", floor: "1st floor", baseRate: 4500, capacity: 2, bedConfig: "1 Double Bed", status: "available", amenities: ["Wi-Fi", "TV"] },
    { id: "R-118", number: "118", type: "Garden View", floor: "1st floor", baseRate: 9600, capacity: 2, bedConfig: "1 King Bed", status: "maintenance", amenities: ["Wi-Fi", "TV", "Balcony"] },
    { id: "R-210", number: "210", type: "Standard", floor: "2nd floor", baseRate: 4500, capacity: 2, bedConfig: "1 Double Bed", status: "occupied", amenities: ["Wi-Fi", "TV"] },
    { id: "R-211", number: "211", type: "Deluxe Twin", floor: "2nd floor", baseRate: 7200, capacity: 2, bedConfig: "2 Twin Beds", status: "available", amenities: ["Wi-Fi", "TV", "Kettle"] },
    { id: "R-212", number: "212", type: "Deluxe Twin", floor: "2nd floor", baseRate: 7200, capacity: 2, bedConfig: "2 Twin Beds", status: "reserved", amenities: ["Wi-Fi", "TV", "Kettle"] },
    { id: "R-305", number: "305", type: "Deluxe King", floor: "3rd floor", baseRate: 8400, capacity: 2, bedConfig: "1 King Bed", status: "occupied", amenities: ["Wi-Fi", "TV", "Minibar"] },
    { id: "R-306", number: "306", type: "Deluxe King", floor: "3rd floor", baseRate: 8400, capacity: 2, bedConfig: "1 King Bed", status: "available", amenities: ["Wi-Fi", "TV", "Minibar"] },
    { id: "R-402", number: "402", type: "Deluxe Twin", floor: "4th floor", baseRate: 7200, capacity: 2, bedConfig: "2 Twin Beds", status: "occupied", amenities: ["Wi-Fi", "TV", "Kettle"] },
    { id: "R-403", number: "403", type: "Deluxe Twin", floor: "4th floor", baseRate: 7200, capacity: 2, bedConfig: "2 Twin Beds", status: "available", amenities: ["Wi-Fi", "TV", "Kettle"] },
    { id: "R-701", number: "701", type: "Executive Suite", floor: "7th floor", baseRate: 15800, capacity: 3, bedConfig: "1 King Bed + Sofa", status: "occupied", amenities: ["Wi-Fi", "TV", "Minibar", "Living Area"] },
    { id: "R-702", number: "702", type: "Executive Suite", floor: "7th floor", baseRate: 15800, capacity: 3, bedConfig: "1 King Bed + Sofa", status: "available", amenities: ["Wi-Fi", "TV", "Minibar", "Living Area"] },
    { id: "R-703", number: "703", type: "Executive Suite", floor: "7th floor", baseRate: 15800, capacity: 3, bedConfig: "1 King Bed + Sofa", status: "reserved", amenities: ["Wi-Fi", "TV", "Minibar", "Living Area"] },
];

export const mockHotelProfile: HotelProfile = {
    name: "NextStay Hotel",
    brand: "Provah Grand",
    manager: "Salma Akter",
    role: "General Manager",
    dateLabel: "Wednesday, 11 September",
    greetingName: "Salma",
    address: "Gulshan 2, Dhaka 1212",
    phone: "+880 2-9881100",
    email: "gm@nextstay.hotel",
    timezone: "Asia/Dhaka",
    currency: "BDT",
    taxRate: "15%",
    checkInTime: "14:00",
    checkOutTime: "12:00",
};

export const mockHotelStats: HotelStats = {
    occupancyRate: "82%",
    totalRevenue: "৳ 14.6L",
    activeBookings: 42,
    availableRooms: 18,
    totalRooms: 70,
    checkInsToday: 9,
    checkOutsToday: 6,
};

export const mockRecentGuests: RecentGuest[] = [
    { id: "G-1042", name: "Farhan Ahmed", room: "402", nights: 3, status: "confirmed", email: "farhan.ahmed@email.com", arrived: "12 Sep" },
    { id: "G-1041", name: "Nusrat Jahan", room: "701", nights: 2, status: "checked-in", email: "nusrat.j@email.com", arrived: "11 Sep" },
    { id: "G-1040", name: "Rezaul Karim", room: "118", nights: 1, status: "checked-out", email: "rezaul.k@email.com", arrived: "10 Sep" },
    { id: "G-1039", name: "Ayesha Siddiqua", room: "305", nights: 3, status: "pending", email: "ayesha.s@email.com", arrived: "13 Sep" },
    { id: "G-1038", name: "Tanvir Hasan", room: "210", nights: 1, status: "cancelled", email: "tanvir.h@email.com", arrived: "9 Sep" },
];

export const mockChannelBreakdown: ChannelShare[] = [
    { label: "Direct", value: 38 },
    { label: "OTA", value: 31 },
    { label: "Corporate", value: 18 },
    { label: "Walk-in", value: 13 },
];

export const mockStaff: StaffMember[] = [
    { id: "S-01", name: "Salma Akter", role: "General Manager", shift: "Day", status: "on-duty", department: "Management" },
    { id: "S-02", name: "Rifat Hasan", role: "Front Desk Lead", shift: "Day", status: "on-duty", department: "Front Office" },
    { id: "S-03", name: "Jasim Uddin", role: "Maintenance", shift: "Day", status: "on-duty", department: "Engineering" },
    { id: "S-04", name: "Nabila Rahman", role: "Housekeeping Supervisor", shift: "Morning", status: "on-duty", department: "Housekeeping" },
    { id: "S-05", name: "Karim Mia", role: "Night Auditor", shift: "Night", status: "off-duty", department: "Front Office" },
    { id: "S-06", name: "Lamia Noor", role: "Guest Relations", shift: "Evening", status: "on-break", department: "Front Office" },
];

export const mockStaffTasks: StaffTask[] = [
    { id: "T-11", title: "Replace AC compressor part — Room 118", assignee: "Jasim Uddin", priority: "high", due: "Today 4:00 PM", done: false },
    { id: "T-12", title: "Turn-down service — 7th floor suites", assignee: "Nabila Rahman", priority: "medium", due: "Today 6:30 PM", done: false },
    { id: "T-13", title: "Prepare welcome amenity for PB-2285", assignee: "Lamia Noor", priority: "medium", due: "14 Sep 12:00", done: false },
    { id: "T-14", title: "Night audit report", assignee: "Karim Mia", priority: "low", due: "Tonight 11:00 PM", done: true },
];

/** Local fallback if `/data/hotel-mock-data.json` cannot be fetched. */
export const fallbackHotelMockPayload: HotelMockPayload = {
    hotel: mockHotelProfile,
    stats: mockHotelStats,
    kpis: mockKpis,
    revenue: mockRevenue,
    channelBreakdown: mockChannelBreakdown,
    recentGuests: mockRecentGuests,
    bookings: mockBookings,
    rooms: mockRooms,
    serviceRequests: mockServiceRequests,
    roomAvailability: mockRoomAvailability,
    staff: mockStaff,
    staffTasks: mockStaffTasks,
    chatThreads: mockChatThreads,
    chatMessages: Object.fromEntries(
        Object.entries(mockChatMessages).map(([k, v]) => [k, v]),
    ),
    guestMessages: mockGuestMessages,
    websiteSections: mockWebsiteSections,
};