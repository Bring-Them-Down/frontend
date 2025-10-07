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
  const [pressedKeys, setPressedKeys] = useState({
    up: false,
    down: false,
    left: false,
    right: false
  });

  const moveDrone = (direction: string) => {
    const MOVE_DISTANCE = 1.25;
    
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
    const handleKeyDown = (event: KeyboardEvent) => {
      switch(event.key) {
        case 'ArrowUp':
          moveDrone('up');
          setPressedKeys(prev => ({ ...prev, up: true }));
          break;
        case 'ArrowDown':
          moveDrone('down');
          setPressedKeys(prev => ({ ...prev, down: true }));
          break;
        case 'ArrowLeft':
          moveDrone('left');
          setPressedKeys(prev => ({ ...prev, left: true }));
          break;
        case 'ArrowRight':
          moveDrone('right');
          setPressedKeys(prev => ({ ...prev, right: true }));
          break;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      switch(event.key) {
        case 'ArrowUp':
          setPressedKeys(prev => ({ ...prev, up: false }));
          break;
        case 'ArrowDown':
          setPressedKeys(prev => ({ ...prev, down: false }));
          break;
        case 'ArrowLeft':
          setPressedKeys(prev => ({ ...prev, left: false }));
          break;
        case 'ArrowRight':
          setPressedKeys(prev => ({ ...prev, right: false }));
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);
  
  return (
    <div className='flex flex-col items-center justify-center w-[10rem]'>
        <div className='flex justify-between w-full'>
            <TakePicture />
            <ShootDrone />
        </div>
        <div >
            <div className='flex items-center justify-center cursor-pointer'>
            <div className={`hover:scale-120 transition-transform duration-200 ${pressedKeys.up ? 'scale-120' : ''}`}>
              <ArrowUp 
                onClick={() => moveDrone('up')} 
                size={40} 
                color='#FFF' 
                hoverColor='#f97316'
                className={pressedKeys.up ? '[&>path]:fill-orange-500' : ''}
              />
            </div>
            </div>
            <div className='flex cursor-pointer justify-center items-center'>
            <div className={`hover:scale-120 transition-transform duration-200 ${pressedKeys.left ? 'scale-120' : ''}`}>
              <ArrowLeft 
                onClick={() => moveDrone('left')} 
                size={40} 
                color='#FFF' 
                hoverColor='#f97316'
                className={pressedKeys.left ? '[&>path]:fill-orange-500' : ''}
              />
            </div>
            <button className='flex items-center justify-center font-[Special_Elite] p-2 pt-3 text-white border-2 rounded-lg border-white min-h-[3rem] cursor-pointer hover:bg-orange-500/55'>Auto</button>
            <div className={`hover:scale-120 transition-transform duration-200 ${pressedKeys.right ? 'scale-120' : ''}`}>
              <ArrowRight 
                onClick={() => moveDrone('right')} 
                size={40} 
                color='#FFF' 
                hoverColor='#f97316'
                className={pressedKeys.right ? '[&>path]:fill-orange-500' : ''}
              />
            </div>
            </div>
            <div className='flex items-center justify-center cursor-pointer'>
            <div className={`hover:scale-120 transition-transform duration-200 ${pressedKeys.down ? 'scale-120' : ''}`}>
              <ArrowDown 
                onClick={() => moveDrone('down')} 
                size={40} 
                color='#FFF' 
                hoverColor='#f97316'
                className={pressedKeys.down ? '[&>path]:fill-orange-500' : ''}
              />
            </div>
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