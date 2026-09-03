'use client';

import { useEffect, useRef, useState } from 'react';

interface TypewriterParagraphsProps {
  paragraphs: readonly string[];
  className?: string;
}

function charDelay(char: string, prevChar: string, paragraphLength: number) {
  const lengthFactor = paragraphLength > 220 ? 1.35 : paragraphLength > 160 ? 1.15 : 1;
  let delay = (9 + Math.random() * 7) * lengthFactor;

  if (char === '.' || char === ',') {
    delay += 90 + Math.random() * 80;
  }

  if (char === ':') {
    delay += 70 + Math.random() * 40;
  }

  if (char === ' ' && (prevChar === '.' || prevChar === ',')) {
    delay += 110 + Math.random() * 70;
  }

  return delay;
}

export function TypewriterParagraphs({ paragraphs, className = '' }: TypewriterParagraphsProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [skipTypewriter, setSkipTypewriter] = useState(false);
  const [paragraphIndex, setParagraphIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mobile = window.matchMedia('(max-width: 639px)').matches;
    setSkipTypewriter(reducedMotion || mobile);
  }, []);

  useEffect(() => {
    if (skipTypewriter) return;

    const el = rootRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [skipTypewriter]);

  useEffect(() => {
    if (skipTypewriter || !started || finished) return;

    const current = paragraphs[paragraphIndex];
    if (!current) {
      setFinished(true);
      return;
    }

    if (charIndex >= current.length) {
      if (paragraphIndex >= paragraphs.length - 1) {
        setFinished(true);
        return;
      }

      const pause = window.setTimeout(() => {
        setParagraphIndex((i) => i + 1);
        setCharIndex(0);
      }, 280);

      return () => window.clearTimeout(pause);
    }

    const prevChar = charIndex > 0 ? current[charIndex - 1] : '';
    const delay = charDelay(current[charIndex], prevChar, current.length);
    const timeout = window.setTimeout(() => {
      setCharIndex((i) => i + 1);
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [charIndex, finished, paragraphIndex, paragraphs, skipTypewriter, started]);

  return (
    <div ref={rootRef} className={className} aria-live="polite">
      {paragraphs.map((text, index) => {
        const isComplete = skipTypewriter || finished || index < paragraphIndex;
        const isActive = started && !skipTypewriter && !finished && index === paragraphIndex;
        const visible = skipTypewriter
          ? text
          : !started
            ? ''
            : isComplete
              ? text
              : isActive
                ? text.slice(0, charIndex)
                : '';

        if (isComplete && !isActive) {
          return <p key={index}>{text}</p>;
        }

        return (
          <p key={index} className="relative">
            <span className="invisible block" aria-hidden>
              {text}
            </span>
            <span className="absolute inset-x-0 top-0">
              {visible}
              {isActive ? <span className="typewriter-cursor ml-px text-[#9A7428]">|</span> : null}
            </span>
          </p>
        );
      })}
    </div>
  );
}
