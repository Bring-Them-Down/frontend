import { useEffect, useRef, useState } from "react";
import Crosshair from "../../assets/Crosshair.svg";
const VideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let pc: RTCPeerConnection | null = null;

    const connectWebRTC = async () => {
      if (!videoRef.current) return;

      try {
        pc = new RTCPeerConnection({
          iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
        });

        pc.addTransceiver("video", { direction: "recvonly" });
        pc.addTransceiver("audio", { direction: "recvonly" });

        pc.ontrack = (event) => {
          if (videoRef.current) {
            videoRef.current.srcObject = event.streams[0];
            videoRef.current.onloadeddata = () => {
              setIsLoading(false);
            };
          }
        };

        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);

        const response = await fetch(
          "http://192.168.0.238:8889/mystream/whep",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/sdp",
            },
            body: offer.sdp,
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const answerSdp = await response.text();
        await pc.setRemoteDescription({
          type: "answer",
          sdp: answerSdp,
        });
      } catch (_) {
        return;
      }
    };

    connectWebRTC();

    return () => {
      if (pc) {
        pc.close();
        pc = null;
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setIsLoading(true);
    };
  }, []);

  return (
    <div className="w-full h-full relative group">
      {isLoading && (
        <div className="absolute inset-0 bg-white-500 bg-opacity-50 flex items-center justify-center rounded-2xl">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-2 border-white/30 border-t-white"></div>
            <p className="text-white text-lg font-medium">Loading video...</p>
          </div>
        </div>
      )}
      {!isLoading && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <img
            src={Crosshair}
            alt="Crosshair"
            className="max-w-[10%] max-h-[10%]"
          />
        </div>
      )}
      <video
        ref={videoRef}
        id="videoPlayer"
        className="w-full h-auto aspect-video rounded-2xl"
        autoPlay
        playsInline
        controls
      />
    </div>
  );
};

export default VideoPlayer;
