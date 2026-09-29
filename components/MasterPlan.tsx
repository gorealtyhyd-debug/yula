'use client';
import Image from 'next/image';
import { useState } from 'react';
import { MATRIX, RATES, crore, inr } from '@/lib/data';
import Lightbox from './Lightbox';
import SectionLabel from './SectionLabel';

export default function MasterPlan() {
  const [open, setOpen] = useState(false);
  const cols = 'grid min-w-[580px] grid-cols-[0.8fr_1.1fr_0.6fr_0.8fr_0.8fr_0.8fr] gap-1.5 px-5';
  return (
    <section id="masterplan" aria-labelledby="mp-title" className="scroll-mt-[70px] bg-sand px-5 py-[clamp(80px,10vw,140px)] sm:px-[clamp(20px,4vw,56px)]">
      <div className="mx-auto flex max-w-site flex-col gap-12">
        <div className="flex flex-wrap items-end justify-between gap-7">
          <div className="flex max-w-[680px] flex-col gap-[22px]">
            <SectionLabel>03 — Master Plan</SectionLabel>
            <h2 id="mp-title" className="font-serif text-[clamp(40px,5vw,68px)] font-normal leading-[1.02]">22.26 acres, <em>thoughtfully laid.</em></h2>
          </div>
          <p className="max-w-[400px] text-[15px] leading-[1.7] text-slate">An 18 m central boulevard, 12 m internal roads and open-space reserves at every edge — with the clubhouse set within its own green along the western arm.</p>
        </div>
        <div className="grid items-start gap-[clamp(24px,3vw,40px)] lg:grid-cols-2">
          <button onClick={() => setOpen(true)} className="relative cursor-zoom-in bg-white p-4 shadow-[0_20px_60px_rgba(31,42,46,0.08)] transition-shadow hover:shadow-[0_26px_70px_rgba(31,42,46,0.16)]" aria-label="Expand master plan">
            <Image src="/assets/images/master-plan.jpg" alt="Hallmark Yula master plan — 183 villa plots, clubhouse and open spaces, Patighanpur" width={2560} height={1449} sizes="(min-width:1024px) 50vw, 100vw" quality={90} className="h-auto w-full" />
            <span className="absolute bottom-7 right-7 bg-ink px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-ivory">Click to expand</span>
          </button>
          <div className="min-w-0 overflow-x-auto bg-ivory">
            <table className="w-full text-[13px]">
              <caption className="sr-only">Hallmark Yula plot matrix with built-up area and indicative prices</caption>
              <thead>
                <tr className={`${cols} bg-ink py-3.5 text-left text-[10px] font-semibold uppercase tracking-[0.16em] text-ivory`}>
                  <th>Facing</th><th>Plot (m)</th><th>Sq. Yds</th><th>BUA (Sft)</th><th>OTP*</th><th className="text-right">EOI*</th>
                </tr>
              </thead>
              <tbody>
                {MATRIX.map((m, i) => (
                  <tr key={i} className={`${cols} border-b border-[#DDD6CA] py-3 transition-colors hover:bg-paper`}>
                    <td className="text-muted">{m.label}</td><td>{m.plot}</td><td className="font-semibold">{m.sqyd}</td><td>{inr(m.bua)}</td>
                    <td className="font-semibold">{crore(m.bua, RATES[m.facing].otp)}</td><td className="text-right text-muted">{crore(m.bua, RATES[m.facing].eoi)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between px-5 py-4 text-xs font-semibold uppercase tracking-[0.16em]"><span>Total villas</span><span>183</span></div>
            <p className="px-5 pb-4 text-[11px] text-muted">*Indicative on built-up area. OTP ₹8,999 East / ₹8,499 West · EOI ₹10,999 East / ₹10,499 West per sft.</p>
          </div>
        </div>
      </div>
      <Lightbox items={[{ t: 'Master Plan', src: '/assets/images/master-plan.jpg', white: true }]} index={open ? 0 : null} onClose={() => setOpen(false)} onIndex={() => {}} />
    </section>
  );
}
