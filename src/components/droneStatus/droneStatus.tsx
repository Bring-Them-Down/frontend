import { useEffect, useState } from "react";

type DroneStatusType = "Friendly" | "Enemy" | "Unknown" | "No Signal";

const DroneStatus = ({ status }: { status: DroneStatusType }) => {
  const [currentStatus, setCurrentStatus] = useState(status);

  useEffect(() => {
    setCurrentStatus(status);
  }, [status]);

  // Hook to change text on hover
//   const useHoverText = (initialText: string, hoverText: string) => {
//     const [isHovered, setIsHovered] = useState(false);

//     return {
//       text: isHovered ? hoverText : initialText,
//       onMouseEnter: () => setIsHovered(true),
//       onMouseLeave: () => setIsHovered(false),
//     };
//   };


  // Shared color styles
  const colorClasses =
    currentStatus === "Friendly"
      ? "text-white bg-green-500"
      : currentStatus === "Enemy"
      ? "text-white bg-red-500 animate-pulse [animation-duration:0.45s]"
      : currentStatus === "Unknown"
      ? "text-white bg-yellow-500"
      : "text-white bg-gray-500 pointer-events-none";

  return (
    <div
      className={`relative flex items-center justify-center font-['Special_Elite'] rounded-full w-24 h-24 cursor-pointer overflow-visible ${colorClasses}`}

    >
       <span className="p-2">{status}</span> 
    </div>
  );
};

export default DroneStatus;
