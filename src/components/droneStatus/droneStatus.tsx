import { useEffect, useState } from "react";

type droneStatusType = 'Friendly' | 'Enemy' | 'Unknown' | 'No Signal';

const DroneStatus = ( { status } : { status : droneStatusType } ) => {
    const [currentStatus, setCurrentStatus] = useState(status);

    useEffect(() => {
        setCurrentStatus(status);
    }, [status]);

    const useHoverText = (initialText: string, hoverText: string) => {
          const [isHovered, setIsHovered] = useState(false);
  
        return {
            text: isHovered ? hoverText : initialText,
            onMouseEnter: () => setIsHovered(true),
            onMouseLeave: () => setIsHovered(false)
        };
    }

    const hoverProps = useHoverText(currentStatus, 'Fire!');
  return (
    <>
        {(() => {
            return (
                <button
                    className={`flex items-center justify-center font-['Special_Elite'] text-xl border border-dashed rounded-lg p-4 pt-5 hover:animate-pulse cursor-pointer min-w-[256px] ${
                        currentStatus === 'Friendly' ? 'text-green-500 border-green-500  hover:text-white hover:border-white hover:bg-green-500' :
                        currentStatus === 'Enemy' ? 'text-red-500 border-red-500 hover:text-white hover:border-white hover:bg-red-500' :
                        currentStatus === 'Unknown' ? 'text-yellow-500 border-yellow-500  hover:text-white hover:border-white hover:bg-yellow-500' :
                        'text-gray-500 border-gray-500 pointer-events-none'
                    }`}
                    onMouseEnter={hoverProps.onMouseEnter}
                    onMouseLeave={hoverProps.onMouseLeave}
                >
                    {hoverProps.text}
                </button>
            );
        })()}
    </>
  )
}

export default DroneStatus