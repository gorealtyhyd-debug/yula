'use client';
import Image from 'next/image';
import { useState } from 'react';
import { VILLAS, RATES, crore, inr, type Facing } from '@/lib/data';
import { useEnquiry } from './EnquiryContext';
import Lightbox, { type LbItem } from './Lightbox';
import SectionLabel from './SectionLabel';

export default function Residences() {
  const [si, setSi] = useState(0);
  const [fac, setFac] = useState<Facing>('E');
  const [lb, setLb] = useState<{ items: LbItem[]; i: number } | null>(null);
  const { open } = useEnquiry();

  const T = VILLAS[si];
  const facing: Facing = T[fac] ? fac : 'E';
  const V = T[facing]!;
  const fName = facing === 'E' ? 'East' : 'West';
  const r = RATES[facing];
  const planItems: LbItem[] = V.plans.map((p) => ({ t: `${T.size} Sq. Yds · ${fName} · ${p.label} Plan`, src: p.src, white: true }));
  const specs = [
    ['Plot size', V.plot],
    ['Built-up area', `${inr(V.bua)} Sft`],
    ['Configuration', 'G + 2 with terrace'],
    [`OTP · ₹${inr(r.otp)} / sft`, `${crore(V.bua, r.otp)}*`],
    [`EOI · ₹${inr(r.eoi)} / sft`, `${crore(V.bua, r.eoi)}*`],
  ];

  return (
    <section id="residences" aria-labelledby="res-title" className="scroll-mt-[70px] bg-ivory px-5 py-[clamp(80px,10vw,140px)] sm:px-[clamp(20px,4vw,56px)]">
      <div className="mx-auto flex max-w-site flex-col gap-11">
        <div className="flex flex-wrap items-end justify-between gap-7">
          <div className="flex max-w-[640px] flex-col gap-[22px]">
            <SectionLabel>02 — Residences</SectionLabel>
            <h2 id="res-title" className="font-serif text-[clamp(40px,5vw,68px)] font-normal leading-[1.02]">Six plot sizes. <em>One standard.</em></h2>
          </div>
          <div role="tablist" aria-label="Facing" className="flex border border-ink">
            {(['E', 'W'] as Facing[]).map((k) => {
              const has = !!T[k]; const a = facing === k;
              return (
                <button key={k} role="tab" aria-selected={a} disabled={!has} onClick={() => setFac(k)}
                  className={`px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] transition disabled:cursor-not-allowed disabled:opacity-35 ${a ? 'bg-ink text-ivory' : 'text-ink'}`}>
                  {k === 'E' ? 'East Facing' : 'West Facing'}
                </button>
              );
            })}
          </div>
        </div>

        <div role="tablist" aria-label="Plot size" className="grid grid-cols-3 border-y border-line sm:grid-cols-6">
          {VILLAS.map((t, i) => (
            <button key={t.size} role="tab" aria-selected={i === si} onClick={() => { setSi(i); if (!t[fac]) setFac('E'); }}
              className={`flex flex-col items-start gap-1 px-[18px] py-[22px] text-left transition ${i === si ? 'bg-ink text-ivory' : 'text-ink hover:bg-sand'}`}>
              <span className="font-serif text-4xl leading-none">{t.size}</span>
              <span className="text-[10px] uppercase tracking-[0.2em] opacity-75">Sq. Yds</span>
            </button>
          ))}
        </div>

        <div className="grid items-stretch gap-[clamp(28px,4vw,64px)] xl:grid-cols-[1.45fr_1fr]">
          <button onClick={() => setLb({ items: [{ t: `${T.size} Sq. Yds · ${fName} Facing`, src: V.render }, ...planItems], i: 0 })}
            className="group relative min-h-[320px] cursor-zoom-in overflow-hidden bg-[#E4DED3] sm:min-h-[420px]" aria-label="Enlarge villa render">
            <Image src={V.render} alt={`${T.size} sq. yds ${fName.toLowerCase()} facing villa at Hallmark Yula, Patighanpur`} fill sizes="(min-width:1280px) 58vw, 100vw" quality={90}
              className="object-cover transition-transform duration-[1.2s] group-hover:scale-[1.03]" />
            <span className="absolute bottom-[18px] left-[18px] bg-paper/90 px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-ink">{T.size} Sq. Yds · {fName}</span>
          </button>

          <div className="flex flex-col gap-7">
            <div className="flex flex-col gap-2">
              <p className="text-[11px] uppercase tracking-[0.26em] text-muted">{fName} Facing Villa</p>
              <h3 className="font-serif text-[clamp(44px,4.4vw,60px)] font-normal leading-none">{T.size} <em className="text-[0.5em]">Sq. Yds</em></h3>
            </div>
            <dl className="flex flex-col border-t border-line">
              {specs.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 border-b border-line py-4 text-sm">
                  <dt className="text-muted">{k}</dt><dd className="text-right font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="flex flex-col gap-3">
              <p className="text-[11px] uppercase tracking-[0.24em] text-muted">Floor Plans</p>
              <div className="grid grid-cols-3 gap-2.5">
                {V.plans.map((p, i) => (
                  <button key={p.src} onClick={() => setLb({ items: planItems, i })}
                    className="flex cursor-zoom-in flex-col gap-2 border border-line bg-white p-2 text-left transition hover:-translate-y-0.5 hover:border-ink">
                    <span className="relative block aspect-[4/3] w-full overflow-hidden">
                      <Image src={p.src} alt={`${T.size} sq. yds ${fName.toLowerCase()} facing ${p.label.toLowerCase()} plan`} fill sizes="160px" className="object-cover object-[center_30%]" />
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.18em]">{p.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <button onClick={() => open(T.size)} className="flex items-center justify-between bg-ink px-[22px] py-[18px] text-xs font-semibold uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-accent">
              <span>Enquire for this villa</span><span className="text-lg">→</span>
            </button>
            <p className="text-[11px] text-muted">*Indicative price on built-up area. Taxes, registration and other charges extra.</p>
          </div>
        </div>
      </div>
      <Lightbox items={lb?.items ?? []} index={lb ? lb.i : null} onClose={() => setLb(null)} onIndex={(i) => setLb((s) => (s ? { ...s, i } : s))} />
    </section>
  );
}
