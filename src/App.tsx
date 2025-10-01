import { useState } from "react";
import WifiModal from "./components/wifiModal";
import WifiIcon from "./components/wifiIcon";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen relative">

      
      {/* Main content area */}
      <div className="min-h-screen flex flex-col items-center justify-center p-8 gap-12">
        {/* Video component container */}
        <div className="flex justify-center items-center">
          <video 
            className="max-w-full h-auto rounded-lg shadow-lg"
            controls
            width="800"
            height="450"
          >
            <source src="#" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        
        {/* Three divs container */}
        <div className="flex justify-center items-stretch gap-8 w-full max-w-6xl flex-wrap">
          <div className="flex-1 min-w-64 p-8 bg-gray-50 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Section 1</h3>
            <p className="text-gray-600 leading-relaxed">Content for first section</p>
          </div>
          <div className="flex-1 min-w-64 p-8 bg-gray-50 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Section 2</h3>
            <p className="text-gray-600 leading-relaxed">Content for second section</p>
          </div>
          <div className="flex-1 min-w-64 p-8 bg-gray-50 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Section 3</h3>
            <p className="text-gray-600 leading-relaxed">Content for third section</p>
          </div>
        </div>
      </div>
      
      {/* WiFi button positioned absolutely */}
      <button 
        className="absolute top-8 right-8 flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
        onClick={() => setIsOpen(true)}
      >
      </button>
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
  );
}

export default App;
