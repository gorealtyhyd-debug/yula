'use client';
import { createContext, useCallback, useContext, useState } from 'react';
import EnquiryModal from './EnquiryModal';

type Ctx = { open: (size?: number) => void; close: () => void };
const EnquiryCtx = createContext<Ctx>({ open: () => {}, close: () => {} });
export const useEnquiry = () => useContext(EnquiryCtx);

export function EnquiryProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const [size, setSize] = useState<number | undefined>();
  const open = useCallback((s?: number) => { setSize(s); setOpen(true); }, []);
  const close = useCallback(() => setOpen(false), []);
  return (
    <EnquiryCtx.Provider value={{ open, close }}>
      {children}
      <EnquiryModal isOpen={isOpen} initialSize={size} onClose={close} />
    </EnquiryCtx.Provider>
  );
}

export function EnquireButton({ className, children, size }: { className?: string; children: React.ReactNode; size?: number }) {
  const { open } = useEnquiry();
  return (
    <button type="button" onClick={() => open(size)} className={className}>
      {children}
    </button>
  );
}
