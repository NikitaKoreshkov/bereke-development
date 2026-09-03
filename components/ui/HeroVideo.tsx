'use client';

import { useEffect, useRef, useState } from 'react';
import { useSiteContent } from '@/lib/content-context';

function pickHeroVideoSrc(hero: string, heroMobile: string) {
  return window.matchMedia('(max-width: 768px)').matches ? heroMobile : hero;
}

function shouldSkipVideo() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const connection = (
    navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }
  ).connection;

  return prefersReducedMotion || connection?.saveData || connection?.effectiveType === '2g';
}

export function HeroVideo() {
  const { images, videos } = useSiteContent();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [videoVisible, setVideoVisible] = useState(false);

  useEffect(() => {
    if (shouldSkipVideo()) return;

    const loadVideo = () => setVideoSrc(pickHeroVideoSrc(videos.hero, videos.heroMobile));

    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    if (typeof window.requestIdleCallback === 'function') {
      idleId = window.requestIdleCallback(loadVideo, { timeout: 1500 });
    } else {
      timeoutId = setTimeout(loadVideo, 300);
    }

    return () => {
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, [videos.hero, videos.heroMobile]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSrc) return;

    const revealVideo = () => {
      void video.play().then(() => setVideoVisible(true)).catch(() => {});
    };

    video.addEventListener('canplay', revealVideo, { once: true });
    video.load();

    return () => video.removeEventListener('canplay', revealVideo);
  }, [videoSrc]);

  return (
    <div className="relative h-full min-h-full w-full">
      {/* Native img — без кеша Next/Image optimizer */}
      <img
        src={images.heroPoster}
        alt=""
        width={1280}
        height={720}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      {videoSrc ? (
        <video
          ref={videoRef}
          src={videoSrc}
          poster={
            images.heroPoster.endsWith('.webp')
              ? images.heroPoster.replace(/\.webp$/i, '.jpg')
              : images.heroPoster
          }
          muted
          loop
          playsInline
          autoPlay
          preload="none"
          aria-hidden
          className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-1000 ease-out ${
            videoVisible ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ) : null}
    </div>
  );
}
