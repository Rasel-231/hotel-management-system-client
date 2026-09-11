"use client";
import React, { useState } from "react";
import {
  CarLogo,
  FlightLogo,
  HotelLogo,
  RestaurantLogo,
  RoomServiceLogo,
  ShipLogo,
  SpaLogo,
  TrainLogo,
} from "../detail/Icons";

const iconColors = {
  1: {
    light: "bg-forest-100",
    dark: "bg-forest/30",
    border: "border-forest/40",
    shadow: "shadow-forest/20",
    spotlight: "bg-forest/15 dark:bg-forest/30",
    line: "#1f4d4d",
    tooltipBg: "bg-forest",
    glow: [31, 77, 77],
  },
  2: {
    light: "bg-gold-100",
    dark: "bg-gold/30",
    border: "border-gold/50",
    shadow: "shadow-gold/30",
    spotlight: "bg-gold/20 dark:bg-gold/30",
    line: "#c9a227",
    tooltipBg: "bg-forest-deep",
    glow: [201, 162, 39],
  },
  3: {
    light: "bg-olive/10",
    dark: "bg-olive/40",
    border: "border-olive/40",
    shadow: "shadow-olive/20",
    spotlight: "bg-olive/15 dark:bg-olive/30",
    line: "#4a6b3f",
    tooltipBg: "bg-olive",
    glow: [74, 107, 63],
  },
  4: {
    light: "bg-forest-100",
    dark: "bg-forest-300/30",
    border: "border-forest-300/50",
    shadow: "shadow-forest/20",
    spotlight: "bg-forest-300/20 dark:bg-forest-300/40",
    line: "#5c8577",
    tooltipBg: "bg-forest",
    glow: [92, 133, 119],
  },
  5: {
    light: "bg-cream",
    dark: "bg-forest-deep/60",
    border: "border-forest-deep/40",
    shadow: "shadow-forest-deep/20",
    spotlight: "bg-forest-deep/15 dark:bg-forest-deep/40",
    line: "#0d2b24",
    tooltipBg: "bg-forest-deep",
    glow: [13, 43, 36],
  },
  6: {
    light: "bg-gold-100",
    dark: "bg-gold-800/50",
    border: "border-gold-800/50",
    shadow: "shadow-gold-800/25",
    spotlight: "bg-gold-800/20 dark:bg-gold-800/40",
    line: "#8a6b18",
    tooltipBg: "bg-gold-800",
    glow: [138, 107, 24],
  },
  7: {
    light: "bg-cream",
    dark: "bg-caption/30",
    border: "border-caption/40",
    shadow: "shadow-caption/20",
    spotlight: "bg-caption/20 dark:bg-caption/40",
    line: "#8a7a5c",
    tooltipBg: "bg-caption",
    glow: [138, 122, 92],
  },
};

const IconWrapper = ({
  children,
  className = "",
  isHighlighted = false,
  isHovered = false,
  animationDelay = 0,
  colorId,
}: {
  children: React.ReactNode;
  className?: string;
  isHighlighted?: boolean;
  isHovered?: boolean;
  animationDelay?: number;
  colorId?: number;
}) => {
  const c = colorId ? iconColors[colorId as keyof typeof iconColors] : null;
  const glowColor = c
    ? `rgba(${c.glow.join(",")}, 0.35)`
    : "rgba(31,77,77,0.3)";
  const glowColorMid = c
    ? `rgba(${c.glow.join(",")}, 0.1)`
    : "rgba(31,77,77,0.1)";

  return (
    <div
      className={`
        backdrop-blur-xl rounded-2xl flex items-center justify-center transition-all duration-300 border
        ${
          isHighlighted
            ? `${c?.dark || "dark:bg-forest/50"} ${c?.light || "bg-forest-100"} ${c?.border || "border-gold/40"} ${c?.shadow || "shadow-forest/10"} shadow-2xl animate-breathing-glow`
            : `dark:bg-white/5 bg-white/60 dark:border-white/20 border-gray-300/60 ${!isHovered && "animate-float"}`
        }
        ${
          isHovered && c
            ? `${c.dark} ${c.light} ${c.border} scale-110 ${c.shadow} shadow-2xl`
            : isHovered
              ? "dark:bg-forest/50 bg-forest-100 border-gold/50 scale-110 dark:shadow-gold/20 shadow-gold/20 shadow-2xl"
              : "dark:hover:bg-white/10 hover:bg-forest-100 dark:hover:border-white/20 hover:border-gold/30"
        }
        ${className}
    `}
      style={{
        animationDelay: `${animationDelay}s`,
        ...(isHighlighted && c
          ? ({
              "--glow-color": glowColor,
              "--glow-color-mid": glowColorMid,
            } as React.CSSProperties)
          : {}),
      }}
    >
      {children}
    </div>
  );
};

