import ArrowDown from './SvgComponents/arrowDown'
import TakePicture from '../takeImage/takePicture'
import ArrowUp from './SvgComponents/arrowUp';
import ArrowLeft from './SvgComponents/arrowLeft';
import ArrowRight from './SvgComponents/arrowRight';




const Controls = () => {
  
  return (
    <div className='flex flex-col items-center justify-center gap-4'>
        <div className='flex justify-between w-full'>
            <TakePicture  />
            {/* <DroneShooting /> */}
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