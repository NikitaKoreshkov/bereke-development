'use client';

import { useCallback, useState } from 'react';
import { useSiteContent } from '@/lib/content-context';
import LayoutCard from './LayoutCard';
import LayoutLightbox from './LayoutLightbox';

export default function SpacesGrid() {
  const { layouts: allLayouts } = useSiteContent();
  const layouts = allLayouts.filter((i) => i.visible).sort((a, b) => a.order - b.order);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const count = layouts.length;

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const lightboxPrev = useCallback(() => {
    setLightboxIndex((i) => {
      if (i === null) return i;
      return i === 0 ? count - 1 : i - 1;
    });
  }, [count]);

  const lightboxNext = useCallback(() => {
    setLightboxIndex((i) => {
      if (i === null) return i;
      return i === count - 1 ? 0 : i + 1;
    });
  }, [count]);

  return (
    <>
      <div className="mt-12 grid gap-5 sm:mt-14 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {layouts.map((layout, index) => (
          <LayoutCard
            key={layout.id}
            layout={layout}
            instanceId={layout.id}
            className="h-full w-full"
            onImageClick={() => setLightboxIndex(index)}
          />
        ))}
      </div>

      <LayoutLightbox
        open={lightboxIndex !== null}
        index={lightboxIndex ?? 0}
        onClose={closeLightbox}
        onPrev={lightboxPrev}
        onNext={lightboxNext}
      />
    </>
  );
}
