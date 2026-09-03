import { ExpandIcon } from '@/components/ui/Icons';

type ImageZoomHintProps = {
  label?: string;
};

export function ImageZoomHint({ label = 'Увеличить' }: ImageZoomHintProps) {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 bg-[#1a1a1a]/0 transition-colors duration-300 group-hover/zoom:bg-[#1a1a1a]/18 group-focus-visible/zoom:bg-[#1a1a1a]/18"
        aria-hidden
      />
      <span className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full border border-white/40 bg-[#1a1a1a]/45 px-2.5 py-1.5 text-[9px] uppercase tracking-[0.16em] text-white backdrop-blur-sm transition-all duration-300 group-hover/zoom:border-white/55 group-hover/zoom:bg-[#1a1a1a]/60 sm:bottom-4 sm:right-4 sm:px-3 sm:py-2 sm:text-[10px]">
        <ExpandIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
        {label}
      </span>
    </>
  );
}
