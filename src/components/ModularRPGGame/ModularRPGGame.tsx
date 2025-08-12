import React from 'react';
import { GameProvider, useGameContext } from './GameContext';
import MapGrid from './MapGrid';
import SidebarLeft from './SidebarLeft';
import SidebarRight from './SidebarRight';
import MessageModal from './MessageModal';
import ThemeMenu from './ThemeMenu';
import { MAPS } from '../../data/mapData';

const GameContent: React.FC = () => {
  const { currentMap } = useGameContext();
  const currentMapData = MAPS[currentMap];
  const isMobile = window.innerWidth < 1024;

  return (
    <div className="flex flex-col lg:flex-row gap-4 p-2 sm:p-4 bg-slate-900 min-h-screen text-white">
      {!isMobile && <SidebarLeft currentMapData={currentMapData} />}
      {isMobile && <div className="lg:hidden"><SidebarLeft currentMapData={currentMapData} /></div>}

      <div className="flex-1 flex flex-col items-center min-h-0">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-cyan-400">
          {currentMapData.name}
        </h1>
        <MapGrid currentMapData={currentMapData} />

        <div className="bg-slate-800 p-3 rounded-lg text-center text-xs sm:text-sm mt-4">
          <span className="text-yellow-400">Keyboard:</span> WASD/Arrows to move • E to interact
        </div>
      </div>

      {!isMobile && <SidebarRight />}
      {isMobile && <div className="lg:hidden"><SidebarRight /></div>}

      <MessageModal />
      <ThemeMenu />
    </div>
  );
};

const ModularRPGGame: React.FC = () => {
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  );
};

export default ModularRPGGame;