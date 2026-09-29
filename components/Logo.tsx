export default function Logo({ size = 'md', tone = 'light' }: { size?: 'sm' | 'md' | 'lg'; tone?: 'light' | 'dark' }) {
  const s = { sm: 'text-[22px]', md: 'text-[22px] sm:text-[28px]', lg: 'text-[34px]' }[size];
  return (
    <span className={`flex flex-col gap-0.5 ${tone === 'dark' ? 'text-ink' : ''}`}>
      <span className={`whitespace-nowrap font-serif font-medium leading-none tracking-[0.02em] ${s}`}>
        Hallmark <em>Yula</em>
      </span>
      <span className="whitespace-nowrap text-[9px] uppercase tracking-[0.24em] opacity-80 sm:tracking-[0.34em]">Patighanpur · Hyderabad</span>
    </span>
  );
}
