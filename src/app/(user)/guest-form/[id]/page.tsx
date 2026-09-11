import ReservationFormClient from "./ReservationFormClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guest Reservation | Hotel NextStay",
};

export default async function GuestFormPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: hotelId } = await params;

  return <ReservationFormClient hotelId={hotelId} />;
}
