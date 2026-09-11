"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useGetUsersQuery } from "@/store/api/userApi/userApi";
import { useGetRoomsByHotelIdQuery } from "@/store/api/roomApi/roomApi";
import { useBookingStore } from "@/store/bookingStore";
import ReservationForm, {
  ReservationPayload,
} from "@/app/feature/components/hotels/detail/ReservationForm";

export default function ReservationFormClient({
  hotelId,
}: {
  hotelId: string;
}) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: userResponse, isLoading: userLoading } = useGetUsersQuery();
  const { data: rooms, isLoading: roomsLoading } =
    useGetRoomsByHotelIdQuery(hotelId);

  const {
    checkIn,
    checkOut,
    rooms: storeRoomsCount,
    adults,
    children,
  } = useBookingStore();

  if (userLoading || roomsLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  const actor: {
    id: string;
    name: string;
    email: string;
    role: "USER" | "SUPER_ADMIN" | "ADMIN" | "OWNER" | "GUEST";
    subRole: typeof userResponse extends { subRole?: infer T } ? T : null;
  } = userResponse
    ? {
        id: userResponse.id,
        name: userResponse.name,
        email: userResponse.email,
        role: userResponse.role as
          | "USER"
          | "SUPER_ADMIN"
          | "ADMIN"
          | "OWNER"
          | "GUEST",
        subRole: null,
      }
    : { id: "", name: "", email: "", role: "USER", subRole: null };

  const handleSubmit = async (payload: ReservationPayload) => {
    setIsSubmitting(true);
    try {
      toast.success("রিজার্ভেশন সফলভাবে সম্পন্ন হয়েছে!", {
        description: `${payload.roomsCount} রুম`,
      });
      // router.push(`/dashboard/bookings`);
      router.push("/");
    } catch {
      toast.error("বুকিং তৈরি করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDateString = (date: Date | null) => {
    if (!date) return "";
    const d = new Date(date);
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [year, month, day].join("-");
  };

  return (
    <div className="py-10">
      <ReservationForm
        hotelId={hotelId}
        hotelName="Hotel NextStay"
        rooms={rooms?.data ?? []}
        actor={actor}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
        initialValues={{
          checkIn: formatDateString(checkIn),
          checkOut: formatDateString(checkOut),
          adults: adults || 1,
          children: children || 0,
          roomsCount: storeRoomsCount || 1,
        }}
      />
    </div>
  );
}
