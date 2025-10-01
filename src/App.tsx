import { useState } from "react";
import WifiModal from "./components/wifiModal";
import WifiIcon from "./components/wifiIcon";
import DroneStatus from "./components/droneStatus/droneStatus";
import AudioVisualiser from "./components/audioVisualiser";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen relative">
      {/* Main content area */}
      <div className="min-h-screen flex flex-col items-center justify-center p-4 gap-12">
        {/* Video component container */}
        <div className="flex justify-center items-center">
          <video
            className="max-w-full h-auto rounded-lg shadow-lg"
            controls
            width="1024"
            height="600"
          >
            <source src="#" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Three divs container */}
        <div className="flex justify-center items-stretch gap-8 w-full max-w-5xl flex-wrap ">
          <div className="flex-1 p-1 rounded-lg shadow-md text-center justify-center flex w-[256px] items-center">
            <DroneStatus status="Friendly" />
          </div>
          <div className="flex-1 min-w-96 p-1 rounded-lg shadow-md text-center">
            <AudioVisualiser />

          </div>
          <div className="flex-1 p-1 rounded-lg shadow-md text-center flex items-center justify-center flex w-[256px]">
            {/* WiFi button positioned absolutely */}
            <WifiModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
            <button
              title="Wifi Devices"
              onClick={() => setIsOpen(true)}
              className="flex flex-row text-xl text-white items-center gap-2 cursor-pointer hover:bg-black p-4 rounded-md border border-gray-200 min-w-[194px] justify-center"
            >
              <WifiIcon height={30} width={30} />
              Wifi Devices
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
