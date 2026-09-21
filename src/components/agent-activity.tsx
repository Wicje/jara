"use client";

import { useRef, useState } from "react";

export type AgentActivityState = "starting" | "working" | "progress" | "completed";

export interface AgentActivityCopy {
  title?: string;
  description?: string;
}

export interface AgentActivityProps {
  state?: AgentActivityState;
  defaultState?: AgentActivityState;
  className?: string;
  showStateSelector?: boolean;
  onStateChange?: (state: AgentActivityState) => void;
  onClick?: () => void;
  copy?: Partial<Record<AgentActivityState, AgentActivityCopy>>;
}

const AGENT_ACTIVITY_STATES: Array<{ id: AgentActivityState; label: string }> = [
  { id: "starting", label: "Starting" },
  { id: "working", label: "Working" },
  { id: "progress", label: "Progress" },
  { id: "completed", label: "Completed" },
];

const DEFAULT_COPY: Record<AgentActivityState, { title: string; description: string }> = {
  starting: { title: "Finding your fit", description: "Understanding your request" },
  working: { title: "Confirming with Dera", description: "Sending your order to the boutique" },
  progress: { title: "Dera replied", description: "Reviewing the vendor's reply" },
  completed: { title: "Confirmed", description: "Your pieces are being prepared" },
};

function StartingIcon() {
  const bars = ["[animation-delay:0s]", "[animation-delay:-0.6s]", "[animation-delay:-1.2s]"];
  return (
    <div className="flex h-[6px] w-[29px] flex-row items-center justify-center gap-[2px]" aria-hidden="true">
      {bars.map((delay) => (
        <span key={delay} className={`h-[6px] animate-pill-cycle rounded-full bg-violet ${delay}`} />
      ))}
    </div>
  );
}

function WorkingIcon() {
  const rings = [
    { size: 30, r: 14.9, delay: "[animation-delay:0.6s]", fill: "fill-mist" },
    { size: 30, r: 11, delay: "[animation-delay:0.4s]", fill: "fill-line" },
    { size: 30, r: 7.9, delay: "[animation-delay:0.2s]", fill: "fill-smoke" },
    { size: 30, r: 4.9, delay: "[animation-delay:0s]", fill: "fill-violet" },
  ];
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" className="shrink-0" aria-hidden="true">
      {rings.map((ring) => (
        <circle
          key={ring.r}
          cx="15"
          cy="15"
          r={ring.r}
          className={`${ring.fill} animate-pulse-ring [transform-box:fill-box] [transform-origin:center] ${ring.delay}`}
        />
      ))}
    </svg>
  );
}

const RADAR_DOTS: Array<[number, number]> = [
  [21, 9],
  [29.5, 12.5],
  [33, 21],
  [29.5, 29.5],
  [21, 33],
  [12.5, 29.5],
  [9, 21],
  [12.5, 12.5],
];

function ProgressIcon() {
  return (
    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" className="shrink-0" aria-hidden="true">
      <circle
        cx="21"
        cy="21"
        r="4.8"
        fill="none"
        strokeWidth="0.9"
        className="animate-core-breathe stroke-line [transform-box:fill-box] [transform-origin:center]"
      />
      <g className="animate-radar-spin [transform-origin:21px_21px]">
        {RADAR_DOTS.map(([cx, cy], index) => (
          <circle key={index} cx={cx} cy={cy} r="2.575" className={index < 3 ? "fill-violet" : "fill-ink"} opacity={index < 3 ? 1 : 0.35} />
        ))}
      </g>
    </svg>
  );
}

function CompletedIcon() {
  return (
    <div className="relative flex items-center justify-center" aria-hidden="true">
      <span className="absolute size-[30px] animate-ping-soft rounded-full bg-violet" />
      <span className="flex size-[30px] items-center justify-center rounded-full bg-mist">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M4 10.5l4 4 8-9"
            stroke="#720eec"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </div>
  );
}

function StateIcon({ state }: { state: AgentActivityState }) {
  switch (state) {
    case "starting":
      return <StartingIcon />;
    case "working":
      return <WorkingIcon />;
    case "progress":
      return <ProgressIcon />;
    case "completed":
      return <CompletedIcon />;
  }
}

function GripDots() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true" className="opacity-70">
      {[2, 6, 10].map((y) =>
        [2, 6, 10].map((x) => <circle key={`${x}-${y}`} cx={x} cy={y} r="1.1" />),
      )}
    </svg>
  );
}

export interface OrderActivityInput {
  order: { status: string };
  events: Array<{ direction: string }>;
}

