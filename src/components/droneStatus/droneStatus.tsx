import { useEffect, useState } from "react";

type droneStatusType = 'Friendly' | 'Enemy' | 'Unknown' | 'No Signal';

const DroneStatus = ( { status } : { status : droneStatusType } ) => {
    const [currentStatus, setCurrentStatus] = useState(status);

    useEffect(() => {
        setCurrentStatus(status);
    }, [status]);

  return (
    <>
        <button  className={`flex items-center justify-center font-['Special_Elite'] text-4xl border border-dashed rounded-lg p-4 m-2 cursor-pointer ${
        currentStatus === 'Friendly' ? 'text-green-500 border-green-500' : 
        currentStatus === 'Enemy' ? 'text-red-500 border-red-500 hover:animate-pulse hover:text-white hover:border-white hover:bg-red-500' : 
        currentStatus === 'Unknown' ? 'text-yellow-500 border-yellow-500' : 
        'text-gray-500 border-gray-500'}`}>{currentStatus}</button>
    </>
  )
}

export default DroneStatus