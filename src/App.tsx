import { useState, useEffect } from "react";
import WifiModal from "./components/wifiModal";
import DroneStatus from "./components/droneStatus/droneStatus";
import { Toaster, toast } from "react-hot-toast";
import AudioVisualiser from "./components/audioVisualiser";
import Crosshair from "./assets/Crosshair.svg";
import TakePicture from "./components/takeImage/takePicture";

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
              <video
                className="max-w-full h-auto rounded-lg shadow-lg"
                controls
                width="1024"
                height="600"
              >
                <source src="#" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
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
        <div className="flex justify-center items-stretch gap-8 w-full max-w-5xl flex-wrap ">
          <div className="flex-1 p-1 rounded-lg text-center justify-center flex w-[256px] items-center">
            <DroneStatus status="Enemy" />
            <TakePicture label='Take Picture' onClick={handleTakePicture} />
          </div>
          <div className="flex-1 min-w-96 p-1 rounded-lg text-center">
            <AudioVisualiser />
          </div>
          <div className="flex-1 p-1 rounded-lg text-center flex items-center justify-center w-[256px]">
            {/* WiFi button positioned absolutely */}
            <WifiModal />
          </div>
        </div>
      </div>
      {/* Toaster */}
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;
