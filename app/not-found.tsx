import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-ivory px-6 text-center">
      <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">404</p>
      <h1 className="font-serif text-[clamp(40px,6vw,72px)] font-normal leading-none">Page not found</h1>
      <Link href="/" className="rounded-full border border-ink px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] transition hover:bg-ink hover:text-ivory">Back to Hallmark Yula</Link>
    </main>
  );
}
