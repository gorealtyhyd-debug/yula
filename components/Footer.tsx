import { EnquireButton } from './EnquiryContext';
import { NAV } from '@/lib/nav';
import { SITE } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="bg-ink-deep px-5 pb-9 pt-[clamp(60px,8vw,100px)] text-ivory sm:px-[clamp(20px,4vw,56px)]">
      <div className="mx-auto flex max-w-site flex-col gap-14">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="flex flex-col gap-2.5">
            <p className="font-serif text-[clamp(48px,7vw,96px)] leading-[0.9]">Hallmark <em>Yula</em></p>
            <p className="text-[11px] uppercase tracking-[0.3em] text-ivory/70">Patighanpur · Hyderabad</p>
          </div>
          <EnquireButton className="flex items-center gap-[18px] border border-ivory px-[26px] py-[18px] text-xs font-semibold uppercase tracking-[0.2em] transition hover:bg-ivory hover:text-ink">
            Enquire Now <span className="text-lg">→</span>
          </EnquireButton>
        </div>
        <div className="flex flex-wrap justify-between gap-6 border-t border-ink-line pt-7">
          <nav aria-label="Footer" className="flex flex-wrap gap-7 text-[11px] uppercase tracking-[0.18em]">
            {NAV.map((n) => <a key={n.href} href={n.href} className="text-ivory/80 hover:text-white">{n.label}</a>)}
          </nav>
          <p className="text-[11px] text-ivory/55">© {new Date().getFullYear()} {SITE.legalName}. All rights reserved.{SITE.rera ? ` · TS RERA: ${SITE.rera}` : ''}</p>
        </div>
        <p className="max-w-[860px] text-[11px] leading-[1.7] text-ivory/50">
          Disclaimer: This website is meant only for information purposes. It should not be considered/ claimed as an official site. This website belongs to authorized channel partner.
        </p>
      </div>
    </footer>
  );
}
