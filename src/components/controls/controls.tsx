import ArrowDown from './arrowDown'
import TakePicture from '../takeImage/takePicture'
import ArrowUp from './arrowUp';
import ArrowLeft from './arrowLeft';
import ArrowRight from './arrowRight';
import ShootDrone from '../shootdrone/shootDrone';

const Controls = () => {


  
  return (
    <div className='flex flex-col items-center justify-center gap-4'>
        <div className='flex justify-between w-full'>
            <TakePicture />
            <ShootDrone />
        </div>
        <div>
            <div className='flex items-center justify-center cursor-pointer'>
            <div><ArrowUp size={80} color='#FFF'/></div>
            </div>
            <div className='flex gap-4 cursor-pointer'>
            <div><ArrowLeft size={80} color='#FFF'/></div>
            <button className='flex items-center justify-center font-[Special_Elite] text-white border-2 border-white w-[70px] h-[70px] cursor-pointer hover:bg-stone-950/35'>Auto</button>
            <div><ArrowRight size={80} color='#FFF'/></div>
            </div>
            <div className='flex items-center justify-center cursor-pointer'>
            <div><ArrowDown size={80} color='#FFF'/></div>
            </div>
        </div>
    </div>
  )
}

export default Controls