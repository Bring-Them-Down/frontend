import { useEffect, useRef, useState } from "react";
import { Toaster } from "react-hot-toast";
import LogModal from "./components/logModal";
import DroneStatus from "./components/droneStatus/droneStatus";
import { type DroneStatusType } from "./components/droneStatus/droneStatus";
import AudioVisualiser from "./components/audioVisualiser";
import VideoPlayer from "./components/videoPlayer";
import GalleriModal from "./components/galleriModal";
import { FollowCursor } from "./components/followCursor";
import Controls from "./components/controls/controls";
import { AiThing } from "./components/aiThing";
import { Radar } from "./components/radar";
import { type VideoPlayerProps } from "./components/videoPlayer";

function App() {
  const wsRef = useRef<WebSocket | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const [videoProps, setVideoProps] = useState<VideoPlayerProps | null>(null);
  const [pingAngle, setPingAngle] = useState<number>(0);
  const [enemyStatus, setEnemyStatus] = useState<DroneStatusType>("NoSignal");

  const resetValues = () => {
    setEnemyStatus("NoSignal");
    setPingAngle(0);
    setVideoProps(null);
  };

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => {
      resetValues();
    }, 5000);
  };

  useEffect(() => {
    abortControllerRef.current = new AbortController();

    const connect = () => {
      wsRef.current = new WebSocket("ws://192.168.0.120:5005/ws");

      wsRef.current.onopen = () => console.log("WebSocket connected");
      wsRef.current.onmessage = (event) => {
        try {
          console.log(event);
          const data = JSON.parse(event.data) as {
            TopLeft?: { X: number; Y: number };
            TopRight?: { X: number; Y: number };
            BottomRight?: { X: number; Y: number };
            BottomLeft?: { X: number; Y: number };
            Direction?: number;
            Status?: DroneStatusType;
            Center?: { X: number; Y: number };
            Type?: "Uknown" | "Camera" | "Audio";
            Id?: number;
          };

          if (!data) return;

          resetTimeout();

          if (
            data.TopLeft !== undefined &&
            data.TopRight !== undefined &&
            data.BottomRight !== undefined &&
            data.BottomLeft !== undefined
          ) {
            setVideoProps({
              TopRight: [data.TopRight.X, data.TopRight.Y],
              TopLeft: [data.TopLeft.X, data.TopLeft.Y],
              BottomRight: [data.BottomRight.X, data.BottomRight.Y],
              BottomLeft: [data.BottomLeft.X, data.BottomLeft.Y],
            });
          }

          if (data.Direction !== undefined) {
            setPingAngle(data.Direction);
          }

          if (data.Status !== undefined) {
            setEnemyStatus(data.Status);
          }
        } catch (error) {
          resetValues();
          console.error("Failed to parse WebSocket message", error);
        }
      };
      wsRef.current.onclose = () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
        resetValues();
        console.log("WebSocket disconnected, attempting to reconnect...");
        setTimeout(connect, 3000);
      };
      wsRef.current.onerror = (err) => {
        console.error("WebSocket error", err);
        if (!wsRef.current) {
          return;
        }
        wsRef.current.close();
      };
    };

    connect();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      wsRef.current?.close();
    };
  }, []);

  return (
    <div className="min-h-screen relative">
      <div className="min-h-screen flex flex-col items-center justify-center p-4 gap-2">
        <div className="w-full max-w-6xl">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 flex justify-center">
              <div className="relative max-w-5xl w-full">
                <VideoPlayer {...videoProps} />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl h-full">
            <div className="flex items-center justify-center">
              <div className="flex flex-col w-[8rem] items-center justify-center gap-4">
                <DroneStatus status={enemyStatus} />
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
              <Radar pingAngle={pingAngle} />
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
