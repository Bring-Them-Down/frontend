import { toast } from "react-hot-toast";

type TakePictureProps = {
  label: string;
};

const TakePicture: React.FC<TakePictureProps> = ({ label }) => {
  const handleTakePicture = () => {
    try {
      const video = document.getElementById("videoPlayer") as HTMLVideoElement;
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!video) {
        throw new Error("Video element not found");
      }

      const frameData = ctx?.getImageData(
        0,
        0,
        video.videoWidth,
        video.videoHeight
      );

      console.log(frameData);

      toast.success("Picture Taken!", {
        duration: 3000,
        style: { background: "#333", color: "#fff" },
      });
    } catch (error) {
      console.error("Error taking picture:", error);
      toast.error("Failed to take picture!", {
        duration: 3000,
        style: { background: "#333", color: "#fff" },
      });
    }
  };

  return (
    <button
      onClick={handleTakePicture}
      className='relative flex items-center justify-center font-["Special_Elite"] 
                 text-white text-xl rounded-lg p-4 cursor-pointer min-w-[204px] min-h-[68px] border-2 hover:bg-stone-950/35'
    >
      <span className="pt-1.5">{label}</span>
    </button>
  );
};

export default TakePicture;
