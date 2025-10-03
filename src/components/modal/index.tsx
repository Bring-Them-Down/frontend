import { useEffect, useRef } from "react";

export interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, children }: IModalProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      ref.current = null;
      return;
    }

    const handleClickOutside = (event: globalThis.MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] w-full h-full bg-black/40">
      <div
        ref={ref}
        className="fixed z-[10000] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center rounded-lg p-4 md:p-6 bg-white shadow-xl w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 h-[70vh]"
      >
        {children}
      </div>
    </div>
  );
}
