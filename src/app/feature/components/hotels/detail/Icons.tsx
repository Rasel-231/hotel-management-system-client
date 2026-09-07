import React from "react";

const baseProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const HotelLogo = () => (
  <svg {...baseProps} className="w-10 h-10 text-blue-500 dark:text-blue-400">
    <path d="M3 21h18" />
    <path d="M5 21V9l7-5 7 5v12" />
    <path d="M9 21v-6h6v6" />
    <path d="M9 12h.01M15 12h.01M9 9h.01M15 9h.01" />
  </svg>
);

export const FlightLogo = () => (
  <svg {...baseProps} className="w-7 h-7 text-cyan-500 dark:text-cyan-400">
    <path d="M10.5 21 12 17l1.5 4" />
    <path d="M2 12l20-7-7 20-3-8-8-3z" transform="translate(0,0)" />
    <path d="M2.5 12.5 21 5 14.3 21.5l-3-8-8.8-1z" />
  </svg>
);

export const TrainLogo = () => (
  <svg {...baseProps} className="w-7 h-7 text-amber-500 dark:text-amber-400">
    <rect x="5" y="3" width="14" height="13" rx="3" />
    <path d="M5 11h14" />
    <path d="M9 21l-2-3M15 21l2-3" />
    <circle cx="8.5" cy="14" r="0.6" fill="currentColor" />
    <circle cx="15.5" cy="14" r="0.6" fill="currentColor" />
  </svg>
);

export const ShipLogo = () => (
  <svg {...baseProps} className="w-7 h-7 text-teal-500 dark:text-teal-400">
    <path d="M4 15h16l-2 5H6l-2-5z" />
    <path d="M6 15V6h8l3 9" />
    <path d="M9 6V3h3v3" />
  </svg>
);

export const CarLogo = () => (
  <svg {...baseProps} className="w-7 h-7 text-rose-500 dark:text-rose-400">
    <path d="M4 16V11l2.5-5h11L20 11v5" />
    <path d="M4 16h16" />
    <circle cx="7.5" cy="17" r="1.5" />
    <circle cx="16.5" cy="17" r="1.5" />
  </svg>
);

export const RestaurantLogo = () => (
  <svg {...baseProps} className="w-7 h-7 text-orange-500 dark:text-orange-400">
    <path d="M7 2v8a2 2 0 0 0 2 2v10" />
    <path d="M7 2v6M9 2v6M11 2v6" />
    <path d="M17 2c-1.7 0-3 1.8-3 4s1.3 4 3 4v12" />
  </svg>
);

export const SpaLogo = () => (
  <svg {...baseProps} className="w-7 h-7 text-violet-500 dark:text-violet-400">
    <path d="M12 21c-4-2-6-5-6-9 3 0 5 1.5 6 4 1-2.5 3-4 6-4 0 4-2 7-6 9z" />
    <path d="M12 12c0-4 2-6 2-9-3 0-4 3-4 5" />
  </svg>
);

export const RoomServiceLogo = () => (
  <svg {...baseProps} className="w-7 h-7 text-emerald-500 dark:text-emerald-400">
    <path d="M3 17h18" />
    <path d="M5 17a7 7 0 0 1 14 0" />
    <path d="M12 10V6" />
    <circle cx="12" cy="4.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);
