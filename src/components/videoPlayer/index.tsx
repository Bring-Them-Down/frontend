import { useEffect, useRef } from "react";

const VideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const connectWebRTC = async () => {
      if (!videoRef.current) return;

      try {
        const pc = new RTCPeerConnection({
          iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
        });

        pc.addTransceiver("video", { direction: "recvonly" });
        pc.addTransceiver("audio", { direction: "recvonly" });

        pc.ontrack = (event) => {
          if (videoRef.current) {
            videoRef.current.srcObject = event.streams[0];
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
      } catch (_) { return; }
    };

    connectWebRTC();
  }, []);

  return (
    <video
      ref={videoRef}
      id="videoPlayer"
      className="w-full h-auto aspect-video rounded-lg shadow-lg"
      autoPlay
      controls
      playsInline
    />
  );
};

export default VideoPlayer;
