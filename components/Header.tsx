'use client';
import { useEffect, useState } from 'react';
import { useEnquiry } from './EnquiryContext';
import Logo from './Logo';
import { NAV } from '@/lib/nav';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const { open } = useEnquiry();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on(); window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-6 px-5 backdrop-blur-md transition-all duration-500 sm:px-[clamp(20px,4vw,56px)] ${
          scrolled
            ? 'border-b border-ink/10 bg-ivory/95 py-3.5 text-ink'
            : 'border-b border-white/15 bg-gradient-to-b from-[rgba(12,18,21,0.78)] to-[rgba(12,18,21,0.45)] py-6 text-white [text-shadow:0_1px_12px_rgba(0,0,0,0.35)]'
        }`}
      >
        <a href="#top" aria-label="Hallmark Yula — home"><Logo /></a>
        <nav aria-label="Primary" className="hidden gap-[clamp(18px,2.2vw,34px)] text-xs font-medium uppercase tracking-[0.16em] xl:flex">
          {NAV.map((n) => <a key={n.href} href={n.href} className="opacity-90 hover:opacity-100">{n.label}</a>)}
        </nav>
        <div className="flex shrink-0 items-center gap-2.5">
          <button
            onClick={() => open()}
            className={`flex items-center gap-2.5 whitespace-nowrap border px-3.5 py-3 text-xs font-semibold uppercase tracking-[0.16em] transition hover:-translate-y-px hover:shadow-lg sm:px-[22px] sm:py-[13px] ${
              scrolled ? 'border-ink bg-ink text-ivory' : 'border-ivory bg-ivory text-ink'
            } [text-shadow:none]`}
          >
            <span className="sm:hidden">Enquire</span><span className="hidden sm:inline">Enquire Now</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#C2463B]" />
          </button>
          <button onClick={() => setMenu(true)} aria-label="Open menu" className={`flex h-11 w-11 flex-col items-center justify-center gap-1.5 border xl:hidden ${scrolled ? 'border-ink/30' : 'border-white/45'}`}>
            <span className="h-[1.5px] w-[18px] bg-current" /><span className="h-[1.5px] w-[18px] bg-current" />
          </button>
        </div>
      </header>

      {menu && (
        <div className="fixed inset-0 z-[80] flex flex-col overflow-y-auto bg-ink px-5 pb-8 pt-[22px] text-ivory">
          <div className="flex items-center justify-between">
            <Logo size="sm" />
            <button onClick={() => setMenu(false)} aria-label="Close menu" className="h-11 w-11 border border-ivory/35 text-2xl">×</button>
          </div>
          <nav aria-label="Mobile" className="mt-10 flex flex-col border-t border-ink-line">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setMenu(false)} className="flex items-center justify-between border-b border-ink-line py-5 font-serif text-[32px] text-ivory">
                {n.label}<span className="text-base opacity-60">→</span>
              </a>
            ))}
          </nav>
          <button onClick={() => { setMenu(false); open(); }} className="mt-auto h-14 rounded-full bg-ivory text-xs font-semibold uppercase tracking-[0.22em] text-ink">Enquire Now</button>
        </div>
      )}
    </>
  );
}
