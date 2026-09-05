import type { Metadata } from "next";
import { Inter, Playfair_Display, Hind_Siliguri } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

import Providers from "@/store/redux/Providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind",
  subsets: ["latin", "bengali"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hotel Booking | Compare & Book Hotels, Resorts & Homestays",
  description:
    "Search and compare over 1 million hotels, resorts, and homestays worldwide. Get the best price guarantee, free cancellation on select bookings, verified guest reviews, and 24/7 customer support — book your perfect stay in minutes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} ${hindSiliguri.variable} antialiased`}
      >
        <div>
          <Providers>
            {children}
            <Toaster
              position="top-right"
              richColors
              closeButton
              toastOptions={{
                className: "font-sans",
                style: { fontFamily: "var(--font-inter)" },
              }}
            />
          </Providers>
        </div>
      </body>
    </html>
  );
}