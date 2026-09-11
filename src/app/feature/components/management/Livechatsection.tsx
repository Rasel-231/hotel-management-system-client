"use client";

import { useEffect, useRef, useState } from "react";
import { Phone, Send } from "lucide-react";
import { ChatMessage, ChatThread } from "@/types/types";
import { cn } from "@/lib/utils";

interface LiveChatSectionProps {
  threads: ChatThread[];
  messagesByThread: Record<number, ChatMessage[]>;
  onSend?: (threadId: number, text: string) => void;
}

// ── Dept color map ────────────────────────────────────────────────────────────
const DEPT_COLOR: Record<string, string> = {
  "Front Desk": "from-indigo-500 to-indigo-600",
  Housekeeping: "from-emerald-500 to-emerald-600",
  Maintenance:  "from-red-500 to-red-600",
  Manager:      "from-violet-500 to-violet-600",
};

function threadGradient(name: string) {
  const dept = Object.keys(DEPT_COLOR).find((k) => name.includes(k));
  return dept ? DEPT_COLOR[dept] : "from-slate-400 to-slate-500";
}

// ── Avatar ────────────────────────────────────────────────────────────────────
function ThreadAvatar({ thread }: { thread: ChatThread }) {
  return (
    <div className="relative shrink-0">
      <div
        className={cn(
          "flex size-9 items-center justify-center rounded-full bg-gradient-to-br text-[11px] font-bold text-white",
          threadGradient(thread.name),
        )}
      >
        {thread.name[0]}
      </div>
      {thread.online && (
        <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border-2 border-white bg-emerald-500" />
      )}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function LiveChatSection({
  threads,
  messagesByThread,
  onSend,
}: LiveChatSectionProps) {
  // TODO: Replace with RTK Query useGetChatThreadsQuery() — thread list with unread counts
  // TODO: Replace with RTK Query or WebSocket subscription for real-time messages
  // TODO: Replace with RTK Query useSendChatMessageMutation() for the send flow

  const [active, setActive] = useState<number>(threads[0]?.id);
  const [draft,  setDraft]  = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesByThread, active]);

  const thread   = threads.find((t) => t.id === active);
  const messages = messagesByThread[active] ?? [];

  const send = () => {
    if (!draft.trim()) return;
    onSend?.(active, draft);
    setDraft("");
  };

  return (
    <div className="space-y-5">
      {/* ── Header ──────────────────────────────────────── */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Live Chat</h2>
        <p className="mt-1 text-sm text-slate-500">
          Internal messaging — front desk, housekeeping, maintenance
        </p>
      </div>

      {/* ── Split panel ──────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3" style={{ height: 480 }}>
        {/* Thread list */}
        <div className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-4 py-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Channels
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {threads.map((t) => (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={cn(
                  "w-full px-4 py-3 text-left transition-colors hover:bg-indigo-50/40",
                  active === t.id && "bg-indigo-50",
                )}
              >
                <div className="flex items-center gap-3">
                  <ThreadAvatar thread={t} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <span
                        className={cn(
                          "truncate text-[13px] font-semibold",
                          active === t.id ? "text-indigo-700" : "text-slate-800",
                        )}
                      >
                        {t.name}
                      </span>
                      <span className="shrink-0 text-[10px] text-slate-400">{t.time}</span>
                    </div>
                    <p className="mt-0.5 truncate text-[11px] text-slate-400">{t.lastMessage}</p>
                  </div>
                  {t.unread > 0 && (
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">
                      {t.unread}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Message pane */}
        <div className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm lg:col-span-2">
          {/* Pane header */}
          <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-3">
            {thread && <ThreadAvatar thread={thread} />}
            <div className="flex-1">
              <div className="text-[14px] font-semibold text-slate-900">{thread?.name}</div>
              <div className="text-[11px] text-slate-400">
                {thread?.online ? "Online" : "Offline"}
              </div>
            </div>
            <button
              type="button"
              className="flex size-8 items-center justify-center rounded-lg border border-slate-200 text-slate-400 transition-colors hover:bg-slate-50"
              aria-label="Call"
            >
              <Phone size={15} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-2.5 overflow-y-auto px-5 py-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={cn("flex", m.from === "me" ? "justify-end" : "justify-start")}
              >
                <div
                  className={cn(
                    "max-w-[70%] rounded-2xl px-4 py-2.5 text-sm",
                    m.from === "me"
                      ? "rounded-tr-sm bg-indigo-600 text-white"
                      : "rounded-tl-sm bg-slate-100 text-slate-800",
                  )}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {messages.length === 0 && (
              <p className="text-center text-xs text-slate-400">
                No messages yet. Start a conversation.
              </p>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Composer */}
          <div className="border-t border-slate-200 px-4 py-3">
            <div className="flex items-center gap-2">
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Message likhun… (Enter to send)"
                className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
              />
              <button
                onClick={send}
                disabled={!draft.trim()}
                className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm transition-colors hover:bg-indigo-700 disabled:opacity-40"
              >
                <Send size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
