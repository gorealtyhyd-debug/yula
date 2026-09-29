'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const SLIDES = [
  { src: '/assets/images/villas/villa-267-east.jpg', alt: 'Hallmark Yula G+2 villas with landscaped frontage, Patighanpur' },
  { src: '/assets/images/clubhouse/clubhouse-front.jpg', alt: 'Hallmark Yula five-level clubhouse exterior' },
  { src: '/assets/images/villas/villa-500-east.jpg', alt: '500 sq. yds east facing villa at Hallmark Yula' },
];
const STATS = [
  ['22.26', 'Acres'], ['183', 'Villas'], ['267–597', 'Sq. Yds plots'], ['4,052–7,855', 'Sft built-up'], ['₹8,499', 'Per sft onwards'],
];

export default function Hero() {
  const [i, setI] = useState(0);
  const [kb, setKb] = useState(false);
  useEffect(() => {
    const k = setTimeout(() => setKb(true), 60);
    const t = setInterval(() => setI((x) => (x + 1) % SLIDES.length), 6500);
    return () => { clearTimeout(k); clearInterval(t); };
  }, []);

  return (
    <section id="top" aria-label="Hallmark Yula" className="relative h-[100svh] min-h-[620px] overflow-hidden bg-ink text-white">
      {SLIDES.map((s, n) => (
        <Image key={s.src} src={s.src} alt={s.alt} fill priority={n === 0} sizes="100vw" quality={90}
          className={`object-cover transition-[opacity,transform] [transition-duration:1.6s,8s] ease-linear ${n === i ? 'opacity-100' : 'opacity-0'} ${n === i && kb ? 'scale-[1.08]' : 'scale-100'}`} />
      ))}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,22,25,0.55)_0%,rgba(15,22,25,0.05)_32%,rgba(15,22,25,0.15)_55%,rgba(15,22,25,0.82)_100%)]" />

      <div className="absolute inset-x-5 bottom-[118px] flex max-w-[900px] flex-col gap-[18px] sm:inset-x-[clamp(20px,4vw,56px)] sm:bottom-[clamp(150px,20vh,190px)]">
        <p className="flex items-center gap-3.5 text-[11px] font-medium uppercase tracking-[0.34em]"><span className="h-px w-11 bg-accent-coral" />Luxury Villas · Patighanpur, Hyderabad</p>
        <h1 className="font-serif text-[clamp(56px,9vw,132px)] font-normal leading-[0.92] tracking-[-0.01em]">
          Hallmark <em>Yula</em>
          <span className="sr-only"> — 183 luxury villas in Patighanpur, Hyderabad</span>
        </h1>
        <p className="max-w-[520px] text-[clamp(15px,1.3vw,18px)] leading-relaxed text-white/90 [text-wrap:pretty]">
          183 independent G+2 villas across 22.26 acres at Patighanpur, Hyderabad — with a five-level private clubhouse at its heart.
        </p>
      </div>

      <div className="absolute bottom-[96px] right-[clamp(20px,4vw,56px)] hidden gap-2.5 sm:bottom-[clamp(150px,20vh,190px)] sm:flex">
        {SLIDES.map((_, n) => (
          <button key={n} aria-label={`Show slide ${n + 1}`} onClick={() => setI(n)}
            className={`h-0.5 transition-all duration-500 ${n === i ? 'w-11 bg-white' : 'w-[18px] bg-white/45'}`} />
        ))}
      </div>

      <dl className="no-scrollbar absolute inset-x-0 bottom-0 flex overflow-x-auto border-t border-white/20 bg-[rgba(15,22,25,0.28)] backdrop-blur-md">
        {STATS.map(([v, k]) => (
          <div key={k} className="flex flex-none flex-col-reverse gap-1 whitespace-nowrap border-r border-white/15 px-5 py-4 sm:flex-1 sm:px-[clamp(20px,3vw,40px)] sm:py-[22px]">
            <dt className="text-[10px] uppercase tracking-[0.24em] text-white/75">{k}</dt>
            <dd className="font-serif text-[clamp(26px,2.4vw,34px)] leading-none">{v}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
