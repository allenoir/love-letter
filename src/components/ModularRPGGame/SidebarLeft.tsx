import React, { useState } from 'react';
import { useGameContext } from './GameContext';
import type { MapData } from '../../types/gameTypes';
import { MAPS } from '../../data/mapData';

interface SidebarLeftProps {
  currentMapData: MapData;
}

const SidebarLeft: React.FC<SidebarLeftProps> = ({ currentMapData }) => {
  const { playerPos, playerLevel, gameStats, setCurrentMap, setPlayerPos } = useGameContext();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isMobile = window.innerWidth < 1024;

  if (isMobile && isCollapsed) {
    return (
      <button 
        onClick={() => setIsCollapsed(false)}
        className="fixed top-2 left-2 bg-slate-800 p-2 rounded-lg z-10"
      >
        📊
      </button>
    );
  }

  return (
    <div className={`w-full lg:w-64 space-y-4 ${isMobile ? 'fixed top-0 left-0 h-full bg-slate-900 z-10 p-4 overflow-y-auto' : ''}`}>
      {isMobile && (
        <button 
          onClick={() => setIsCollapsed(true)}
          className="absolute top-2 right-2 bg-slate-700 p-2 rounded-lg"
        >
          ✕
        </button>
      )}
      
      <div className="bg-slate-800 p-4 rounded-lg">
        <h3 className="text-lg font-bold mb-3 text-blue-400">Player Info</h3>
        <div className="space-y-2 text-sm">
          <div>🧙‍♂️ Wizard</div>
          <div>⭐ Level {playerLevel}</div>
          <div>❤️ Health: {gameStats.health}</div>
          <div>💙 Mana: {gameStats.mana}</div>
          <div>✨ EXP: {gameStats.experience}</div>
          <div>💰 Gold: {gameStats.gold}</div>
        </div>
      </div>

      <div className="bg-slate-800 p-4 rounded-lg">
        <h3 className="text-lg font-bold mb-3 text-green-400">Current Area</h3>
        <div className="space-y-2 text-sm">
          <div>🗺️ {currentMapData.name}</div>
          <div>📍 Position: ({playerPos.x}, {playerPos.y})</div>
          <div>📏 Size: {currentMapData.width} × {currentMapData.height}</div>
          <div>🎯 Objects: {Object.keys(currentMapData.objects).length}</div>
        </div>
      </div>

      <div className="bg-slate-800 p-4 rounded-lg">
        <h3 className="text-lg font-bold mb-3 text-purple-400">Quick Travel</h3>
        <div className="space-y-2">
          {Object.entries(MAPS).map(([mapId, mapData]) => (
            <button
              key={mapId}
              onClick={() => {
                setCurrentMap(mapId);
                setPlayerPos({ x: 3, y: 3 });
              }}
              className={`w-full p-3 sm:p-2 rounded text-sm transition-colors ${
                currentMapData.name === mapData.name
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-700 hover:bg-slate-600'
              }`}
            >
              {mapData.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SidebarLeft;