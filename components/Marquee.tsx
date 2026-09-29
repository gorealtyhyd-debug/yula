import { AMENITIES } from '@/lib/data';

export default function Marquee() {
  const items = [...AMENITIES, ...AMENITIES];
  return (
    <div aria-hidden="true" className="overflow-hidden border-t border-ink-line bg-ink py-[26px] text-ivory">
      <div className="flex w-max animate-marquee motion-reduce:animate-none">
        {items.map((a, i) => (
          <span key={i} className={`flex items-center gap-10 whitespace-nowrap pr-10 font-serif text-[28px] ${i % 2 ? 'italic' : ''}`}>
            {a}<span className="h-1.5 w-1.5 rounded-full bg-accent-coral" />
          </span>
        ))}
      </div>
    </div>
  );
}
