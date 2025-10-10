import Shoot from "../controls/shoot";

const ShootDrone: React.FC = () => {
  const handleShootDrone = async () => {
    try {
      await fetch("http://192.168.0.195/fire");
    } catch (error) {
      console.error("Error shooting drone:", error);
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
