export default function SectionLabel({ children, tone = 'light', center = false }: { children: React.ReactNode; tone?: 'light' | 'dark'; center?: boolean }) {
  const c = tone === 'dark' ? 'text-accent-coral' : 'text-accent';
  const b = tone === 'dark' ? 'bg-accent-coral' : 'bg-accent';
  return (
    <p className={`flex items-center gap-3.5 text-[11px] font-semibold uppercase tracking-[0.3em] ${c} ${center ? 'justify-center' : ''}`}>
      <span className={`h-px w-8 ${b}`} />{children}
    </p>
  );
}
