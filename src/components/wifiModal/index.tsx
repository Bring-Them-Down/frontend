import { useEffect, useState } from "react";
import { Modal } from "../modal";
import WifiIcon from "../wifiIcon";

export default function WifiModal() {
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const [items, setItems] = useState<
    {
      id: string;
      name: string;
      stance: string;
    }[]
  >([]);

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

  return (
    <>
      <button
        title="Wifi Devices"
        onClick={() => setIsOpen(true)}
        className="flex flex-row text-xl text-white items-center gap-2 cursor-pointer hover:bg-stone-950/35 p-4 rounded-md border border-gray-200 min-w-[194px] justify-center"
      >
        <WifiIcon height={30} width={30} />
        Wifi Devices
      </button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
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
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-100 text-gray-800 cursor-pointer"
          >
            Close
          </button>
        </div>
      </Modal>
    </>
  );
}
