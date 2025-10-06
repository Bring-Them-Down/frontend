import mockVideo from "../../assets/mock-video.mp4";

const VideoPlayer = () => {
  return (
    <video
      id="videoPlayer"
      src={mockVideo}
      autoPlay
      loop
      className="max-w-full h-auto rounded-lg shadow-lg"
      width="1024"
      height="600"
    />
  );
};

export default VideoPlayer;
