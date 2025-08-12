import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Position, GameStats, Direction } from '../../types/gameTypes';
import { MAPS } from '../../data/mapData';
import { PLAYER_CONFIG } from '../../data/playerConfig';

type GameContextType = {
  currentMap: string;
  setCurrentMap: React.Dispatch<React.SetStateAction<string>>;
  playerPos: Position;
  setPlayerPos: React.Dispatch<React.SetStateAction<Position>>;
  playerLevel: number;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  showMessage: boolean;
  setShowMessage: React.Dispatch<React.SetStateAction<boolean>>;
  showThemeMenu: boolean;
  setShowThemeMenu: React.Dispatch<React.SetStateAction<boolean>>;
  gameStats: GameStats;
  setGameStats: React.Dispatch<React.SetStateAction<GameStats>>;
  tileSize: number;
  handleInteraction: () => void;
  handleDPadMove: (direction: Direction) => void;
  closeThemeMenu: () => void;
  selectTheme: (themeId: string) => void;
};

const GameContext = createContext<GameContextType | null>(null);

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentMap, setCurrentMap] = useState('village');
  const [playerPos, setPlayerPos] = useState(PLAYER_CONFIG.startingPosition);
  const [playerLevel] = useState(PLAYER_CONFIG.startingLevel);
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [gameStats, setGameStats] = useState<GameStats>({
    health: 100,
    mana: 50,
    experience: 0,
    gold: 0
  });

  const [tileSize, setTileSize] = useState(40);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 640;
      setTileSize(isMobile ? 28 : 40);
      
      setPlayerPos(prev => ({ ...prev }));
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const currentMapData = MAPS[currentMap];

  const handleInteraction = useCallback(() => {
    const objectKey = `${playerPos.x},${playerPos.y}`;
    const object = currentMapData.objects[objectKey];

    if (object && object.onInteract) {
      const result = object.onInteract(
        { level: playerLevel, position: playerPos, stats: gameStats },
        { currentMap, mapData: currentMapData, stats: gameStats }
      );

      setMessage(result.message);
      setShowMessage(true);

      if (result.action) {
        setTimeout(() => {
          switch (result.action.type) {
            case 'CHANGE_MAP':
              if (result.action.mapId && result.action.position) {
                setCurrentMap(result.action.mapId);
                setPlayerPos(result.action.position);
              }
              break;
            case 'UPDATE_STATS':
              if (result.action.stats) {
                setGameStats(prev => ({
                  ...prev,
                  ...result.action.stats
                }));
              }
              break;
            case 'SHOW_THEME_PORTAL_MENU':
              setShowThemeMenu(true);
              break;
          }
        }, 1000);
      }
    }
  }, [playerPos, currentMapData, playerLevel, gameStats, currentMap]);

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (showMessage || showThemeMenu) return;

      setPlayerPos(prev => {
        let newX = prev.x;
        let newY = prev.y;

        switch (e.key.toLowerCase()) {
          case 'w':
            newY = Math.max(0, prev.y - 1);
            break;
          case 's':
            newY = Math.min(currentMapData.height - 1, prev.y + 1);
            break;
          case 'a':
            newX = Math.max(0, prev.x - 1);
            break;
          case 'd':
            newX = Math.min(currentMapData.width - 1, prev.x + 1);
            break;
          case 'e':
            e.preventDefault();
            handleInteraction();
            return prev;
          default:
            return prev;
        }

        return { x: newX, y: newY };
      });
    },
    [showMessage, showThemeMenu, currentMapData, handleInteraction]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  const handleDPadMove = useCallback((direction: Direction) => {
    if (showMessage || showThemeMenu) return;

    const directionMap: Record<Direction, Position> = {
      up: { x: 0, y: -1 },
      down: { x: 0, y: 1 },
      left: { x: -1, y: 0 },
      right: { x: 1, y: 0 }
    };

    const move = directionMap[direction];
    setPlayerPos(prev => ({
      x: Math.max(0, Math.min(currentMapData.width - 1, prev.x + move.x)),
      y: Math.max(0, Math.min(currentMapData.height - 1, prev.y + move.y))
    }));
  }, [currentMapData, showMessage, showThemeMenu]);

  const closeThemeMenu = () => {
    setShowThemeMenu(false);
  };

  const selectTheme = (themeId: string) => {
    setCurrentMap(themeId);
    setPlayerPos({ x: 1, y: 3 });
    closeThemeMenu();
  };

  const value = {
    currentMap,
    setCurrentMap,
    playerPos,
    setPlayerPos,
    playerLevel,
    message,
    setMessage,
    showMessage,
    setShowMessage,
    showThemeMenu,
    setShowThemeMenu,
    gameStats,
    setGameStats,
    tileSize,
    handleInteraction,
    handleDPadMove,
    closeThemeMenu,
    selectTheme
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};