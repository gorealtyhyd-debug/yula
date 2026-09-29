import { FAQS } from '@/lib/data';
import SectionLabel from './SectionLabel';

export default function FAQ() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="scroll-mt-[70px] bg-ivory px-5 pb-[clamp(80px,10vw,140px)] sm:px-[clamp(20px,4vw,56px)]">
      <div className="mx-auto grid max-w-site gap-[clamp(32px,5vw,80px)] border-t border-line pt-[clamp(60px,8vw,100px)] lg:grid-cols-[1fr_1.6fr]">
        <div className="flex flex-col gap-[22px]">
          <SectionLabel>FAQ</SectionLabel>
          <h2 id="faq-title" className="font-serif text-[clamp(36px,4vw,56px)] font-normal leading-[1.05]">Hallmark Yula, <em>answered.</em></h2>
        </div>
        <div className="flex flex-col border-t border-line">
          {FAQS.map((f, i) => (
            <details key={f.q} open={i === 0} className="group border-b border-line py-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-serif text-[24px] leading-snug [&::-webkit-details-marker]:hidden">
                <h3 className="font-normal">{f.q}</h3>
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-line text-lg transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-4 max-w-[680px] text-[15px] leading-[1.8] text-slate">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
