import { useEffect, useRef, useState } from "react";

export interface IWifiModalProps {
  isOpen: boolean;
  setIsOpen: (i: boolean) => void;
  onClose: () => void;
}

export default function WifiModal({
  isOpen,
  setIsOpen,
  onClose,
}: IWifiModalProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<
    {
      id: string;
      name: string;
      stance: string;
    }[]
  >([]);

  useEffect(() => {
    if (!isOpen) {
      ref.current = null;
      setIsOpen(false);
      return;
    }

    const handleClickOutside = (event: globalThis.MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setItems([
        {
          id: "1",
          name: "Device 1",
          stance: "Friendly",
        },
        {
          id: "2",
          name: "Device 2",
          stance: "Hostile",
        },
      ]);
    }, 2000);
  }, [isOpen]);

  const getStanceClasses = (stance: string) => {
    const s = stance?.toLowerCase();
    if (s === "friendly") return "bg-green-500 border-green-600";
    if (s === "hostile") return "bg-red-500 border-red-600";
    return "bg-gray-300 border-gray-400";
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] w-full h-full bg-black/40">
      <div
        ref={ref}
        className="fixed z-[10000] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center rounded-lg p-4 md:p-6 bg-white shadow-xl w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 h-[70vh]"
      >
        {loading ? (
          <div className="p-2.5 w-full h-[90%] flex items-center justify-center flex-col gap-3">
            <span className="inline-block w-12 h-12 rounded-full border-4 border-gray-300 border-b-transparent animate-spin"></span>
            <p className="text-gray-700">Loading devices...</p>
          </div>
        ) : (
          <div className="p-2.5 w-full h-[90%] flex flex-col">
            <div className="pb-2 mb-2 border-b text-xs uppercase tracking-wide text-gray-500 w-full flex flex-row justify-between items-center">
              <span className="w-12">ID</span>
              <span className="flex-1 px-3">Name</span>
              <span className="min-w-[110px] text-right">Stance</span>
            </div>
            <div className="flex-1 overflow-y-auto divide-y">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="py-3 w-full flex flex-row justify-between items-center"
                >
                  <p className="text-sm text-gray-600 w-12">{item.id}</p>
                  <p className="flex-1 px-3 font-medium text-gray-800 truncate">
                    {item.name}
                  </p>
                  <p className="flex flex-row items-center gap-2 min-w-[110px] justify-end">
                    <span className="text-sm text-gray-700">{item.stance}</span>
                    <span
                      className={`w-3 h-3 rounded-full border ${getStanceClasses(
                        item.stance
                      )}`}
                      aria-label={`${item.stance} indicator`}
                      title={item.stance}
                    />
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="p-2.5 w-full h-[10%] flex flex-row justify-end items-center">
          <button
            title="Close"
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-100 text-gray-800 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
