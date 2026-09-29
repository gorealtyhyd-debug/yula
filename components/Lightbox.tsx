'use client';
import Image from 'next/image';
import { useCallback, useEffect } from 'react';

export type LbItem = { t: string; src: string; white?: boolean };

export default function Lightbox({ items, index, onClose, onIndex }: { items: LbItem[]; index: number | null; onClose: () => void; onIndex: (i: number) => void }) {
  const step = useCallback((d: number) => index !== null && onIndex((index + d + items.length) % items.length), [index, items.length, onIndex]);
  useEffect(() => {
    if (index === null) return;
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1); };
    window.addEventListener('keydown', k);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', k); document.body.style.overflow = ''; };
  }, [index, onClose, step]);
  if (index === null) return null;
  const it = items[index];
  const multi = items.length > 1;
  const nav = 'absolute top-1/2 h-[52px] w-[52px] -translate-y-1/2 border border-ivory/35 bg-[rgba(15,21,24,0.5)] text-xl text-ivory transition hover:bg-ivory hover:text-ink';
  return (
    <div role="dialog" aria-modal="true" aria-label={it.t} className="fixed inset-0 z-[90] flex flex-col bg-[rgba(15,21,24,0.95)] text-ivory">
      <div className="flex items-center justify-between gap-4 px-[clamp(16px,3vw,36px)] py-[18px]">
        <div className="flex items-baseline gap-[18px]">
          <span className="font-serif text-2xl">{it.t}</span>
          {multi && <span className="text-[11px] tracking-[0.2em] text-ivory/60">{index + 1} / {items.length}</span>}
        </div>
        <button onClick={onClose} aria-label="Close" className="h-11 w-11 border border-ivory/35 text-[22px] transition hover:bg-ivory hover:text-ink">×</button>
      </div>
      <div onClick={onClose} className="relative min-h-0 flex-1 px-[clamp(16px,6vw,96px)] pb-7">
        <div className="relative h-full w-full" onClick={(e) => e.stopPropagation()}>
          <Image src={it.src} alt={it.t} fill sizes="100vw" quality={95} className={`object-contain ${it.white ? 'bg-white' : ''}`} />
        </div>
        {multi && (<>
          <button onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Previous" className={`${nav} left-[clamp(8px,2vw,28px)]`}>←</button>
          <button onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Next" className={`${nav} right-[clamp(8px,2vw,28px)]`}>→</button>
        </>)}
      </div>
    </div>
  );
}