const IconGrid = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const outerIcons = [
    { id: 1, label: "Flight", component: <FlightLogo /> },
    { id: 2, label: "Train", component: <TrainLogo /> },
    { id: 3, label: "Ship", component: <ShipLogo /> },
    { id: 4, label: "Car Rental", component: <CarLogo /> },
    { id: 5, label: "Restaurant", component: <RestaurantLogo /> },
    { id: 6, label: "Spa", component: <SpaLogo /> },
    { id: 7, label: "Room Service", component: <RoomServiceLogo /> },
  ];

  const radius = 160;
  const centralIconRadius = 48;
  const outerIconRadius = 32;
  const svgSize = 400;
  const svgCenter = svgSize / 2;

  return (
    <div className="relative w-[400px] h-[400px] scale-75 md:scale-90 lg:scale-100">
      <svg width={svgSize} height={svgSize} className="absolute top-0 left-0">
        <defs>
          {Object.entries(iconColors).map(([id, c]) => (
            <filter key={`glow-${id}`} id={`glow-${id}`}>
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feFlood
                floodColor={`rgb(${c.glow.join(",")})`}
                floodOpacity="0.6"
                result="color"
              />
              <feComposite
                in="color"
                in2="coloredBlur"
                operator="in"
                result="colorBlur"
              />
              <feMerge>
                <feMergeNode in="colorBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          ))}
          <filter id="glow-default">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g>
          {outerIcons.map((icon, i) => {
            const nextIndex = (i + 1) % outerIcons.length;
            const nextIcon = outerIcons[nextIndex];
            const c = iconColors[icon.id as keyof typeof iconColors];

            const angle1 =
              (-90 + i * (360 / outerIcons.length)) * (Math.PI / 180);
            const x1 =
              svgCenter + (radius - outerIconRadius) * Math.cos(angle1);
            const y1 =
              svgCenter + (radius - outerIconRadius) * Math.sin(angle1);

            const angle2 =
              (-90 + nextIndex * (360 / outerIcons.length)) * (Math.PI / 180);
            const x2 =
              svgCenter + (radius - outerIconRadius) * Math.cos(angle2);
            const y2 =
              svgCenter + (radius - outerIconRadius) * Math.sin(angle2);

            const isLineActive =
              hoveredId === icon.id || hoveredId === nextIcon.id;
            const activeColor =
              hoveredId === icon.id
                ? c.line
                : iconColors[nextIcon.id as keyof typeof iconColors].line;

            return (
              <line
                key={`web-line-${icon.id}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={isLineActive ? activeColor : "#8a7a5c"}
                strokeWidth="1.5"
                className="transition-all duration-300"
                style={{ opacity: isLineActive ? 0.8 : 0.2 }}
                filter={
                  isLineActive
                    ? `url(#glow-${hoveredId === icon.id ? icon.id : nextIcon.id})`
                    : "none"
                }
              />
            );
          })}

          {outerIcons.map((icon, i) => {
            const angleInDegrees = -90 + i * (360 / outerIcons.length);
            const angleInRadians = angleInDegrees * (Math.PI / 180);
            const c = iconColors[icon.id as keyof typeof iconColors];

            const startX =
              svgCenter + centralIconRadius * Math.cos(angleInRadians);
            const startY =
              svgCenter + centralIconRadius * Math.sin(angleInRadians);
            const endX =
              svgCenter + (radius - outerIconRadius) * Math.cos(angleInRadians);
            const endY =
              svgCenter + (radius - outerIconRadius) * Math.sin(angleInRadians);
            const isSpokeActive = hoveredId === icon.id;

            return (
              <line
                key={`spoke-line-${icon.id}`}
                x1={startX}
                y1={startY}
                x2={endX}
                y2={endY}
                stroke={isSpokeActive ? c.line : "#8a7a5c"}
                strokeWidth="1.5"
                className="transition-all duration-300"
                style={{ opacity: isSpokeActive ? 1 : 0.2 }}
                filter={isSpokeActive ? `url(#glow-${icon.id})` : "none"}
              />
            );
          })}
        </g>
      </svg>

      <div className="absolute top-1/2 left-1/2">
        <div className="absolute -translate-x-1/2 -translate-y-1/2 z-10">
          <IconWrapper
            className="w-24 h-24"
            isHighlighted={true}
            animationDelay={0}
          >
            <HotelLogo />
          </IconWrapper>
        </div>

        {outerIcons.map((icon, i) => {
          const angleInDegrees = -90 + i * (360 / outerIcons.length);
          const angleInRadians = angleInDegrees * (Math.PI / 180);
          const x = radius * Math.cos(angleInRadians);
          const y = radius * Math.sin(angleInRadians);
          const c = iconColors[icon.id as keyof typeof iconColors];

          const iconStyle = {
            transform: `translate(${x}px, ${y}px)`,
          };
          const isHovered = hoveredId === icon.id;

          return (
            <div
              key={icon.id}
              className="absolute z-10 flex flex-col items-center"
              style={iconStyle}
              onMouseEnter={() => setHoveredId(icon.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="-translate-x-1/2 -translate-y-1/2 relative">
                <div
                  className={`absolute inset-[-20px] ${c.spotlight} rounded-full blur-2xl transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
                ></div>

                <IconWrapper
                  className="w-16 h-16"
                  isHovered={isHovered}
                  animationDelay={i * 0.15}
                  colorId={icon.id}
                >
                  {icon.component}
                </IconWrapper>

                <span
                  className={`absolute left-1/2 -translate-x-1/2 top-[70px] whitespace-nowrap text-xs font-semibold px-2.5 py-1 rounded-lg ${c.tooltipBg} text-white transition-opacity duration-200 shadow-lg ${
                    isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                >
                  {icon.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function HotelServiceWeb() {
  return (
    <div className="w-full flex items-center justify-center font-sans p-4 sm:p-8 overflow-hidden">
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
          .animate-float {
            animation: float 4s ease-in-out infinite;
          }

          @keyframes breathing-glow {
            0% { box-shadow: 0 0 20px 0px var(--glow-color, rgba(59,130,246,0.3)); }
            50% { box-shadow: 0 0 35px 10px var(--glow-color-mid, rgba(59,130,246,0.1)); }
            100% { box-shadow: 0 0 20px 0px var(--glow-color, rgba(59,130,246,0.3)); }
          }
          .animate-breathing-glow {
            animation: breathing-glow 3s ease-in-out infinite;
          }
        `}
      </style>

      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(31,77,77,0.12),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(201,162,39,0.18),rgba(255,255,255,0))]"></div>
      </div>

      <div className="relative z-10 container mx-auto flex items-center justify-center">
        <IconGrid />
      </div>
    </div>
  );
}
