import { useState } from "react";
import WifiModal from "./components/wifiModal";
import WifiIcon from "./components/wifiIcon";
import DroneStatus from "./components/droneStatus/droneStatus";

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
        <div className="flex justify-center items-stretch gap-8 w-full max-w-5xl flex-wrap">
          <div className="flex-1 min-w-40 p-4 bg-gray-50 rounded-lg shadow-md text-center items-center justify-center flex">
            <DroneStatus status="No Signal" />
          </div>
          <div className="flex-1 min-w-100 p-4 bg-gray-50 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Section 2</h3>
            <p className="text-gray-600 leading-relaxed">Content for second section</p>
          </div>
          <div className="flex-1 min-w-40 p-4 bg-gray-50 rounded-lg shadow-md text-center flex items-center justify-center">
            {/* WiFi button positioned absolutely */}
            <WifiModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
            <button
              title="Wifi Devices"
              onClick={() => setIsOpen(true)}
              className="flex flex-row items-center gap-2 w-fit cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md border border-gray-200"
            >
              <WifiIcon />
              Wifi Devices
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
