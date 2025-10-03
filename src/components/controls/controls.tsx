import ArrowDown from './arrowDown'
import TakePicture from '../takeImage/takePicture'
import ArrowUp from './arrowUp';
import ArrowLeft from './arrowLeft';
import ArrowRight from './arrowRight';

interface ControlProps {
    onClick?: () => void;
}

const Controls = (controlProps: ControlProps) => {


  
  return (
    <div className='flex flex-col items-center justify-center gap-4'>
        <div className='flex justify-between w-full'>
            <TakePicture onClick={controlProps.onClick} />
            <TakePicture onClick={controlProps.onClick} />
        </div>
        <div>
            <div className='flex items-center justify-center'>
            <div><ArrowUp size={80} color='#FFF'/></div>
            </div>
            <div className='flex gap-4'>
            <div><ArrowLeft size={80} color='#FFF'/></div>
            <button className='flex items-center justify-center text-white'>AUTO</button>
            <div><ArrowRight size={80} color='#FFF'/></div>
            </div>
            <div className='flex items-center justify-center'>
            <div><ArrowDown size={80} color='#FFF'/></div>
            </div>
        </div>
    </div>
  )
}

export default Controls