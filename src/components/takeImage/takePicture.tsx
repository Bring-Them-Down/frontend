type TakePictureProps = {
  label: string;
  onClick?: () => void;
};

const TakePicture: React.FC<TakePictureProps> = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className='relative flex items-center justify-center font-["Special_Elite"] 
                 text-white text-xl rounded-lg p-4 cursor-pointer min-w-[204px] min-h-[68px] border-2 hover:bg-stone-950/35'
    >
      <span className="pt-1.5">{label}</span>
    </button>
  );
};

export default TakePicture;
