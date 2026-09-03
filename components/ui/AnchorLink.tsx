'use client';

import Link, { type LinkProps } from 'next/link';
import type { ReactNode } from 'react';

type AnchorLinkProps = LinkProps & {
  children: ReactNode;
  className?: string;
};

/** Link without Next.js auto-scroll — position handled by ScrollManager */
export function AnchorLink({ scroll = false, ...props }: AnchorLinkProps) {
  return <Link scroll={scroll} {...props} />;
}
