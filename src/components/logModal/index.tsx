import { useEffect, useState } from "react";
import { Modal } from "../modal";

export type Log = {
  LogId: number;
  Timestamp: Date;
  DeviceId: number;
  Device?: Device;
  KnownId: number;
  Known?: Known;
  CaptureId?: number;
  Capture?: Capture;
};

export type Device = {
  DeviceId: number;
  Name: string;
}
export type Known = {
  KnownId: number;
  isAllied: number;
}
export type Capture = {
  DeviceId: number;
  Name: string;
}

export default function LogModal() {
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const [items, setItems] = useState<Log[]>([]);



  const fetchLogs = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://localhost:7078/log');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: Log[] = await response.json();
      
      // Convert Timestamp strings to Date objects if needed
      const processedData = data.map(log => ({
        ...log,
        Timestamp: new Date(log.Timestamp)
      }));
      
      setItems(processedData);
    } catch (error) {
      console.error('Error fetching logs:', error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    fetchLogs();
  }, [isOpen]);

  // const getStanceClasses = (stance: string) => {
  //   const s = stance?.toLowerCase();
  //   if (s === "friendly") return "bg-green-500 border-green-600";
  //   if (s === "hostile") return "bg-red-500 border-red-600";
  //   return "bg-gray-300 border-gray-400";
  // };

  return (
    <>
      <button
        title="Logs"
        onClick={() => setIsOpen(true)}
        className="flex flex-row text-white items-center gap-2 cursor-pointer hover:bg-stone-950/35 font-['Special_Elite'] rounded-md border-2 border-gray-200 min-w-[6rem] min-h-[3rem] justify-center"
      >
        <span className="p-2 pt-3">Logs</span>
      </button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} styles={{ height: "80%", width: "80%" }}>
        {loading ? (
          <div className="p-2.5 w-full h-[90%] flex items-center justify-center flex-col gap-3">
            <span className="inline-block w-12 h-12 rounded-full border-4 border-gray-300 border-b-transparent animate-spin"></span>
            <p className="text-gray-700">Loading logs...</p>
          </div>
        ) : (
          <div className="p-2.5 w-full h-[90%] flex flex-col">
            <div className="pb-2 mb-2 border-b text-xs uppercase tracking-wide text-gray-500 w-full flex flex-row justify-between items-center">
              <span className="w-12">ID</span>
              <span className="w-12 text-left">Time</span>
              <span className="flex-1 px-3">Device Id</span>
              <span className="flex-1 px-3">Device</span>
              <span className="flex-1 px-3">Known Id</span>
              <span className="flex-1 px-3">Known</span>
              <span className="flex-1 px-3">Capture Id</span>
              <span className="flex-1 px-3">Capture</span>
            </div>
            <div className="flex-1 overflow-y-auto divide-y">
              {items.map((item) => (
                <div
                  key={item.LogId}
                  className="py-3 w-full flex flex-row justify-between items-center"
                >
                  <p className="text-sm text-gray-600 w-12">{item.LogId}</p>

                  <p className="text-sm text-gray-600 w-12 text-left">
                    {item.Timestamp.toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
                  </p>

                  <p className="flex-1 px-3 font-medium text-gray-800 truncate">
                    {item.DeviceId  ?? `No id`}
                  </p>
                  <p className="flex-1 px-3 font-medium text-gray-800 truncate">
                    {item.Device?.Name ?? `Device`}
                  </p>
                  <p className="flex-1 px-3 font-medium text-gray-800 truncate">
                    {item.KnownId  ?? `No id`}
                  </p>
                  <p className="flex-1 px-3 font-medium text-gray-800 truncate">
                    {item.Known ? (item.Known.isAllied ? "Friendly" : "Hostile") : "Unknown"}
                  </p>
                  <p className="flex-1 px-3 font-medium text-gray-800 truncate">
                    {item.CaptureId ?? `No id`}
                  </p>
                  <p className="flex-1 px-3 font-medium text-gray-800 truncate">
                    {item.Capture?.Name ?? `Capture`}
                  </p>

                  {/* <p className="flex flex-row items-center gap-2 min-w-[5.625rem] justify-end">
                    <span className="text-sm text-gray-700">
                      {item.Known?.isAllied ? "Friendly" : "Hostile"}
                    </span>
                    <span
                      className={`w-3 h-3 rounded-full border ${getStanceClasses(
                        item.Known?.isAllied ? "Friendly" : "Hostile"
                      )}`}
                      aria-label={`${item.Known?.isAllied ? "Friendly" : "Hostile"} indicator`}
                      title={item.Known?.isAllied ? "Friendly" : "Hostile"}
                    />
                  </p> */}
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
