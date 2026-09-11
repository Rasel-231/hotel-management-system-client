"use client";

import { useState } from "react";
import { Image as ImageIcon, Power, Globe, CheckCircle2 } from "lucide-react";
import { WebsiteSection } from "@/types/types";
import { cn } from "@/lib/utils";

interface WebsiteControlSectionProps {
  sections: WebsiteSection[];
  onToggleSection?: (label: string, live: boolean) => void;
  onPublishBanner?: (text: string) => void;
  onTakeBannerOffline?: () => void;
}

// ── Pill toggle (pure Tailwind, no external dep) ──────────────────────────────
function Toggle({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={onClick}
      className={cn(
        "relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200",
        on ? "bg-indigo-600" : "bg-slate-200",
      )}
    >
      <span
        className={cn(
          "inline-block size-4 transform rounded-full bg-white shadow-sm transition-transform duration-200",
          on ? "translate-x-4" : "translate-x-0",
        )}
      />
    </button>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function WebsiteControlSection({
  sections,
  onToggleSection,
  onPublishBanner,
  onTakeBannerOffline,
}: WebsiteControlSectionProps) {
  // TODO: Replace with RTK Query useGetWebsiteSectionsQuery() — live section states
  // TODO: Replace with RTK Query useToggleWebsiteSectionMutation() — toggle section live
  // TODO: Replace with RTK Query usePublishBannerMutation() — banner publish
  // TODO: Replace with RTK Query useTakeBannerOfflineMutation() — take banner offline

  const [bannerText, setBannerText] = useState("");
  const [bannerPublished, setBannerPublished] = useState(false);

  const handlePublish = () => {
    if (!bannerText.trim()) return;
    onPublishBanner?.(bannerText);
    setBannerPublished(true);
    setTimeout(() => setBannerPublished(false), 3000);
  };

  const liveCount = sections.filter((s) => s.live).length;

  return (
    <div className="space-y-5">
      {/* ── Header ──────────────────────────────────────── */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Website Control</h2>
        <p className="mt-1 text-sm text-slate-500">
          Toggle what&apos;s live on your booking site right now
        </p>
      </div>

      {/* ── Live status badge ─────────────────────────────── */}
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          <span className="size-1.5 rounded-full bg-emerald-500" />
          {liveCount} of {sections.length} sections live
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* ── Site sections toggles ─────────────────────── */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <Globe size={16} className="text-indigo-500" />
            <span className="text-sm font-semibold text-slate-800">Site sections</span>
          </div>
          <div className="space-y-3">
            {sections.map((s) => (
              <div
                key={s.label}
                className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 px-4 py-2.5"
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={cn(
                      "size-2 rounded-full",
                      s.live ? "bg-emerald-500" : "bg-slate-300",
                    )}
                  />
                  <span className="text-[13px] font-medium text-slate-700">{s.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "text-[11px] font-semibold",
                      s.live ? "text-emerald-600" : "text-slate-400",
                    )}
                  >
                    {s.live ? "Live" : "Off"}
                  </span>
                  <Toggle
                    on={s.live}
                    onClick={() => onToggleSection?.(s.label, !s.live)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Promo banner builder ──────────────────────── */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <ImageIcon size={16} className="text-indigo-500" />
            <span className="text-sm font-semibold text-slate-800">Homepage promo banner</span>
          </div>

          {/* Image placeholder */}
          <div className="mb-4 flex h-28 items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 transition-colors hover:border-indigo-200 hover:bg-indigo-50/30">
            <div className="text-center">
              <ImageIcon size={20} className="mx-auto mb-1 text-slate-300" />
              <p className="text-[11px] text-slate-400">Click to upload banner image</p>
            </div>
          </div>

          {/* Banner text */}
          <input
            value={bannerText}
            onChange={(e) => setBannerText(e.target.value)}
            placeholder="e.g. Eid special — 20% off suites, book by 30 Sep"
            className="mb-3 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
          />

          {/* Action buttons */}
          <div className="flex gap-2">
            <button
              onClick={handlePublish}
              disabled={!bannerText.trim()}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold shadow-sm transition-all",
                bannerPublished
                  ? "bg-emerald-600 text-white"
                  : "bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-40",
              )}
            >
              {bannerPublished ? (
                <>
                  <CheckCircle2 size={14} />
                  Published!
                </>
              ) : (
                "Publish"
              )}
            </button>
            <button
              onClick={onTakeBannerOffline}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-800"
            >
              <Power size={13} />
              Take offline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
