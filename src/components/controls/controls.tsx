import ArrowDown from './arrowDown'
import TakePicture from '../takeImage/takePicture'
import ArrowUp from './arrowUp';
import ArrowLeft from './arrowLeft';
import ArrowRight from './arrowRight';

const Controls = () => {


  
  return (
    <div className='flex flex-col items-center justify-center gap-1 w-[204px]'>
        <div className='flex justify-between w-full'>
            <TakePicture />
            <TakePicture />
        </div>
        <div >
            <div className='flex items-center justify-center cursor-pointer'>
            <div className='hover:scale-120 transition-transform duration-200'><ArrowUp size={80} color='#FFF' hoverColor='#6b7280'/></div>
            </div>
            <div className='flex gap-4 cursor-pointer justify-center items-center'>
            <div className='hover:scale-120 transition-transform duration-200'><ArrowLeft size={80} color='#FFF' hoverColor='#6b7280'/></div>
            <button className='flex items-center justify-center font-[Special_Elite] text-white border-2 rounded-lg border-white w-[60px] h-[60px] cursor-pointer hover:bg-stone-950/35 pt-1'>Auto</button>
            <div className='hover:scale-120 transition-transform duration-200'><ArrowRight size={80} color='#FFF' hoverColor='#6b7280'/></div>
            </div>
            <div className='flex items-center justify-center cursor-pointer'>
            <div className='hover:scale-120 transition-transform duration-200'><ArrowDown size={80} color='#FFF' hoverColor='#6b7280'/></div>
            </div>
        </div>
        <div></div>
    </div>
  )
}

export default Controls