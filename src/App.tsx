import { useState } from "react";
import WifiModal from "./wifiModal";
import WifiIcon from "./wifiIcon";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <WifiModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onClose={() => setIsOpen(false)}
      />
      <button onClick={() => setIsOpen(true)}>
        <WifiIcon />
        Wifi Devices
      </button>
    </>
  );
}

export default App;
