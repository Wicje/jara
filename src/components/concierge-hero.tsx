"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkle } from "@phosphor-icons/react";
import { DERA_LISTINGS } from "@/data/dera";
import { formatNgn } from "./format";

const MATCH_QUERY = "Owambe dress under ₦100k, size M?";
const MATCH_HREF = "/catalog?occasion=owambe&budget=100000&size=M";

function demoMatches() {
  const matches = DERA_LISTINGS.filter(
    (l) => l.occasion === "owambe" && l.priceNgn <= 100000 && l.sizes.includes("M"),
  );
  return { count: matches.length, picks: matches.slice(0, 2) };
}

function useEnterOnce(timeoutMs = 1100) {
  const [enterOn, setEnterOn] = useState(true);
  useEffect(() => {
    const id = window.setTimeout(() => setEnterOn(false), timeoutMs);
    return () => window.clearTimeout(id);
  }, [timeoutMs]);
  return enterOn;
}

function GlassConciergeCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef({ x: 0, y: 0 });
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  } | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const { count, picks } = demoMatches();

  function clampOffset(nextX: number, nextY: number) {
    const card = cardRef.current;
    const parent = card?.parentElement;
    if (!card || !parent) return { x: nextX, y: nextY };
    const parentRect = parent.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const pad = 8;
    const current = offsetRef.current;
    const baseLeft = cardRect.left - parentRect.left - current.x;
    const baseTop = cardRect.top - parentRect.top - current.y;
    const minX = pad - baseLeft;
    const maxX = parentRect.width - cardRect.width - pad - baseLeft;
    const minY = pad - baseTop;
    const maxY = parentRect.height - cardRect.height - pad - baseTop;
    return {
      x: Math.min(Math.max(nextX, Math.min(minX, maxX)), Math.max(minX, maxX)),
      y: Math.min(Math.max(nextY, Math.min(minY, maxY)), Math.max(minY, maxY)),
    };
  }

  function moveBy(dx: number, dy: number) {
    const next = clampOffset(offsetRef.current.x + dx, offsetRef.current.y + dy);
    offsetRef.current = next;
    setOffset(next);
  }

  function onHandlePointerDown(event: ReactPointerEvent<HTMLButtonElement>) {
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: offsetRef.current.x,
      originY: offsetRef.current.y,
    };
    setDragging(true);
  }

  function onHandlePointerMove(event: ReactPointerEvent<HTMLButtonElement>) {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const next = clampOffset(
      drag.originX + (event.clientX - drag.startX),
      drag.originY + (event.clientY - drag.startY),
    );
    offsetRef.current = next;
    setOffset(next);
  }

  function endDrag(event: ReactPointerEvent<HTMLButtonElement>) {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    dragRef.current = null;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  function onHandleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    const step = 8;
    if (event.key === "ArrowLeft") moveBy(-step, 0);
    else if (event.key === "ArrowRight") moveBy(step, 0);
    else if (event.key === "ArrowUp") moveBy(0, -step);
    else if (event.key === "ArrowDown") moveBy(0, step);
    else if (event.key === "Escape") {
      offsetRef.current = { x: 0, y: 0 };
      setOffset({ x: 0, y: 0 });
    } else return;
    event.preventDefault();
  }

  return (
    <div
      ref={cardRef}
      className={`absolute inset-x-[4%] top-[10%] z-10 flex touch-none items-start gap-2.5 sm:inset-x-[6%] sm:top-[12%] ${
        dragging ? "cursor-grabbing" : ""
      }`}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition: dragging ? "none" : "transform 280ms cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      <button
        type="button"
        aria-label="Drag concierge card. Arrow keys nudge, Escape resets."
        onPointerDown={onHandlePointerDown}
        onPointerMove={onHandlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onKeyDown={onHandleKeyDown}
        className={`inline-flex size-8 shrink-0 cursor-grab touch-none items-center justify-center rounded-full border border-white/30 bg-white/15 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-all duration-200 hover:bg-white/25 active:cursor-grabbing sm:size-9 ${
          dragging ? "scale-105 bg-white/30" : ""
        }`}
      >
        <Sparkle size={15} weight="fill" aria-hidden="true" className="pointer-events-none text-white" />
      </button>

      <div className="pointer-events-none inline-flex min-w-0 flex-1 flex-col items-start overflow-hidden rounded-[18px] border border-white/20 bg-white/[0.12] shadow-[inset_0_4px_20px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl sm:rounded-[24px]">
        <div className="flex w-full flex-col gap-2 px-3.5 pt-3.5 pb-3 sm:gap-2.5 sm:px-5 sm:pt-5 sm:pb-4">
          <p className="font-sans text-[12.5px] font-semibold leading-snug text-white sm:text-[15px]">
            Q. {MATCH_QUERY}
          </p>
          <p className="flex items-center gap-1.5 font-sans text-[10px] text-white/60 sm:text-[11px]">
            <Sparkle size={12} aria-hidden="true" />
            concierge matched {count} pieces…
          </p>
          <ul className="grid gap-1">
            {picks.map((pick) => (
              <li
                key={pick.id}
                className="flex items-baseline justify-between gap-2 font-sans text-[11px] text-white/90 sm:text-[12px]"
              >
                <span className="truncate">{pick.title}</span>
                <span className="shrink-0 font-semibold tabular-nums">{formatNgn(pick.priceNgn)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-auto flex w-full items-center justify-between gap-2 border-t border-white/25 bg-white/[0.06] p-2 sm:p-2.5">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/10 px-2.5 py-[3px] font-sans text-[9.5px] font-medium text-white/85 sm:text-[11px]">
            size M in stock
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/10 px-2.5 py-[3px] font-sans text-[9.5px] font-medium text-white/85 sm:text-[11px]">
            same-day Lagos
          </span>
        </div>
      </div>
    </div>
  );
}

export function HeroArt({ photos }: { photos: string[] }) {
  const enterOn = useEnterOnce();
  const backdrop = photos[0];
  return (
    <div aria-label="Concierge preview" className={enterOn ? "animate-rise" : ""}>
      <div className="relative min-h-[300px] w-full overflow-hidden rounded-lg border border-line bg-ink sm:min-h-[360px]">
        {backdrop && (
          <div aria-label="Hero backdrop photo" className="absolute inset-0">
            <Image
              src={backdrop}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
              priority
            />
          </div>
        )}
        <div className="absolute inset-x-0 top-0 z-20 flex h-9 items-center justify-between px-3.5 sm:h-10 sm:px-5">
          <div className="flex items-center gap-[6px]" aria-hidden="true">
            <span className="size-[9px] rounded-full bg-[#FF5F57] sm:size-[10px]" />
            <span className="size-[9px] rounded-full bg-[#FEBC2E] sm:size-[10px]" />
            <span className="size-[9px] rounded-full bg-[#28C840] sm:size-[10px]" />
          </div>
          <div className="pointer-events-none absolute inset-x-0 flex justify-center">
            <div className="flex h-[22px] min-w-[7.5rem] items-center justify-center rounded-full bg-black/40 px-3 backdrop-blur-sm">
              <span className="font-sans text-[11px] font-medium tracking-tight text-white/70">
                jara · concierge
              </span>
            </div>
          </div>
          <div className="size-4" aria-hidden="true" />
        </div>
        <div className="absolute inset-0 z-10 pt-9 sm:pt-10">
          <GlassConciergeCard />
        </div>
        <Link
          href={MATCH_HREF}
          aria-label="See these matches in the catalog"
          className="absolute inset-x-3 bottom-3 z-20 inline-flex min-h-[42px] items-center justify-center gap-1.5 rounded-[32px] bg-white/95 px-5 font-sans text-sm font-semibold text-ink transition-all hover:bg-white active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blush sm:mx-auto sm:w-fit"
        >
          See the matches
          <ArrowRight size={15} weight="bold" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
