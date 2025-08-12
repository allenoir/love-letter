import React from 'react';
import { useGameContext } from './GameContext';
import type { MapData } from '../../types/gameTypes';

interface MapGridProps {
  currentMapData: MapData;
}

const MapGrid: React.FC<MapGridProps> = ({ currentMapData }) => {
  const { playerPos, tileSize } = useGameContext();

  const renderMap = () => {
    const tiles = [];
    for (let y = 0; y < currentMapData.height; y++) {
      for (let x = 0; x < currentMapData.width; x++) {
        const isPlayer = playerPos.x === x && playerPos.y === y;
        const objectKey = `${x},${y}`;
        const object = currentMapData.objects[objectKey];

        let tileContent = '';
        let tileClass = `${currentMapData.tileClass} border`;

        if (isPlayer) {
          tileContent = '🧙‍♂️';
          tileClass = `${currentMapData.tileClass.replace('200', '300').replace('300', '400')} border`;
        } else if (object) {
          tileContent = object.sprite;
        }

        tiles.push(
          <div
            key={`${x}-${y}`}
            className={`${tileClass} flex items-center justify-center text-xl sm:text-2xl cursor-pointer hover:brightness-110 transition-all duration-150`}
            style={{
              width: tileSize,
              height: tileSize,
              gridColumn: x + 1,
              gridRow: y + 1
            }}
            title={object ? object.name : `Tile (${x}, ${y})`}
          >
            {tileContent}
          </div>
        );
      }
    }
    return tiles;
  };

  return (
    <div
      className={`relative ${currentMapData.backgroundColor} border-4 border-slate-600 rounded-lg shadow-2xl mb-4`}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${currentMapData.width}, minmax(${tileSize}px, 1fr))`,
        gridTemplateRows: `repeat(${currentMapData.height}, minmax(${tileSize}px, 1fr))`,
        gap: '1px',
        maxWidth: '100%',
        overflow: 'hidden'
      }}
    >
      {renderMap()}
    </div>
  );
};

export default MapGrid;