"use client";
import React, {
  createContext,
  useMemo,
  useRef,
  useState,
  ReactNode,
  use,
  useEffect,
} from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

type TL = gsap.core.Timeline | null;

export type TimelineContextValue = {
  timeline: TL;
  setTimeline: (tl: TL) => void;
  activeHash: string;
  setActiveHash: (hash: string) => void;
  gotoHash: (hash: string, opts?: { duration?: number }) => void;
  labelToScroll: (label: string) => number | null;
};

const TimelineContext = createContext<TimelineContextValue | null>(null);

// GSAP helper – maps timeline progress to window scroll position
function getScrollPosition(animation: gsap.core.Animation, progress = 0) {
  const p = gsap.utils.clamp(0, 1, progress);
  let st = animation.scrollTrigger!;
  const containerAnimation = st?.vars?.containerAnimation as
    | gsap.core.Animation
    | undefined;
  if (containerAnimation) {
    const time = st.start + (st.end - st.start) * p;
    st = containerAnimation.scrollTrigger!;
    return (
      st.start + (st.end - st.start) * (time / containerAnimation.duration())
    );
  }
  return st.start + (st.end - st.start) * p;
}

export function TimelineProvider({ children }: { children: ReactNode }) {
  const [activeHash, setActiveHash] = useState<string>("hero");
  const tlRef = useRef<TL>(null);

  const setTimeline = (tl: TL) => {
    tlRef.current = tl;
  };

  // if there is already a hash in the URL, use it. 
  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (hash && activeHash !== hash) {
      setActiveHash(hash);
      gotoHash(hash);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Map a label -> scroll position (window Y) using timeline duration
  const labelToScroll = (label: string) => {
    const tl = tlRef.current;
    if (!tl || !tl.scrollTrigger) return null;
    const t = tl.labels[label];
    if (t == null) return null; // allow label at time 0
    const dur = tl.duration();
    if (!dur) return null;
    const progress = t / dur; // correct conversion
    return getScrollPosition(tl, progress);
  };

  const gotoHash = (hash: string, opts?: { duration?: number }) => {
    const label = hash; // labels should match hashes: "hero","work","about","contact","footer"
    const y = labelToScroll(label);
    if (y == null) return;
    const d = opts ? opts.duration : 1.2
    gsap.to(window, { scrollTo: y, duration: d, ease: "sine.inOut" });
    history.replaceState(null, "", `#${hash}`);
  };

  const value = useMemo<TimelineContextValue>(
    () => ({
      timeline: tlRef.current,
      setTimeline,
      activeHash,
      setActiveHash,
      gotoHash,
      labelToScroll,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeHash],
  );

  return <TimelineContext value={value}>{children}</TimelineContext>;
}

// Safe consumer hook
export function useTimeline() {
  const ctx = use(TimelineContext);
  if (!ctx) {
    throw new Error("useTimeline must be used within a TimelineProvider");
  }
  return ctx;
}
