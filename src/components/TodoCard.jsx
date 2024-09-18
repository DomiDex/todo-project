import { useState, useEffect } from 'react';
import play from '../assets/play.svg';
import pause from '../assets/pause.svg';
import reset from '../assets/reset.svg';
import deleteIcon from '../assets/trash.svg';
import edit from '../assets/edit.svg';

const TodoCard = ({ id, title, description, completed, onEdit, onDelete }) => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setSeconds(0);
    setIsActive(false);
  };

  const handleEdit = () => {
    onEdit({ id, title, description, completed });
  };

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <div className='bg-white shadow-md rounded-lg p-4 mb-4'>
      <p className='text-sm mb-6'>
        {completed ? (
          <div className='p-1 w-28 bg-green-600 text-white text-center rounded-md'>
            Completed
          </div>
        ) : (
          <div className='p-1 w-24 bg-red-600 text-white text-center rounded-md'>
            Pending
          </div>
        )}
      </p>
      <h3 className='text-2xl font-semibold mb-2'>{title}</h3>
      <p className='font-medium mb-2'>{description}</p>

      <div className='flex flex-row justify-start items-center gap-4 mt-5'>
        <p className=' w-20'>Timer: {seconds} seconds</p>
        <button className='p-2 bg-blue-600 rounded-lg' onClick={toggleTimer}>
          <img
            src={isActive ? pause : play}
            alt={isActive ? 'Pause button' : 'Play button'}
          />
        </button>
        <button className='p-2 bg-blue-600 rounded-lg' onClick={resetTimer}>
          <img src={reset} alt='Reset button' />
        </button>
        <button className='p-2 bg-gray-600 rounded-lg' onClick={handleEdit}>
          <img src={edit} alt='Edit button' />
        </button>
        <button className='p-2 bg-red-600 rounded-lg' onClick={handleDelete}>
          <img src={deleteIcon} alt='Delete button' />
        </button>
      </div>
    </div>
  );
};

export default TodoCard;
