import React from 'react';
import { useGameContext } from './GameContext';
import type { Direction } from '../../types/gameTypes';

interface DPadButtonProps {
  direction: Direction;
  children: React.ReactNode;
  className?: string;
}

const DPadButton: React.FC<DPadButtonProps> = ({ 
  direction, 
  children, 
  className = '' 
}) => {
  const { handleDPadMove } = useGameContext();
  const isMobile = window.innerWidth < 640;

  return (
    <button
      onMouseDown={() => handleDPadMove(direction)}
      className={`bg-gray-700 text-white ${
        isMobile ? 'p-2 text-md' : 'p-3'
      } rounded-lg shadow-lg hover:bg-gray-600 active:bg-gray-800 transition-colors select-none ${className}`}
      style={{ userSelect: 'none' }}
    >
      {children}
    </button>
  );
};

export default DPadButton;