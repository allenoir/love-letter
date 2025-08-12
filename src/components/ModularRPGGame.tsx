import React, { useState, useEffect, useCallback } from 'react';

// ==============================================
// TYPE DEFINITIONS
// ==============================================

interface Position {
  x: number;
  y: number;
}

interface GameStats {
  health: number;
  mana: number;
  experience: number;
  gold: number;
}

interface Player {
  level: number;
  position: Position;
  stats: GameStats;
}

interface GameState {
  currentMap: string;
  mapData: MapData;
  stats: GameStats;
}

interface MapObject {
  type: string;
  sprite: string;
  name: string;
  message: string;
  onInteract: (player: Player, gameState: GameState) => any;
}

interface MapData {
  name: string;
  width: number;
  height: number;
  backgroundColor: string;
  tileClass: string;
  objects: Record<string, MapObject>;
}

type Direction = 'up' | 'down' | 'left' | 'right';

// ==============================================
// PLAYER CONFIG
// ==============================================

const PLAYER_CONFIG = {
  startingLevel: 1,
  startingPosition: { x: 3, y: 3 },
  sprite: '🧙‍♂️',
  name: 'Wizard'
};

// ==============================================
// MAP DATA (same as before — omitted here for brevity)
// ==============================================

const MAPS: Record<string, MapData> = {
  village: {
    name: 'Village',
    width: 12,
    height: 8,
    backgroundColor: 'bg-green-100',
    tileClass: 'bg-green-200 border-green-300',
    objects: {
      '2,1': { 
        type: 'chest', 
        sprite: '📦',
        name: 'Treasure Chest',
        message: '🎁 You found a treasure chest! It contains 50 gold coins.',
        onInteract: (_player: Player, gameState: GameState) => {
          return { 
            message: '🎁 You found a treasure chest! It contains 50 gold coins.',
            action: { 
              type: 'UPDATE_STATS', 
              stats: { gold: gameState.stats.gold + 50 } 
            }
          };
        }
      },
      '8,2': { 
        type: 'tree', 
        sprite: '🌳',
        name: 'Oak Tree',
        message: '🌳 A tall oak tree. Birds are chirping in its branches.',
        onInteract: (_player: Player, _gameState: GameState) => {
          return { message: '🌳 A tall oak tree. Birds are chirping in its branches.' };
        }
      },
      '5,5': { 
        type: 'well', 
        sprite: '🏛️',
        name: 'Ancient Well',
        message: '🏛️ An old stone well. You can hear water echoing from below.',
        onInteract: (_player: Player, _gameState: GameState) => {
          return { message: '🏛️ An old stone well. You can hear water echoing from below.' };
        }
      },
      '10,6': { 
        type: 'npc', 
        sprite: '👤',
        name: 'Village Elder',
        message: '👤 Elder: "Welcome to our village, traveler! Safe journeys!"',
        onInteract: (_player: Player, _gameState: GameState) => {
          return { message: '👤 Elder: "Welcome to our village, traveler! Safe journeys!"' };
        }
      },
      '1,6': { 
        type: 'flower', 
        sprite: '🌸',
        name: 'Flower Patch',
        message: '🌸 Beautiful flowers bloom here. They smell wonderful!',
        onInteract: (_player: Player, _gameState: GameState) => {
          return { message: '🌸 Beautiful flowers bloom here. They smell wonderful!' };
        }
      },
      '11,0': { 
        type: 'portal', 
        sprite: '🌀',
        name: 'Theme Portal',
        message: '🌀 A swirling portal to themed worlds...',
        onInteract: (_player: Player, _gameState: GameState) => {
          return { 
            message: '🌀 Choose your destination...',
            action: { 
              type: 'SHOW_THEME_PORTAL_MENU',
              position: { x: 0, y: 0 } 
            }
          };
        }
      }
    }
  },
  forest: {
    name: 'Dark Forest',
    width: 10,
    height: 6,
    backgroundColor: 'bg-green-800',
    tileClass: 'bg-green-700 border-green-600',
    objects: {
      '5,2': { 
        type: 'monster', 
        sprite: '👹',
        name: 'Forest Goblin',
        message: '👹 A wild goblin appears! It looks hostile...',
        onInteract: (_player: Player, _gameState: GameState) => {
          return { message: '👹 A wild goblin growls at you menacingly!' };
        }
      },
      '8,4': { 
        type: 'herb', 
        sprite: '🌿',
        name: 'Healing Herb',
        message: '🌿 You found a rare healing herb!',
        onInteract: (_player: Player, gameState: GameState) => {
          return { 
            message: '🌿 You collected the healing herb. Health +10!',
            action: { 
              type: 'UPDATE_STATS', 
              stats: { health: Math.min(100, gameState.stats.health + 10) } 
            }
          };
        }
      },
      '0,3': { 
        type: 'portal', 
        sprite: '🌀',
        name: 'Village Portal',
        message: '🌀 A portal back to the village...',
        onInteract: (_player: Player, _gameState: GameState) => {
          return { 
            message: '🌀 You return to the village...',
            action: { type: 'CHANGE_MAP', mapId: 'village', position: { x: 11, y: 0 } }
          };
        }
      }
    }
  },
  goth: {
    name: 'Goth/MCR',
    width: 10,
    height: 8,
    backgroundColor: 'bg-gray-800',
    tileClass: 'bg-gray-900 border-purple-900',
    objects: {
      '3,2': { 
        type: 'band', 
        sprite: '🎸',
        name: 'Gerard Way',
        message: '🎸 "When I was a young boy..."',
        onInteract: (_player: Player, _gameState: GameState) => {
          return { message: '🎸 "I\'m not okay, I promise!"' };
        }
      },
      '7,5': { 
        type: 'graveyard', 
        sprite: '⚰️',
        name: 'Black Parade',
        message: '⚰️ When you die, does your life flash before your eyes?',
        onInteract: (_player: Player, _gameState: GameState) => {
          return { message: '⚰️ "The end. And all we crumble..."' };
        }
      },
      '0,4': { 
        type: 'portal', 
        sprite: '🔙',
        name: 'Return Portal',
        message: '🔙 Return to village',
        onInteract: (_player: Player, _gameState: GameState) => {
          return { 
            message: '🔙 Returning to village...',
            action: { type: 'CHANGE_MAP', mapId: 'village', position: { x: 10, y: 0 } }
          };
        }
      }
    }
  },
  mouthwash: {
    name: 'Mouthwash Realm',
    width: 8,
    height: 8,
    backgroundColor: 'bg-blue-100',
    tileClass: 'bg-blue-200 border-blue-300',
    objects: {
      '4,3': { 
        type: 'bottle', 
        sprite: '🧴',
        name: 'Minty Fresh',
        message: '🧴 Feel the cool freshness!',
        onInteract: (_player: Player, _gameState: GameState) => {
          return { message: '🧴 Your breath is now minty fresh!' };
        }
      },
      '2,6': { 
        type: 'bacteria', 
        sprite: '🦠',
        name: 'Plaque Monster',
        message: '🦠 Gross! Better brush it away!',
        onInteract: (_player: Player, gameState: GameState) => {
          return { 
            message: '🦠 You defeated the plaque monster!',
            action: { 
              type: 'UPDATE_STATS', 
              stats: { health: Math.min(100, gameState.stats.health + 10) } 
            }
          };
        }
      },
      '0,0': { 
        type: 'portal', 
        sprite: '🔙',
        name: 'Return Portal',
        message: '🔙 Return to village',
        onInteract: (_player: Player, _gameState: GameState) => {
          return { 
            message: '🔙 Returning to village...',
            action: { type: 'CHANGE_MAP', mapId: 'village', position: { x: 10, y: 0 } }
          };
        }
      }
    }
  },
  omori: {
    name: 'Headspace',
    width: 12,
    height: 10,
    backgroundColor: 'bg-purple-100',
    tileClass: 'bg-purple-200 border-pink-300',
    objects: {
      '5,2': { 
        type: 'cat', 
        sprite: '🐈',
        name: 'Mewo',
        message: '🐈 Meow...',
        onInteract: (_player: Player, _gameState: GameState) => {
          return { message: '🐈 Mewo purrs contentedly' };
        }
      },
      '8,7': { 
        type: 'lightbulb', 
        sprite: '💡',
        name: 'Lightbulb',
        message: '💡 Something glimmers in the light...',
        onInteract: (_player: Player, _gameState: GameState) => {
          return { message: '💡 "The truth will set you free..."' };
        }
      },
      '3,8': { 
        type: 'picnic', 
        sprite: '🧺',
        name: 'Picnic Basket',
        message: '🧺 Aubrey left this here...',
        onInteract: (_player: Player, gameState: GameState) => {
          return { 
            message: '🧺 You found a healing item!',
            action: { 
              type: 'UPDATE_STATS', 
              stats: { health: Math.min(100, gameState.stats.health + 20) } 
            }
          };
        }
      },
      '0,5': { 
        type: 'portal', 
        sprite: '🔙',
        name: 'Return Portal',
        message: '🔙 Return to village',
        onInteract: (_player: Player, _gameState: GameState) => {
          return { 
            message: '🔙 Returning to village...',
            action: { type: 'CHANGE_MAP', mapId: 'village', position: { x: 10, y: 0 } }
          };
        }
      }
    }
  },
  sketchbook: {
    name: 'Sketchbook World',
    width: 10,
    height: 10,
    backgroundColor: 'bg-yellow-50',
    tileClass: 'bg-white border-gray-400',
    objects: {
      '4,4': { 
        type: 'pencil', 
        sprite: '✏️',
        name: 'Magic Pencil',
        message: '✏️ Draw your own reality...',
        onInteract: (_player: Player, _gameState: GameState) => {
          return { message: '✏️ You sketch a healing potion!' };
        }
      },
      '7,2': { 
        type: 'paint', 
        sprite: '🎨',
        name: 'Color Splash',
        message: '🎨 Splashes of vibrant color!',
        onInteract: (_player: Player, _gameState: GameState) => {
          return { message: '🎨 The world becomes more colorful!' };
        }
      },
      '2,8': { 
        type: 'eraser', 
        sprite: '🧽',
        name: 'Reality Eraser',
        message: '🧽 Erase obstacles from existence',
        onInteract: (_player: Player, _gameState: GameState) => {
          return { 
            message: '🧽 You erased a barrier! Path cleared!',
          };
        }
      },
      '9,9': { 
        type: 'portal', 
        sprite: '🔙',
        name: 'Return Portal',
        message: '🔙 Return to village',
        onInteract: (_player: Player, _gameState: GameState) => {
          return { 
            message: '🔙 Returning to village...',
            action: { type: 'CHANGE_MAP', mapId: 'village', position: { x: 10, y: 0 } }
          };
        }
      }
    }
  },
  hell: {
    name: 'Helluva Hotel',
    width: 12,
    height: 8,
    backgroundColor: 'bg-red-800',
    tileClass: 'bg-red-900 border-orange-900',
    objects: {
      '6,3': { 
        type: 'imp', 
        sprite: '😈',
        name: 'Blitzo',
        message: '😈 "Ready to make a deal?"',
        onInteract: (_player: Player, _gameState: GameState) => {
          return { message: '😈 "Business is boomin\'!"' };
        }
      },
      '2,5': { 
        type: 'hotel', 
        sprite: '🏨',
        name: 'Hazbin Hotel',
        message: '🏨 "Redemption is just a stay away!"',
        onInteract: (_player: Player, _gameState: GameState) => {
          return { 
            message: '🏨 You check in and restore your health!',
            action: { 
              type: 'UPDATE_STATS', 
              stats: { health: 100 } 
            }
          };
        }
      },
      '10,1': { 
        type: 'cherub', 
        sprite: '😇',
        name: 'Cherubs',
        message: '😇 "We\'re technically not supposed to be here..."',
        onInteract: (_player: Player, _gameState: GameState) => {
          return { message: '😇 "Do you have any spare souls?"' };
        }
      },
      '0,4': { 
        type: 'portal', 
        sprite: '🔙',
        name: 'Return Portal',
        message: '🔙 Return to village',
        onInteract: (_player: Player, _gameState: GameState) => {
          return { 
            message: '🔙 Returning to village...',
            action: { type: 'CHANGE_MAP', mapId: 'village', position: { x: 10, y: 0 } }
          };
        }
      }
    }
  },
  frog: {
    name: 'Frog Kingdom',
    width: 10,
    height: 6,
    backgroundColor: 'bg-green-800',
    tileClass: 'bg-green-700 border-green-500',
    objects: {
      '3,2': { 
        type: 'frog', 
        sprite: '🐸',
        name: 'Ribbert',
        message: '🐸 Ribbit! Ribbit!',
        onInteract: (_player: Player, _gameState: GameState) => {
          return { message: '🐸 "Welcome to the lilypad lounge!"' };
        }
      },
      '7,4': { 
        type: 'crown', 
        sprite: '👑',
        name: 'Frog King',
        message: '👑 "Kneel before your amphibious overlord!"',
        onInteract: (_player: Player, gameState: GameState) => {
          return { 
            message: '👑 You pledge allegiance to the Frog King!',
            action: { 
              type: 'UPDATE_STATS', 
              stats: { gold: gameState.stats.gold + 100 } 
            }
          };
        }
      },
      '5,0': { 
        type: 'fly', 
        sprite: '🪰',
        name: 'Tasty Fly',
        message: '🪰 A delicious snack for frogs!',
        onInteract: (_player: Player, gameState: GameState) => {
          return { 
            message: '🪰 You caught a fly! (+5 health)',
            action: { 
              type: 'UPDATE_STATS', 
              stats: { health: Math.min(100, gameState.stats.health + 5) } 
            }
          };
        }
      },
      '9,3': { 
        type: 'portal', 
        sprite: '🔙',
        name: 'Return Portal',
        message: '🔙 Return to village',
        onInteract: (_player: Player, _gameState: GameState) => {
          return { 
            message: '🔙 Returning to village...',
            action: { type: 'CHANGE_MAP', mapId: 'village', position: { x: 10, y: 0 } }
          };
        }
      }
    }
  },
  dog: {
    name: 'Dog Park',
    width: 10,
    height: 8,
    backgroundColor: 'bg-yellow-100',
    tileClass: 'bg-yellow-200 border-yellow-300',
    objects: {
      '4,4': { 
        type: 'dog', 
        sprite: '🐶',
        name: 'Good Boy',
        message: '🐶 Woof! Woof!',
        onInteract: (_player: Player, _gameState: GameState) => {
          return { message: '🐶 The dog brings you a stick!' };
        }
      },
      '7,2': { 
        type: 'bone', 
        sprite: '🦴',
        name: 'Magic Bone',
        message: '🦴 A buried treasure!',
        onInteract: (_player: Player, gameState: GameState) => {
          return { 
            message: '🦴 You found a buried treasure! (+50 gold)',
            action: { 
              type: 'UPDATE_STATS', 
              stats: { gold: gameState.stats.gold + 50 } 
            }
          };
        }
      },
      '2,6': { 
        type: 'ball', 
        sprite: '🎾',
        name: 'Tennis Ball',
        message: '🎾 Throw it! Fetch!',
        onInteract: (_player: Player, _gameState: GameState) => {
          return { message: '🎾 The dog happily chases the ball!' };
        }
      },
      '0,4': { 
        type: 'portal', 
        sprite: '🔙',
        name: 'Return Portal',
        message: '🔙 Return to village',
        onInteract: (_player: Player, _gameState: GameState) => {
          return { 
            message: '🔙 Returning to village...',
            action: { type: 'CHANGE_MAP', mapId: 'village', position: { x: 10, y: 0 } }
          };
        }
      }
    }
  }
};

