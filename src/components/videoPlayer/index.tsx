const VideoPlayer = () => {
  return (
    <iframe
      id="videoPlayer"
      src={"http://192.168.0.238:8889/mystream/"}
      className="max-w-full h-auto rounded-lg shadow-lg"
      width="1024"
      height="600"
    />
  );
};

export default VideoPlayer;
