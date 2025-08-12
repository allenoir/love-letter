import React, { useState } from "react";
import { useGameContext } from "./GameContext";
import DPadButton from "./DPadButton";
import MapGrid from "./MapGrid";
import { MAPS } from "../../data/mapData";

const SidebarRight: React.FC = () => {
  const { handleInteraction } = useGameContext();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isMobile = window.innerWidth < 1024;
  const { currentMap } = useGameContext();
  const currentMapData = MAPS[currentMap];

  if (isMobile && isCollapsed) {
    return (
      <button
        onClick={() => setIsCollapsed(false)}
        className="fixed top-2 right-2 bg-slate-800 p-2 rounded-lg z-10"
      >
        ✕
      </button>
    );
  }

  return (
    <div
      className={`w-full lg:w-64 space-y-4 ${
        isMobile
          ? "fixed top-0 right-0 h-full bg-slate-900 z-10 p-4 overflow-y-auto"
          : ""
      }`}
    >
      {isMobile && (
        <button
          onClick={() => setIsCollapsed(true)}
          className="absolute top-2 left-2 bg-slate-700 p-2 rounded-lg"
        >
          🎮
        </button>
      )}
      {isMobile && (
        <div className="flex-1 flex flex-col items-center min-h-0">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-cyan-400">
            {currentMapData.name}
          </h1>
          <MapGrid currentMapData={currentMapData} />
        </div>
      )}

      <div className="bg-slate-800 p-4 rounded-lg">
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div></div>
          <DPadButton direction="up">↑</DPadButton>
          <div></div>
          <DPadButton direction="left">←</DPadButton>
          <div className="bg-slate-700 p-3 rounded-lg flex items-center justify-center text-xl sm:text-2xl">
            🎮
          </div>
          <DPadButton direction="right">→</DPadButton>
          <div></div>
          <DPadButton direction="down">↓</DPadButton>
          <div></div>
        </div>
        <div className="space-y-2">
          <button
            onClick={handleInteraction}
            className="w-full bg-yellow-600 text-white p-4 sm:p-3 rounded-lg shadow-lg hover:bg-yellow-500 active:bg-yellow-700 transition-colors font-bold"
          >
            INTERACT
          </button>
        </div>
      </div>

      {/* <div className="bg-slate-800 p-4 rounded-lg text-xs">
        <h3 className="text-sm font-bold mb-2 text-cyan-400">Dev Guide</h3>
        <div className="space-y-1 text-slate-400">
          <div>• Add maps in MAPS object</div>
          <div>• Customize onInteract functions</div>
          <div>• Modify PLAYER_CONFIG</div>
          <div>• Extend gameStats object</div>
          <div>• Add new action types</div>
        </div>
      </div> */}
    </div>
  );
};

export default SidebarRight;
