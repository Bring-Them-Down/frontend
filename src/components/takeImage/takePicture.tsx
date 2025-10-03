type TakePictureProps = {
  label: string;
  onClick?: () => void;
};

const TakePicture: React.FC<TakePictureProps> = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className='relative flex items-center justify-center font-["Special_Elite"] 
                 text-white text-xl rounded-lg px-6 py-5 cursor-pointer min-w-[202px] border-2'
    >
      {label}
    </button>
  );
};

export default TakePicture;
