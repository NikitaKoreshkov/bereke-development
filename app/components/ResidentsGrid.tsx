'use client';

import styles from '@/components/ui/residents-marquee.module.css';
import { useSiteContent } from '@/lib/content-context';

export default function ResidentsGrid() {
  const { residents: allResidents } = useSiteContent();
  const residents = allResidents
    .filter((i) => i.visible)
    .sort((a, b) => a.order - b.order)
    .map((i) => i.name);

  return (
    <div className="mt-12 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
      {residents.map((name) => (
        <div key={name} className={`${styles.card} ${styles.gridCard} h-24 sm:h-28`}>
          {name}
        </div>
      ))}
    </div>
  );
}
