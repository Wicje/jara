"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUp,
  MagnifyingGlass,
  Package,
  Ruler,
  Tag,
  WhatsappLogo,
  Wrench,
} from "@phosphor-icons/react";
import type { ChatToolId } from "@/lib/concierge-chat";

interface ComposerTool {
  id: ChatToolId;
  label: string;
  Icon: typeof MagnifyingGlass;
}

const COMPOSER_TOOLS: ComposerTool[] = [
  { id: "search", label: "Search everything", Icon: MagnifyingGlass },
  { id: "budget", label: "Filter by budget", Icon: Tag },
  { id: "size", label: "Filter by size", Icon: Ruler },
  { id: "track", label: "Track my order", Icon: Package },
  { id: "dera", label: "Talk to Dera", Icon: WhatsappLogo },
];

export interface AiComposerProps {
  onSubmit: (text: string, tool: ChatToolId) => void;
  placeholder?: string;
  autoFocus?: boolean;
}

export function AiComposer({ onSubmit, placeholder = "Ask anything…", autoFocus = false }: AiComposerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState<ChatToolId>("search");
  const [hoveredId, setHoveredId] = useState<ChatToolId | null>(null);
  const [value, setValue] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const highlightId = hoveredId ?? activeId;
  const canSend = value.trim().length > 0;

  useEffect(() => {
    if (autoFocus) textareaRef.current?.focus();
  }, [autoFocus]);

  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    function onPointerDown(event: MouseEvent) {
      const target = event.target as Node | null;
      if (target && !rootRef.current?.contains(target)) setIsOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [isOpen]);

  function submit() {
    if (!canSend) return;
    onSubmit(value.trim(), activeId);
    setValue("");
    textareaRef.current?.focus();
  }

  function select(id: ChatToolId) {
    setActiveId(id);
    setIsOpen(false);
    triggerRef.current?.focus();
  }

  return (
    <div ref={rootRef} className="relative w-full font-sans select-none">
      <div className="relative flex w-full flex-col gap-3 rounded-[28px] border border-line bg-white p-3.5 shadow-[0_24px_48px_rgba(15,23,42,0.1),0_8px_20px_rgba(15,23,42,0.05)] sm:p-4">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              submit();
            }
          }}
          rows={2}
          placeholder={placeholder}
          aria-label="Message the concierge"
          className="w-full resize-none bg-transparent px-1.5 pt-1 text-[15px] leading-[1.45] tracking-[-0.02em] text-ink outline-none placeholder:text-smoke/60"
        />
        <div className="flex items-center justify-between gap-3">
          <div className="relative inline-flex">
            <button
              ref={triggerRef}
              type="button"
              aria-haspopup="menu"
              aria-expanded={isOpen}
              aria-label="Concierge tools menu"
              onClick={() => setIsOpen((open) => !open)}
              className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-full border border-ink/10 bg-mist px-3.5 font-sans text-[13.5px] font-medium text-ink transition-colors outline-none hover:bg-line focus-visible:ring-2 focus-visible:ring-violet focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
            >
              <Wrench size={16} aria-hidden="true" />
              <span>Tools</span>
            </button>
            <div className="absolute bottom-full left-0 z-30 pb-2">
              <AnimatePresence>
                {isOpen ? (
                  <motion.div
                    role="menu"
                    aria-label="Concierge tools"
                    onMouseLeave={() => setHoveredId(null)}
                    initial={{ opacity: 0, y: 6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 420, damping: 28 }}
                    className="box-border w-[248px] origin-bottom-left overflow-hidden rounded-[20px] border border-line bg-white p-1.5 shadow-[0_24px_48px_rgba(15,23,42,0.12),0_8px_20px_rgba(15,23,42,0.06)]"
                  >
                  <ul className="m-0 flex list-none flex-col gap-0.5 p-0">
                    {COMPOSER_TOOLS.map((item) => {
                      const highlighted = highlightId === item.id;
                      const Icon = item.Icon;
                      return (
                        <li key={item.id}>
                          <button
                            type="button"
                            role="menuitem"
                            onMouseEnter={() => setHoveredId(item.id)}
                            onFocus={() => setHoveredId(item.id)}
                            onClick={() => select(item.id)}
                            className={`flex h-10 w-full cursor-pointer items-center justify-start gap-2.5 rounded-[12px] px-2.5 text-left font-sans text-[13.5px] font-medium tracking-[-0.015em] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-violet focus-visible:ring-inset ${
                              highlighted ? "bg-mist text-ink" : "text-smoke"
                            }`}
                          >
                            <Icon size={20} aria-hidden="true" className="shrink-0" />
                            <span className="min-w-0 flex-1 truncate text-left">{item.label}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </div>
          <button
            type="button"
            aria-label="Send message"
            disabled={!canSend}
            onClick={submit}
            className={`inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors outline-none focus-visible:ring-2 focus-visible:ring-violet focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:cursor-not-allowed ${
              canSend ? "bg-violet text-white shadow-[0_8px_20px_-8px_rgba(114,14,236,0.55)] hover:bg-violet-deep" : "bg-mist text-smoke/60"
            }`}
          >
            <ArrowUp size={16} weight="bold" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
