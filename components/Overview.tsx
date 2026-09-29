import Image from 'next/image';
import SectionLabel from './SectionLabel';

const STATS = [['G+2', 'Villas with private lift'], ['12', 'Plot configurations'], ['18 m', 'Central boulevard'], ['20', 'Clubhouse amenities']];

export default function Overview() {
  return (
    <section id="overview" aria-labelledby="overview-title" className="scroll-mt-[70px] bg-ivory px-5 py-[clamp(80px,11vw,150px)] sm:px-[clamp(20px,4vw,56px)]">
      <div className="mx-auto grid max-w-site items-start gap-[clamp(40px,6vw,96px)] lg:grid-cols-2">
        <div className="flex flex-col gap-[26px]">
          <SectionLabel>01 — Overview</SectionLabel>
          <h2 id="overview-title" className="font-serif text-[clamp(40px,5vw,68px)] font-normal leading-[1.02] tracking-[-0.01em] [text-wrap:balance]">
            Quiet streets. Generous plots. A home that rises on three levels.
          </h2>
        </div>
        <div className="flex flex-col gap-9 lg:pt-[58px]">
          <p className="text-[17px] leading-[1.8] text-slate [text-wrap:pretty]">
            Hallmark Yula is a gated community of independent villas at Patighanpur, Hyderabad, planned along 18 m and 12 m tree-lined avenues, with landscaped open spaces woven between every block. Each villa is a G+2 residence with a private lift, a sunlit terrace and plots ranging from 267 to 597 square yards — east and west facing.
          </p>
          <dl className="grid grid-cols-2 border-t border-line">
            {STATS.map(([v, k]) => (
              <div key={k} className="flex flex-col-reverse gap-1.5 border-b border-line py-6">
                <dt className="text-[11px] uppercase tracking-[0.2em] text-muted">{k}</dt>
                <dd className="font-serif text-[44px] leading-none">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <div className="mx-auto mt-[clamp(60px,8vw,110px)] grid max-w-site gap-[clamp(10px,1.4vw,16px)] sm:grid-cols-[1.6fr_1fr]">
        <div className="group relative aspect-[16/10] overflow-hidden">
          <Image src="/assets/images/villas/villa-325-east.jpg" alt="325 sq. yds east facing villa elevation, Hallmark Yula" fill sizes="(min-width:640px) 60vw, 100vw" quality={90} className="object-cover transition-transform duration-[1.2s] group-hover:scale-[1.04]" />
        </div>
        <div className="grid grid-cols-2 grid-rows-[160px] gap-[clamp(10px,1.4vw,16px)] sm:grid-cols-1 sm:grid-rows-2">
          <div className="group relative overflow-hidden"><Image src="/assets/images/clubhouse/clubhouse-front.jpg" alt="Hallmark Yula clubhouse" fill sizes="(min-width:640px) 38vw, 50vw" className="object-cover transition-transform duration-[1.2s] group-hover:scale-105" /></div>
          <div className="group relative overflow-hidden"><Image src="/assets/images/clubhouse/swimming-pool.jpg" alt="Clubhouse swimming pool" fill sizes="(min-width:640px) 38vw, 50vw" className="object-cover transition-transform duration-[1.2s] group-hover:scale-105" /></div>
        </div>
      </div>
    </section>
  );
}
