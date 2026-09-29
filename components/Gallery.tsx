'use client';
import Image from 'next/image';
import { useState } from 'react';
import { GALLERY } from '@/lib/data';
import Lightbox from './Lightbox';
import SectionLabel from './SectionLabel';

export default function Gallery() {
  const [i, setI] = useState<number | null>(null);
  return (
    <section id="gallery" aria-labelledby="gal-title" className="scroll-mt-[70px] bg-ivory px-5 py-[clamp(80px,10vw,140px)] sm:px-[clamp(20px,4vw,56px)]">
      <div className="mx-auto flex max-w-site flex-col gap-11">
        <div className="flex flex-col gap-[22px]">
          <SectionLabel>05 — Gallery</SectionLabel>
          <h2 id="gal-title" className="font-serif text-[clamp(40px,5vw,68px)] font-normal leading-[1.02]">A glimpse of <em>Yula.</em></h2>
        </div>
        <div className="grid auto-rows-[240px] grid-cols-[repeat(auto-fill,minmax(min(100%,280px),1fr))] gap-3.5 [grid-auto-flow:dense]">
          {GALLERY.map((g, n) => (
            <button key={g.src + n} onClick={() => setI(n)}
              className={`group relative cursor-zoom-in overflow-hidden bg-[#E4DED3] ${g.col === 2 ? 'md:col-span-2' : ''} ${g.row === 2 ? 'row-span-2' : ''}`}>
              <Image src={g.src} alt={`${g.t} — Hallmark Yula, Patighanpur, Hyderabad`} fill sizes="(min-width:1024px) 50vw, 100vw" quality={85}
                className="object-cover transition-transform duration-[1.1s] group-hover:scale-105" />
              <span className="absolute bottom-3.5 left-3.5 bg-paper/90 px-3 py-[7px] text-[10px] font-semibold uppercase tracking-[0.2em] text-ink">{g.t}</span>
            </button>
          ))}
        </div>
      </div>
      <Lightbox items={GALLERY} index={i} onClose={() => setI(null)} onIndex={setI} />
    </section>
  );
}
