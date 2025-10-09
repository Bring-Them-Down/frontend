import { toast } from "react-hot-toast";
import Camera from "../controls/camera";

const TakePicture: React.FC = () => {
  const handleTakePicture = async () => {
    try {
      const video = document.getElementById("videoPlayer") as HTMLVideoElement;
      
      if (!video) {
        throw new Error("Video element not found");
      }

      // Create canvas and set dimensions to match video
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      
      if (!ctx) {
        throw new Error("Could not get canvas context");
      }

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw the current video frame to canvas
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert canvas to base64 string
      const base64Data = canvas.toDataURL("image/jpeg", 0.8); // 0.8 quality for JPEG
      
      // Remove the data:image/jpeg;base64, prefix to get just the base64 string
      const base64String = base64Data.split(',')[1];

      // Create the image object to send
      const imageData = {
        FileName: `drone_capture_${new Date().toISOString().replace(/[:.]/g, '-')}.jpg`,
        ContentType: "image/jpeg",
        Data: base64String
      };

      console.log('Sending image data:', {
        ...imageData,
        Data: `${base64String.substring(0, 50)}...` // Log first 50 chars of base64
      });

      // Send to backend
      const response = await fetch('https://localhost:7078/image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(imageData)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Backend error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}. Response: ${errorText}`);
      }

      toast.success("Picture taken and saved!", {
        duration: 3000,
        style: { background: "#333", color: "#fff" },
      });

    } catch (error) {
      console.error("Error taking picture:", error);
      
      let errorMessage = "Failed to take picture!";
      if (error instanceof Error) {
        if (error.message.includes('Failed to fetch')) {
          errorMessage = "Failed to save picture - check if backend is running";
        } else {
          errorMessage = `Failed to take picture: ${error.message}`;
        }
      }
      
      toast.error(errorMessage, {
        duration: 4000,
        style: { background: "#333", color: "#fff" },
      });
    }
  };

  return (
    <button
      onClick={handleTakePicture}
      className='relative flex items-center justify-center font-["Special_Elite"] 
                 text-white text-xl rounded-lg p-2 cursor-pointer border-2 hover:bg-stone-950/35'
    >
    <Camera color="#fff" size={30}/>
    </button>
  );
};

export default TakePicture;
