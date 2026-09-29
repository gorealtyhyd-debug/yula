'use client';
import Image from 'next/image';
import { useState } from 'react';
import { AMENITIES, CLUB_SLIDES } from '@/lib/data';
import SectionLabel from './SectionLabel';

const pad = (n: number) => String(n).padStart(2, '0');

export default function Amenities() {
  const [i, setI] = useState(0);
  const go = (d: number) => setI((x) => (x + d + CLUB_SLIDES.length) % CLUB_SLIDES.length);
  const s = CLUB_SLIDES[i];
  const arrow = 'absolute top-1/2 h-12 w-12 -translate-y-1/2 rounded-full border border-ivory/50 bg-[rgba(15,22,25,0.35)] text-lg text-ivory backdrop-blur transition hover:bg-ivory hover:text-ink';

  return (
    <section id="amenities" aria-labelledby="am-title" className="scroll-mt-[70px] bg-ink px-5 py-[clamp(80px,10vw,130px)] text-ivory sm:px-[clamp(20px,4vw,56px)]">
      <div className="mx-auto flex max-w-site flex-col gap-7">
        <div className="flex flex-col gap-[18px]">
          <SectionLabel tone="dark">04 — Amenities</SectionLabel>
          <div className="flex flex-wrap items-end justify-between gap-5">
            <h2 id="am-title" className="font-serif text-[clamp(40px,5vw,68px)] font-normal leading-[1.02]">A clubhouse life, <em>inside the gates.</em></h2>
            <p aria-live="polite" className="text-[13px] tracking-[0.18em] text-ivory/60"><span className="font-semibold text-ivory">{pad(i + 1)}</span> / {pad(CLUB_SLIDES.length)}</p>
          </div>
        </div>

        <div className="relative aspect-[4/5] min-h-[380px] w-full overflow-hidden bg-ink-soft sm:aspect-[4/3] lg:aspect-[16/8]">
          {CLUB_SLIDES.map((x, n) => (
            <Image key={x.src} src={x.src} alt={`${x.t} — Hallmark Yula clubhouse`} fill sizes="(min-width:1280px) 1280px, 100vw" quality={90} loading={n === 0 ? 'eager' : 'lazy'}
              className={`object-cover transition-[opacity,transform] [transition-duration:0.9s,6s] ${n === i ? 'scale-[1.04] opacity-100' : 'scale-100 opacity-0'}`} />
          ))}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,22,25,0.72)_0%,rgba(15,22,25,0.25)_45%,rgba(15,22,25,0)_70%),linear-gradient(0deg,rgba(15,22,25,0.6)_0%,rgba(15,22,25,0)_45%)]" />
          <button onClick={() => go(-1)} aria-label="Previous amenity" className={`${arrow} left-[clamp(12px,2vw,24px)]`}>←</button>
          <button onClick={() => go(1)} aria-label="Next amenity" className={`${arrow} right-[clamp(12px,2vw,24px)]`}>→</button>
          <div className="absolute bottom-[clamp(24px,4vw,48px)] left-[clamp(20px,4vw,48px)] right-[clamp(20px,4vw,48px)] flex max-w-[560px] flex-col items-start gap-3.5">
            <span className="border border-ivory/55 bg-[rgba(15,22,25,0.3)] px-3 py-[7px] text-[10px] font-semibold uppercase tracking-[0.22em]">{s.tag}</span>
            <h3 className="font-serif text-[clamp(36px,4.4vw,60px)] font-normal leading-none">{s.t}</h3>
            <p className="text-sm leading-[1.65] text-ivory/90 [text-wrap:pretty]">{s.d}</p>
          </div>
        </div>

        <div className="no-scrollbar flex gap-2.5 overflow-x-auto sm:grid sm:grid-cols-[repeat(auto-fill,minmax(112px,1fr))]">
          {CLUB_SLIDES.map((x, n) => (
            <button key={x.src} onClick={() => setI(n)} aria-label={x.t} aria-current={n === i}
              className={`relative aspect-[16/10] w-[104px] flex-none overflow-hidden border-2 bg-ink-soft transition sm:w-auto ${n === i ? 'border-ivory opacity-100' : 'border-transparent opacity-55 hover:opacity-100'}`}>
              <Image src={x.src} alt="" fill sizes="140px" className="object-cover" />
            </button>
          ))}
        </div>

        <ul aria-label="Clubhouse amenities" className="flex flex-wrap gap-2.5 border-t border-ink-line pt-[22px]">
          {AMENITIES.map((a) => (
            <li key={a} className="rounded-full border border-ivory/30 px-4 py-[9px] text-xs tracking-[0.04em] text-ivory/90 transition hover:border-ivory hover:bg-ivory hover:text-ink">{a}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
