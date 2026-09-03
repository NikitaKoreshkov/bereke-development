import Image, { type ImageProps } from 'next/image';

type OptimizedImageProps = Omit<ImageProps, 'alt'> & {
  alt: string;
};

export function OptimizedImage({
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  ...props
}: OptimizedImageProps) {
  return <Image sizes={sizes} {...props} />;
}
