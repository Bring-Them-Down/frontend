import { useState, useEffect } from "react";
import WifiModal from "./components/wifiModal";
import DroneStatus from "./components/droneStatus/droneStatus";
import { Toaster, toast } from "react-hot-toast";
import AudioVisualiser from "./components/audioVisualiser";
import Crosshair from "./assets/Crosshair.svg";
import VideoPlayer from "./components/videoPlayer";
import TakePicture from "./components/takeImage/takePicture";
import GalleriModal from "./components/galleriModal";

function App() {
  const [activeSide, setActiveSide] = useState<"left" | "right" | null>(null);

  useEffect(() => {
    // Mockdata alternates every 2 seconds.
    // Replace setInterval with real mic data.
    const interval = setInterval(() => {
      setActiveSide((prev) => (prev === "left" ? "right" : "left"));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // Toast logic here
    const handleTakePicture = () => {
    toast.success("Picture Taken!", {
      duration: 3000,
      style: { background: "#333", color: "#fff" },
    });
  };

  return (
    <div className="min-h-screen relative">
      {/* Main content area */}
      <div className="min-h-screen flex flex-col items-center justify-center p-4 gap-12">
        <div>
          {/* Video + overlay container */}
          <div className="flex justify-center items-center">
            <div className="relative">
              <VideoPlayer />

              {/* Crosshair */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <img
                  src={Crosshair}
                  alt="Crosshair"
                  className="max-w-[10%] max-h-[10%]"
                />
              </div>
              {/* Direction alerts */}
              {activeSide === "right" && (
                <div className="absolute inset-y-0 right-0 w-[10%] h-[100%] pointer-events-none bg-[radial-gradient(ellipse_at_right_center,rgba(249,115,22,1)_10%,rgba(249,115,22,0)_72%)]"></div>
              )}
              {activeSide === "left" && (
                <div className="absolute inset-y-0 left-0 w-[10%] h-[100%] pointer-events-none bg-[radial-gradient(ellipse_at_left_center,rgba(249,115,22,1)_10%,rgba(249,115,22,0)_72%)]"></div>
              )}
            </div>
          </div>
        </div>
        {/* Three divs container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-5xl h-full">
          {/* Left Column */}
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex-1 p-1 rounded-lg text-center justify-center flex w-[256px] items-center">
              <DroneStatus status="Enemy" />
            </div>
            <div className="flex-1 p-1 rounded-lg text-center flex items-center justify-center flex w-[256px]">
              {/* WiFi button positioned absolutely */}
              <WifiModal />
            </div>
            <TakePicture label='Take Picture' onClick={handleTakePicture} />
          </div>

          {/* Center Column */}
          <div className="flex items-center justify-center">
            <div className="flex-1 min-w-96 p-1 rounded-lg text-center">
              <AudioVisualiser />
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col items-center justify-center gap-4">
            <button
              title="Button 1"
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 w-[194px] h-[64px]"
            >
              Take picture
            </button>
            <button
              title="Button 2"
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 w-[194px] h-[64px]"
            >
              Gallery
            </button>
          </div>
        </div>
      </div>
      {/* Toaster */}
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;
