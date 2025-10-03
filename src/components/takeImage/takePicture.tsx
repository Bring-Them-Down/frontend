import Camera from "../controls/camera";

type TakePictureProps = {
  onClick?: () => void;
};

const TakePicture: React.FC<TakePictureProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className='relative flex items-center justify-center font-["Special_Elite"] 
                 text-white text-xl rounded-lg p-4 cursor-pointer border-2 hover:bg-stone-950/35'
    >
    <Camera color="#fff" size={40}/>
    </button>
  );
};

export default TakePicture;
