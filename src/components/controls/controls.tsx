import { useState, useEffect } from 'react';
import ArrowDown from './arrowDown'
import TakePicture from '../takeImage/takePicture'
import ArrowUp from './arrowUp';
import ArrowLeft from './arrowLeft';
import ArrowRight from './arrowRight';
import ShootDrone from '../shootdrone/shootDrone';
import Drone from './drone';

const Controls = () => {
  const [dronePosition, setDronePosition] = useState({ x: 0, y: 0 });

  const moveDrone = (direction: string) => {
    const MOVE_DISTANCE = 1.25; // 1.25rem equivalent
    
    switch(direction) {
      case 'up':
        setDronePosition(prev => ({ ...prev, y: prev.y - MOVE_DISTANCE }));
        break;
      case 'down':
        setDronePosition(prev => ({ ...prev, y: prev.y + MOVE_DISTANCE }));
        break;
      case 'left':
        setDronePosition(prev => ({ ...prev, x: prev.x - MOVE_DISTANCE }));
        break;
      case 'right':
        setDronePosition(prev => ({ ...prev, x: prev.x + MOVE_DISTANCE }));
        break;
    }
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      switch(event.key) {
        case 'ArrowUp':
          moveDrone('up');
          break;
        case 'ArrowDown':
          moveDrone('down');
          break;
        case 'ArrowLeft':
          moveDrone('left');
          break;
        case 'ArrowRight':
          moveDrone('right');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);
  
  return (
    <div className='flex flex-col items-center justify-center w-[12rem]'>
        <div className='flex justify-between w-full'>
            <TakePicture />
            <ShootDrone />
        </div>
        <div >
            <div className='flex items-center justify-center cursor-pointer'>
            <div className='hover:scale-120 transition-transform duration-200'><ArrowUp onClick={() => moveDrone('up')} size={40} color='#FFF' hoverColor='#6b7280'/></div>
            </div>
            <div className='flex cursor-pointer justify-center items-center'>
            <div className='hover:scale-120 transition-transform duration-200'><ArrowLeft onClick={() => moveDrone('left')} size={40} color='#FFF' hoverColor='#6b7280'/></div>
            <button className='flex items-center justify-center font-[Special_Elite] p-2 pt-3 text-white border-2 rounded-lg border-white min-h-[3rem] cursor-pointer hover:bg-stone-950/35'>Auto</button>
            <div className='hover:scale-120 transition-transform duration-200'><ArrowRight onClick={() => moveDrone('right')} size={40} color='#FFF' hoverColor='#6b7280'/></div>
            </div>
            <div className='flex items-center justify-center cursor-pointer'>
            <div className='hover:scale-120 transition-transform duration-200'><ArrowDown onClick={() => moveDrone('down')} size={40} color='#FFF' hoverColor='#6b7280'/></div>
            </div>
        </div>
        <div>
            <Drone 
              size={40} 
              color='#FFF' 
              className='z-100 transition-transform duration-200 absolute top-50 left-25'
              style={{
                transform: `translate(${dronePosition.x}rem, ${dronePosition.y}rem)`
              }}
            />
        </div>
    </div>
  )
}

export default Controls