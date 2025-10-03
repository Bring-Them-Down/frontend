import { useEffect, useState } from "react";

type DroneStatusType = "Friendly" | "Enemy" | "Unknown" | "No Signal";

const DroneStatus = ({ status }: { status: DroneStatusType }) => {
  const [currentStatus, setCurrentStatus] = useState(status);

  useEffect(() => {
    setCurrentStatus(status);
  }, [status]);

  // Hook to change text on hover
  const useHoverText = (initialText: string, hoverText: string) => {
    const [isHovered, setIsHovered] = useState(false);

    return {
      text: isHovered ? hoverText : initialText,
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false),
    };
  };

  const hoverProps = useHoverText(currentStatus, "Fire!");

  // Shared color styles
  const colorClasses =
    currentStatus === "Friendly"
      ? "text-green-500 hover:text-white hover:bg-green-500"
      : currentStatus === "Enemy"
      ? "text-red-500 hover:text-white hover:bg-red-500"
      : currentStatus === "Unknown"
      ? "text-yellow-500 hover:text-white hover:bg-yellow-500"
      : "text-gray-500 pointer-events-none";

  return (
    <button
      className={`relative flex items-center justify-center border-2 border-dashed font-['Special_Elite'] text-xl rounded-lg px-6 py-5 cursor-pointer min-w-[202px] max-h-[74px] overflow-visible hover:animate-pulse hover:[animation-duration:0.45s] ${colorClasses}`}
      onMouseEnter={hoverProps.onMouseEnter}
      onMouseLeave={hoverProps.onMouseLeave}
    >
        {hoverProps.text}
    </button>
  );
};

export default DroneStatus;
