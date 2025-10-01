import { useState } from "react";
import WifiModal from "./components/wifiModal";
import WifiIcon from "./components/wifiIcon";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <WifiModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onClose={() => setIsOpen(false)}
      />
      <button
        title="Wifi Devices"
        onClick={() => setIsOpen(true)}
        className="flex flex-row items-center gap-2 w-fit cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md border border-gray-200"
      >
        <WifiIcon />
        Wifi Devices
      </button>
    </>
  );
}

export default App;
