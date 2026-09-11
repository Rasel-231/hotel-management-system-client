"use client";

import { useState } from "react";
import { Send, MailOpen } from "lucide-react";
import { GuestMessage } from "@/types/types";
import { cn } from "@/lib/utils";

interface GuestInboxSectionProps {
  messages: GuestMessage[];
  onReply?: (messageId: number, reply: string) => void;
}

// ── Avatar initials ───────────────────────────────────────────────────────────
function Avatar({ name, size = "sm" }: { name: string; size?: "sm" | "md" }) {
  const initials = name.split(" ").map((n) => n[0]).slice(0, 2).join("");
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 font-bold text-white",
        size === "sm" ? "size-8 text-[11px]" : "size-10 text-sm",
      )}
    >
      {initials}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function GuestInboxSection({ messages, onReply }: GuestInboxSectionProps) {
  // TODO: Replace with RTK Query useGetGuestMessagesQuery({ page: 1, limit: 20 })
  // TODO: Replace with RTK Query useSendGuestReplyMutation() for the reply flow

  const [active, setActive] = useState<number>(messages[0]?.id);
  const [draft,  setDraft]  = useState("");

  const current = messages.find((m) => m.id === active);

  const reply = () => {
    if (!draft.trim() || !current) return;
    onReply?.(current.id, draft);
    setDraft("");
  };

  return (
    <div className="space-y-5">
      {/* ── Header ──────────────────────────────────────── */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Guest Messages</h2>
        <p className="mt-1 text-sm text-slate-500">
          Messages from the booking site — reply directly, no SMS gateway needed
        </p>
      </div>

      {/* ── Split layout ─────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3" style={{ height: 480 }}>
        {/* Thread list */}
        <div className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-4 py-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Inbox ({messages.filter((m) => !m.replied).length} unread)
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {messages.map((m) => (
              <button
                key={m.id}
                onClick={() => setActive(m.id)}
                className={cn(
                  "w-full px-4 py-3 text-left transition-colors hover:bg-indigo-50/40",
                  active === m.id && "bg-indigo-50",
                )}
              >
                <div className="flex items-center gap-3">
                  <Avatar name={m.name} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className={cn("truncate text-[13px] font-semibold", active === m.id ? "text-indigo-700" : "text-slate-800")}>
                        {m.name}
                      </span>
                      {!m.replied && (
                        <span className="size-2 shrink-0 rounded-full bg-amber-500 ring-2 ring-white" />
                      )}
                    </div>
                    <p className="mt-0.5 truncate text-[11px] text-slate-400">{m.message}</p>
                    <p className="mt-0.5 text-[10px] text-slate-300">
                      Room {m.room} · {m.time}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Message pane */}
        <div className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm lg:col-span-2">
          {current ? (
            <>
              {/* Pane header */}
              <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-3">
                <Avatar name={current.name} size="md" />
                <div>
                  <div className="text-[14px] font-semibold text-slate-900">{current.name}</div>
                  <div className="text-[11px] text-slate-400">
                    {current.phone} · Room {current.room}
                  </div>
                </div>
                {!current.replied && (
                  <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                    <MailOpen size={10} />
                    Unread
                  </span>
                )}
              </div>

              {/* Messages */}
              <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
                {/* Guest message bubble */}
                <div className="flex items-end gap-2">
                  <Avatar name={current.name} />
                  <div className="max-w-[72%] rounded-2xl rounded-tl-sm bg-slate-100 px-4 py-2.5 text-sm text-slate-800">
                    {current.message}
                  </div>
                </div>

                {/* Admin reply bubble */}
                {current.replied && current.reply && (
                  <div className="flex justify-end">
                    <div className="max-w-[72%] rounded-2xl rounded-tr-sm bg-indigo-600 px-4 py-2.5 text-sm text-white">
                      {current.reply}
                    </div>
                  </div>
                )}
              </div>

              {/* Reply composer */}
              <div className="border-t border-slate-200 px-4 py-3">
                <div className="flex items-center gap-2">
                  <input
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && reply()}
                    placeholder="Type a reply… (Enter to send)"
                    className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
                  />
                  <button
                    onClick={reply}
                    disabled={!draft.trim()}
                    className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm transition-colors hover:bg-indigo-700 disabled:opacity-40"
                  >
                    <Send size={15} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center text-sm text-slate-400">
              Select a message to view
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
