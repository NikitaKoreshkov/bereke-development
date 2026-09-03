"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export type ScrollRevealVariant = "up" | "down" | "left" | "right" | "scale" | "blur";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  variant?: ScrollRevealVariant;
  delay?: number;
  duration?: number;
  once?: boolean;
}

export function ScrollReveal({
  children,
  className = "",
  variant = "up",
  delay = 0,
  duration = 900,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { rootMargin: "0px 0px -7% 0px", threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  return (
    <div
      ref={ref}
      data-visible={visible ? "true" : "false"}
      className={`scroll-reveal scroll-reveal--${variant} ${visible ? "scroll-reveal--visible" : ""} ${className}`.trim()}
      style={{
        ["--reveal-delay" as string]: `${delay}ms`,
        ["--reveal-duration" as string]: `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
}