/** Maps live order + timeline state onto the four agent states. Pure and unit-tested. */
export function resolveOrderActivity(entries: OrderActivityInput[]): {
  state: AgentActivityState;
  flagged: boolean;
} {
  const statuses = entries.map((entry) => entry.order.status);
  const hasVendorReply = entries.some((entry) =>
    entry.events.some((event) => event.direction === "in"),
  );
  const flagged = statuses.some((status) => status === "flagged");
  if (statuses.length > 0 && statuses.every((status) => status === "confirmed")) {
    return { state: "completed", flagged };
  }
  if (hasVendorReply) {
    return { state: "progress", flagged };
  }
  return { state: "working", flagged };
}

export default function AgentActivity({
  state: controlledState,
  defaultState = "starting",
  className,
  showStateSelector = true,
  onStateChange,
  onClick,
  copy,
}: AgentActivityProps) {
  const [internalState, setInternalState] = useState<AgentActivityState>(
    controlledState ?? defaultState,
  );
  const activeState = controlledState ?? internalState;

  const [stripPos, setStripPos] = useState({ x: 0, y: 0 });
  const stripDragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  } | null>(null);

  function switchState(next: AgentActivityState) {
    if (controlledState === undefined) setInternalState(next);
    onStateChange?.(next);
  }

  function onStripGripPointerDown(event: React.PointerEvent<HTMLButtonElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    stripDragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: stripPos.x,
      originY: stripPos.y,
    };
  }

  function onStripGripPointerMove(event: React.PointerEvent<HTMLButtonElement>) {
    const drag = stripDragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    setStripPos({
      x: drag.originX + (event.clientX - drag.startX),
      y: drag.originY + (event.clientY - drag.startY),
    });
  }

  function onStripGripPointerUp(event: React.PointerEvent<HTMLButtonElement>) {
    if (stripDragRef.current?.pointerId === event.pointerId) {
      stripDragRef.current = null;
      try {
        event.currentTarget.releasePointerCapture(event.pointerId);
      } catch {
        // Already released.
      }
    }
  }

  const label = {
    title: copy?.[activeState]?.title ?? DEFAULT_COPY[activeState].title,
    description: copy?.[activeState]?.description ?? DEFAULT_COPY[activeState].description,
  };

  return (
    <div className={`flex w-full flex-col items-center gap-3 ${className ?? ""}`}>
      <div className="relative flex w-full flex-col items-center gap-3">
        <div
          onClick={onClick}
          className="relative flex min-h-[140px] w-full items-center justify-center rounded-lg border border-line bg-white p-4 sm:min-h-[180px] sm:p-6"
        >
          <div key={activeState} className="flex max-w-full animate-fade-swap flex-row items-center gap-3">
            <div className="relative flex size-[42px] shrink-0 items-center justify-center rounded-[10px] border border-line bg-mist">
              <StateIcon state={activeState} />
            </div>
            <div className="flex min-w-0 flex-col items-start justify-center gap-[2px] text-left font-sans">
              <span className="block text-base leading-[22px] font-medium tracking-[-0.02em] text-ink">
                {label.title}
              </span>
              <span className="block text-xs leading-4 tracking-[-0.01em] text-smoke">
                {label.description}
              </span>
            </div>
          </div>
        </div>

        {showStateSelector ? (
          <div
            className="relative z-20 mt-1 flex w-full max-w-full justify-center px-1"
            style={{ transform: `translate(${stripPos.x}px, ${stripPos.y}px)` }}
          >
            <div className="inline-flex max-w-full items-center gap-0.5 rounded-full bg-mist p-1 select-none">
              <button
                type="button"
                aria-label="Drag states strip"
                onPointerDown={onStripGripPointerDown}
                onPointerMove={onStripGripPointerMove}
                onPointerUp={onStripGripPointerUp}
                onPointerCancel={onStripGripPointerUp}
                className="inline-flex h-[26px] shrink-0 cursor-grab items-center gap-1 rounded-full px-2.5 font-sans text-xs font-medium text-smoke hover:text-ink active:cursor-grabbing"
              >
                <GripDots />
                States
              </button>
              <div className="flex max-w-full items-center gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {AGENT_ACTIVITY_STATES.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => switchState(item.id)}
                    aria-pressed={activeState === item.id}
                    className={`shrink-0 cursor-pointer rounded-full px-3 py-1 font-sans text-xs font-medium whitespace-nowrap transition-all ${
                      activeState === item.id
                        ? "border border-ink/5 bg-white font-semibold text-ink shadow-xs"
                        : "text-ink/60 hover:bg-white/60 hover:text-ink"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