// ==============================================
// MAIN GAME COMPONENT
// ==============================================

const ModularRPGGame = () => {
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

  const [tileSize, setTileSize] = useState(() =>
    window.innerWidth < 640 ? 28 : 40
  );

  // Responsive tile size update on resize
  useEffect(() => {
    const handleResize = () => {
      setTileSize(window.innerWidth < 640 ? 28 : 40);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const currentMapData = MAPS[currentMap];

  // ==============================================
  // INTERACTION SYSTEM
  // ==============================================

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

  // ==============================================
  // MOVEMENT SYSTEM
  // ==============================================

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

  const handleDPadMove = (direction: Direction) => {
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
  };

  // ==============================================
  // RENDER FUNCTIONS
  // ==============================================

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
          tileContent = PLAYER_CONFIG.sprite;
          tileClass = `${currentMapData.tileClass.replace(
            '200',
            '300'
          ).replace('300', '400')} border`;
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

  interface DPadButtonProps {
    direction: Direction;
    children: React.ReactNode;
    className?: string;
  }

  const DPadButton: React.FC<DPadButtonProps> = ({
    direction,
    children,
    className = ''
  }) => (
    <button
      onMouseDown={() => handleDPadMove(direction)}
      className={`bg-gray-700 text-white ${
        window.innerWidth < 640 ? 'p-4 text-lg' : 'p-3'
      } rounded-lg shadow-lg hover:bg-gray-600 active:bg-gray-800 transition-colors select-none ${className}`}
      style={{ userSelect: 'none' }}
    >
      {children}
    </button>
  );

    const closeThemeMenu = () => {
    setShowThemeMenu(false);
  };

  
  const selectTheme = (themeId: string) => {
    setCurrentMap(themeId);
    setPlayerPos({ x: 1, y: 3 });
    closeThemeMenu();
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 p-2 sm:p-4 bg-slate-900 min-h-screen text-white">
      {/* Sidebar Left */}
      <div className="w-full lg:w-64 space-y-4">
        {/* Player Info */}
        <div className="bg-slate-800 p-4 rounded-lg">
          <h3 className="text-lg font-bold mb-3 text-blue-400">Player Info</h3>
          <div className="space-y-2 text-sm">
            <div>🧙‍♂️ {PLAYER_CONFIG.name}</div>
            <div>⭐ Level {playerLevel}</div>
            <div>❤️ Health: {gameStats.health}</div>
            <div>💙 Mana: {gameStats.mana}</div>
            <div>✨ EXP: {gameStats.experience}</div>
            <div>💰 Gold: {gameStats.gold}</div>
          </div>
        </div>

        {/* Map Info */}
        <div className="bg-slate-800 p-4 rounded-lg">
          <h3 className="text-lg font-bold mb-3 text-green-400">Current Area</h3>
          <div className="space-y-2 text-sm">
            <div>🗺️ {currentMapData.name}</div>
            <div>📍 Position: ({playerPos.x}, {playerPos.y})</div>
            <div>📏 Size: {currentMapData.width} × {currentMapData.height}</div>
            <div>🎯 Objects: {Object.keys(currentMapData.objects).length}</div>
          </div>
        </div>

        {/* Quick Travel */}
        <div className="bg-slate-800 p-4 rounded-lg">
          <h3 className="text-lg font-bold mb-3 text-purple-400">Quick Travel</h3>
          <div className="space-y-2">
            {Object.entries(MAPS).map(([mapId, mapData]) => (
              <button
                key={mapId}
                onClick={() => {
                  setCurrentMap(mapId);
                  setPlayerPos(PLAYER_CONFIG.startingPosition);
                }}
                className={`w-full p-3 sm:p-2 rounded text-sm transition-colors ${
                  currentMap === mapId
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

      {/* Map Center */}
      <div className="flex-1 flex flex-col items-center">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-cyan-400">
          {currentMapData.name}
        </h1>

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

        <div className="bg-slate-800 p-3 rounded-lg text-center text-xs sm:text-sm">
          <span className="text-yellow-400">Keyboard:</span> WASD/Arrows to move • E to interact
        </div>
      </div>

      {/* Sidebar Right */}
      <div className="w-full lg:w-64 space-y-4">
        {/* D-Pad */}
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

        {/* Dev Guide */}
        <div className="bg-slate-800 p-4 rounded-lg text-xs">
          <h3 className="text-sm font-bold mb-2 text-cyan-400">Dev Guide</h3>
          <div className="space-y-1 text-slate-400">
            <div>• Add maps in MAPS object</div>
            <div>• Customize onInteract functions</div>
            <div>• Modify PLAYER_CONFIG</div>
            <div>• Extend gameStats object</div>
            <div>• Add new action types</div>
          </div>
        </div>
      </div>

      {/* Message Modal */}
      {showMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-slate-800 border border-slate-600 p-6 rounded-lg shadow-2xl max-w-md mx-4">
            <div className="mb-4 text-lg text-white">{message}</div>
            <button
              onClick={() => {
                setShowMessage(false);
                setMessage('');
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-500 transition-colors w-full font-bold"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Theme Menu */}
     {showThemeMenu && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-slate-800 border border-slate-600 p-6 rounded-lg shadow-2xl max-w-2xl w-full mx-4">
            <h2 className="text-2xl font-bold mb-6 text-center text-purple-400">Choose a Theme</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button 
                onClick={() => selectTheme('goth')} 
                className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors flex flex-col items-center"
              >
                <span className="text-4xl mb-2">🖤</span>
                <span>Goth/MCR</span>
              </button>
              <button 
                onClick={() => selectTheme('mouthwash')} 
                className="bg-blue-500 p-4 rounded-lg hover:bg-blue-400 transition-colors flex flex-col items-center"
              >
                <span className="text-4xl mb-2">🧴</span>
                <span>Mouthwash</span>
              </button>
              <button 
                onClick={() => selectTheme('omori')} 
                className="bg-purple-500 p-4 rounded-lg hover:bg-purple-400 transition-colors flex flex-col items-center"
              >
                <span className="text-4xl mb-2">😶</span>
                <span>Omori</span>
              </button>
              <button 
                onClick={() => selectTheme('sketchbook')} 
                className="bg-white text-black p-4 rounded-lg hover:bg-gray-200 transition-colors flex flex-col items-center"
              >
                <span className="text-4xl mb-2">🎨</span>
                <span>Sketchbook</span>
              </button>
              <button 
                onClick={() => selectTheme('hell')} 
                className="bg-red-700 p-4 rounded-lg hover:bg-red-600 transition-colors flex flex-col items-center"
              >
                <span className="text-4xl mb-2">😈</span>
                <span>Helluva Hotel</span>
              </button>
              <button 
                onClick={() => selectTheme('frog')} 
                className="bg-green-700 p-4 rounded-lg hover:bg-green-600 transition-colors flex flex-col items-center"
              >
                <span className="text-4xl mb-2">🐸</span>
                <span>Frog Kingdom</span>
              </button>
              <button 
                onClick={() => selectTheme('dog')} 
                className="bg-yellow-500 p-4 rounded-lg hover:bg-yellow-400 transition-colors flex flex-col items-center"
              >
                <span className="text-4xl mb-2">🐶</span>
                <span>Dog Park</span>
              </button>
              <button 
                onClick={() => selectTheme('forest')} 
                className="bg-green-800 p-4 rounded-lg hover:bg-green-700 transition-colors flex flex-col items-center"
              >
                <span className="text-4xl mb-2">🌲</span>
                <span>Dark Forest</span>
              </button>
            </div>
            <button 
              onClick={closeThemeMenu}
              className="mt-6 w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-500 transition-colors font-bold"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModularRPGGame;
