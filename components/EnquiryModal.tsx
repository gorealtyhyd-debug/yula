'use client';
import { useEffect, useState } from 'react';
import { VILLAS, minPrice, inr } from '@/lib/data';
import Logo from './Logo';
import { SITE } from '@/lib/site';

const BUDGETS = ['₹3.40 – 5.00 Cr', '₹5.00 – 6.50 Cr', '₹6.50 – 8.00 Cr', '₹8.00 Cr & above'];
const label = 'text-[11px] uppercase tracking-[0.22em] text-slate font-medium';
const field = 'h-[54px] w-full border bg-white px-4 text-[15px] text-ink outline-none transition-colors focus:border-ink';

export default function EnquiryModal({ isOpen, initialSize, onClose }: { isOpen: boolean; initialSize?: number; onClose: () => void }) {
  const [f, setF] = useState({ name: '', phone: '', email: '', unit: '267', budget: BUDGETS[0], message: '' });
  const [err, setErr] = useState<'' | 'name' | 'phone' | 'server'>('');
  const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle');

  useEffect(() => {
    if (isOpen) { setState('idle'); setErr(''); if (initialSize) setF((p) => ({ ...p, unit: String(initialSize) })); }
  }, [isOpen, initialSize]);

  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', k);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => window.removeEventListener('keydown', k);
  }, [isOpen, onClose]);

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const v = k === 'phone' ? e.target.value.replace(/\D/g, '').slice(0, 10) : e.target.value;
    setF((p) => ({ ...p, [k]: v })); setErr('');
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!f.name.trim()) return setErr('name');
    if (f.phone.length !== 10) return setErr('phone');
    const summary = `Hallmark Yula enquiry\nName: ${f.name}\nPhone: +91 ${f.phone}\nEmail: ${f.email || '-'}\nUnit: ${f.unit} Sq. Yds\nBudget: ${f.budget}\nMessage: ${f.message || '-'}`;
    // No access key configured → hand off to WhatsApp (fully static, no backend)
    if (!SITE.form.accessKey) {
      window.open(`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(summary)}`, '_blank', 'noopener');
      setState('sent');
      return;
    }
    setState('sending');
    try {
      const r = await fetch(SITE.form.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: SITE.form.accessKey,
          subject: `New enquiry — ${SITE.name} — ${f.unit} Sq. Yds`,
          from_name: SITE.name,
          name: f.name,
          phone: `+91${f.phone}`,
          email: f.email,
          unit: `${f.unit} Sq. Yds`,
          budget: f.budget,
          message: f.message,
        }),
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok || j.success === false) throw new Error();
      setState('sent');
    } catch { setErr('server'); setState('idle'); }
  }

  return (
    <div aria-hidden={!isOpen} className={`fixed inset-0 z-[70] flex items-center justify-center p-3 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}>
      <div onClick={onClose} className="absolute inset-0 bg-ink/40 backdrop-blur-[3px]" />
      <div role="dialog" aria-modal="true" aria-labelledby="enq-title"
        className={`relative max-h-[calc(100vh-32px)] w-full max-w-[500px] overflow-y-auto border border-[#E4DED3] bg-paper shadow-[0_30px_80px_rgba(18,26,29,0.3)] transition-transform duration-500 ${isOpen ? 'scale-100' : 'translate-y-4 scale-[0.97]'}`}>
        <div className="relative px-[clamp(22px,4vw,44px)] pb-8 pt-9">
          <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 h-[42px] w-[42px] rounded-full border border-[#CFC8BB] text-xl text-ink transition hover:border-ink hover:bg-ink hover:text-ivory">×</button>
          <div className="flex flex-col gap-2.5 border-b border-[#E1DBD0] pb-6">
            <Logo size="lg" tone="dark" />
            <span id="enq-title" className="flex items-center gap-2.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-accent">
              <span className="h-px w-[22px] bg-accent" />Enquiry
            </span>
          </div>

          {state !== 'sent' ? (
            <form onSubmit={submit} noValidate className="flex flex-col gap-[22px] pt-[26px]">
              <label className="flex flex-col gap-2.5"><span className={label}>Name</span>
                <input value={f.name} onChange={set('name')} placeholder="Your full name" autoComplete="name" className={`${field} ${err === 'name' ? 'border-accent' : 'border-[#D9D2C5]'}`} /></label>
              <div className="grid gap-[18px] sm:grid-cols-2">
                <label className="flex flex-col gap-2.5"><span className={label}>Number</span>
                  <input value={f.phone} onChange={set('phone')} placeholder="+91 00000 00000" inputMode="numeric" autoComplete="tel-national" className={`${field} ${err === 'phone' ? 'border-accent' : 'border-[#D9D2C5]'}`} /></label>
                <label className="flex flex-col gap-2.5"><span className={label}>Mail</span>
                  <input type="email" value={f.email} onChange={set('email')} placeholder="you@example.com" autoComplete="email" className={`${field} border-[#D9D2C5]`} /></label>
              </div>
              <label className="flex flex-col gap-2.5"><span className={label}>Unit Type</span>
                <select value={f.unit} onChange={set('unit')} className={`${field} border-[#D9D2C5] px-3`}>
                  {VILLAS.map((v) => {
                    const bua = Math.max(...[v.E?.bua, v.W?.bua].filter(Boolean) as number[]);
                    return <option key={v.size} value={v.size}>{v.size} Sq. Yds · {inr(Math.round(bua))} SFT · from ₹{minPrice(v.size).toFixed(2)} Cr</option>;
                  })}
                </select></label>
              <label className="flex flex-col gap-2.5"><span className={label}>Budget Range</span>
                <select value={f.budget} onChange={set('budget')} className={`${field} border-[#D9D2C5] px-3`}>
                  {BUDGETS.map((b) => <option key={b}>{b}</option>)}
                </select></label>
              <label className="flex flex-col gap-2.5"><span className={label}>Message</span>
                <textarea value={f.message} onChange={set('message')} rows={4} placeholder="Anything you'd like us to know" className="w-full resize-y border border-[#D9D2C5] bg-white px-4 py-3.5 text-[15px] text-ink outline-none focus:border-ink" /></label>
              {err && <p role="alert" className="text-xs text-accent">{err === 'name' ? 'Please enter your name.' : err === 'phone' ? 'Please enter a valid 10-digit mobile number.' : 'Something went wrong. Please try again.'}</p>}
              <button type="submit" disabled={state === 'sending'} className="h-[58px] rounded-full bg-ink text-[13px] font-semibold uppercase tracking-[0.24em] text-ivory transition-colors hover:bg-accent disabled:opacity-60">
                {state === 'sending' ? 'Sending…' : 'Submit Enquiry'}
              </button>
              <p className="text-center text-[11px] leading-relaxed text-muted">By submitting, you consent to be contacted by Hallmark regarding Hallmark Yula.</p>
            </form>
          ) : (
            <div className="flex flex-col items-start gap-3.5 pb-1.5 pt-8">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-ink">✓</span>
              <p className="font-serif text-[28px] leading-tight">Thank you, {f.name.trim().split(' ')[0]}.</p>
              <p className="text-sm leading-relaxed text-[#55605F]">Our team will reach you at +91 {f.phone} shortly.</p>
              <button onClick={onClose} className="mt-2 rounded-full border border-ink px-7 py-3.5 text-[11px] uppercase tracking-[0.22em] transition hover:bg-ink hover:text-ivory">Close</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
