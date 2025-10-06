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
      ? "text-white bg-green-500/35"
      : currentStatus === "Enemy"
      ? "text-white bg-red-500/35 animate-pulse [animation-duration:0.45s]"
      : currentStatus === "Unknown"
      ? "text-white bg-yellow-500/35"
      : "text-white bg-gray-500/35 pointer-events-none";

  return (
    <div
      className={`relative flex items-center justify-center font-['Special_Elite'] border-white border-2 rounded-lg min-w-[10rem] min-h-[3rem] cursor-pointer overflow-visible ${colorClasses}`}

    >
       <span className="p-2 pt-3">{status}</span> 
    </div>
  );
};

export default DroneStatus;
