import { toast } from "react-hot-toast";
import Shoot from "../controls/shoot";



const ShootDrone: React.FC = () => {
  const handleShootDrone = () => {
    try {
      // Simulate drone shooting logic
      console.log("Drone shot initiated!");

      toast.success("Drone Shot!", {
        duration: 3000,
        style: { background: "#333", color: "#fff" },
      });
    } catch (error) {
      console.error("Error shooting drone:", error);
      toast.error("Failed to shoot drone!", {
        duration: 3000,
        style: { background: "#333", color: "#fff" },
      });
    }
  };

  return (
    <button
      onClick={handleShootDrone}
      className='relative flex items-center justify-center font-["Special_Elite"] 
                 text-white text-xl rounded-lg p-2 cursor-pointer border-2 hover:bg-stone-950/35'
    >
      <Shoot color="#fff" size={30} />
    </button>
  );
};

export default ShootDrone;