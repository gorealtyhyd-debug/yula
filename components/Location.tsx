import { SITE, mapEmbedUrl, mapLinkUrl } from '@/lib/site';
import SectionLabel from './SectionLabel';

export default function Location() {
  return (
    <section id="location" aria-labelledby="loc-title" className="scroll-mt-[70px] bg-sand px-5 py-[clamp(80px,10vw,140px)] sm:px-[clamp(20px,4vw,56px)]">
      <div className="mx-auto flex max-w-site flex-col gap-11">
        <div className="flex flex-wrap items-end justify-between gap-7">
          <div className="flex flex-col gap-[22px]">
            <SectionLabel>06 — Location</SectionLabel>
            <h2 id="loc-title" className="font-serif text-[clamp(40px,5vw,68px)] font-normal leading-[1.02]">Patighanpur, <em>Hyderabad.</em></h2>
          </div>
          <a href={mapLinkUrl()} target="_blank" rel="noopener" className="flex items-center gap-3.5 rounded-full border border-ink px-[26px] py-4 text-xs font-semibold uppercase tracking-[0.2em] text-ink transition hover:bg-ink hover:text-ivory">
            Get Directions <span className="text-base">↗</span>
          </a>
        </div>
        <div className="relative h-[clamp(380px,55vh,560px)] w-full overflow-hidden bg-[#DCD5C8] shadow-[0_20px_60px_rgba(31,42,46,0.1)]">
          <iframe title="Hallmark Yula location map — Patighanpur, Hyderabad" src={mapEmbedUrl()} loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full border-0 [filter:grayscale(0.35)_contrast(1.02)]" />
        </div>
      </div>
    </section>
  );
}
