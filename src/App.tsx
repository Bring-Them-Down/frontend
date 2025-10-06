import { useState } from "react";
import LogModal from "./components/logModal";
import DroneStatus from "./components/droneStatus/droneStatus";
import AudioVisualiser from "./components/audioVisualiser";
import Crosshair from "./assets/Crosshair.svg";
import VideoPlayer from "./components/videoPlayer";
import GalleriModal from "./components/galleriModal";
import { FollowCursor } from "./components/followCursor";
import Controls from "./components/controls/controls";
import { Toaster } from "react-hot-toast";
import { AiThing } from "./components/aiThing";

function App() {
  const [activeSide, setActiveSide] = useState<"left" | "right" | null>(null);

  return (
    <div className="min-h-screen relative">
      {/* Main content area */}
      <div className="min-h-screen flex flex-col items-center justify-center p-4 gap-2">
        <div className="w-full max-w-6xl">
          {/* Video + overlay container */}
          <div className="flex justify-center items-center">
            <div className="relative w-full">
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
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-6xl h-full">
            {/* Left Column */}
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="flex-1 mt-8 rounded-lg text-center justify-center flex w-[12.8rem] items-center">
                <Controls />
              </div>
              <div className="flex-1 p-1 rounded-lg text-center flex items-center justify-center w-[12.8rem]"></div>
            </div>

            {/* Center Column */}
            <div className="flex items-center justify-center">
              <div className="flex-1 min-w-124 p-1 rounded-lg text-center justify-center items-center flex">
                <AudioVisualiser setActiveSide={setActiveSide} />
              </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col items-center justify-center gap-2">
              <DroneStatus status="Enemy" />
              {/* WiFi button positioned absolutely */}
              <LogModal />
              <GalleriModal />
              <AiThing />
            </div>
          </div>
        </div>
      </div>
      {/* Toaster */}
      <Toaster position="bottom-right" />
      <FollowCursor />
    </div>
  );
}

export default App;
