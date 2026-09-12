import type { Metadata } from "next";
import BookingConfirmedClient from "./BookingConfirmedClient";

export const metadata: Metadata = {
  title: "Booking confirmed | Hotel NextStay",
};

export default async function BookingConfirmedPage({
  params,
}: {
  params: Promise<{ ref: string }>;
}) {
  const { ref } = await params;
  return <BookingConfirmedClient ref={ref} />;
}