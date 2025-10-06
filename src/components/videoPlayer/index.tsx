const VideoPlayer = () => {
  return (
    <iframe
      id="videoPlayer"
      src={"http://192.168.0.238:8889/mystream/"}
      className="w-full h-auto aspect-video rounded-lg shadow-lg"
    />
  );
};

export default VideoPlayer;
