import { Toaster } from "react-hot-toast";
import LogModal from "./components/logModal";
import DroneStatus from "./components/droneStatus/droneStatus";
import AudioVisualiser from "./components/audioVisualiser";
import Crosshair from "./assets/Crosshair.svg";
import VideoPlayer from "./components/videoPlayer";
import GalleriModal from "./components/galleriModal";
import { FollowCursor } from "./components/followCursor";
import Controls from "./components/controls/controls";
import { AiThing } from "./components/aiThing";
import { Radar } from "./components/radar";

function App() {
  return (
    <div className="min-h-screen relative">
      <div className="min-h-screen flex flex-col items-center justify-center p-4 gap-2">
        <div className="w-full max-w-6xl">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 flex justify-center">
              <div className="relative max-w-4xl w-full">
                <VideoPlayer />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <img
                    src={Crosshair}
                    alt="Crosshair"
                    className="max-w-[10%] max-h-[10%]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl h-full">
            <div className="flex items-center justify-center">
              <div className="flex flex-col w-[8rem] items-center justify-center gap-4">
                  <DroneStatus status="No Signal" />
                  <LogModal />
                  <GalleriModal />
              </div>
              <div className="flex-1 text-center justify-center flex items-center gap-2">
                <Controls />
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="flex-1 min-w-124 p-1 text-center justify-center items-center flex">
                <AudioVisualiser />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <Radar />
            </div>
          </div>
        </div>
      </div>
      <Toaster position="bottom-right" />
      <FollowCursor />
      <AiThing />
    </div>
  );
}

export default App;
