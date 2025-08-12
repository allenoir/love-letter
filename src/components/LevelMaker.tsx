import React, { useState, useCallback } from 'react';

// ==============================================
// TYPE DEFINITIONS
// ==============================================

interface TileType {
  id: string;
  name: string;
  color: string;
  borderColor: string;
  sprite?: string;
}

interface GridTile {
  type: string;
  customColor?: string;
}

interface MapData {
  name: string;
  width: number;
  height: number;
  backgroundColor: string;
  tileClass: string;
  tiles: Record<string, GridTile>;
  objects: Record<string, any>; // Objects will be added later
}

interface LevelMakerState {
  currentMap: MapData;
  selectedTile: string;
  gridSize: { width: number; height: number };
  customColor: string;
  isDrawing: boolean;
}

// ==============================================
// PREDEFINED TILE TYPES
// ==============================================

const TILE_TYPES: Record<string, TileType> = {
  grass: {
    id: 'grass',
    name: 'Grass',
    color: 'bg-green-200',
    borderColor: 'border-green-300'
  },
  stone: {
    id: 'stone',
    name: 'Stone',
    color: 'bg-gray-400',
    borderColor: 'border-gray-500'
  },
  water: {
    id: 'water',
    name: 'Water',
    color: 'bg-blue-300',
    borderColor: 'border-blue-400'
  },
  sand: {
    id: 'sand',
    name: 'Sand',
    color: 'bg-yellow-200',
    borderColor: 'border-yellow-300'
  },
  dirt: {
    id: 'dirt',
    name: 'Dirt',
    color: 'bg-amber-600',
    borderColor: 'border-amber-700'
  },
  lava: {
    id: 'lava',
    name: 'Lava',
    color: 'bg-red-500',
    borderColor: 'border-red-600'
  },
  ice: {
    id: 'ice',
    name: 'Ice',
    color: 'bg-cyan-200',
    borderColor: 'border-cyan-300'
  },
  forest: {
    id: 'forest',
    name: 'Forest',
    color: 'bg-green-700',
    borderColor: 'border-green-800'
  },
  custom: {
    id: 'custom',
    name: 'Custom',
    color: 'bg-purple-400',
    borderColor: 'border-purple-500'
  }
};

// ==============================================
// MAIN LEVEL MAKER COMPONENT
// ==============================================

const LevelMaker: React.FC = () => {
  const [state, setState] = useState<LevelMakerState>({
    currentMap: {
      name: 'New Map',
      width: 12,
      height: 8,
      backgroundColor: 'bg-green-100',
      tileClass: 'bg-green-200 border-green-300',
      tiles: {},
      objects: {}
    },
    selectedTile: 'grass',
    gridSize: { width: 12, height: 8 },
    customColor: '#8B5CF6',
    isDrawing: false
  });

  const tileSize: number = 40;

  // ==============================================
  // GRID MANIPULATION FUNCTIONS
  // ==============================================

  const setTile = useCallback((x: number, y: number): void => {
    setState(prev => {
      const tileKey = `${x},${y}`;
      const newTiles = { ...prev.currentMap.tiles };
      
      if (prev.selectedTile === 'custom') {
        newTiles[tileKey] = {
          type: 'custom',
          customColor: prev.customColor
        };
      } else {
        newTiles[tileKey] = {
          type: prev.selectedTile
        };
      }

      return {
        ...prev,
        currentMap: {
          ...prev.currentMap,
          tiles: newTiles
        }
      };
    });
  }, []);

  const clearTile = useCallback((x: number, y: number): void => {
    setState(prev => {
      const tileKey = `${x},${y}`;
      const newTiles = { ...prev.currentMap.tiles };
      delete newTiles[tileKey];

      return {
        ...prev,
        currentMap: {
          ...prev.currentMap,
          tiles: newTiles
        }
      };
    });
  }, []);

  const handleTileClick = useCallback((x: number, y: number, isRightClick: boolean = false): void => {
    if (isRightClick) {
      clearTile(x, y);
    } else {
      setTile(x, y);
    }
  }, [setTile, clearTile]);

  const handleMouseDown = useCallback((x: number, y: number, e: React.MouseEvent): void => {
    e.preventDefault();
    setState(prev => ({ ...prev, isDrawing: true }));
    handleTileClick(x, y, e.button === 2);
  }, [handleTileClick]);

  const handleMouseEnter = useCallback((x: number, y: number, e: React.MouseEvent): void => {
    if (state.isDrawing) {
      handleTileClick(x, y, e.buttons === 2);
    }
  }, [state.isDrawing, handleTileClick]);

  const handleMouseUp = useCallback((): void => {
    setState(prev => ({ ...prev, isDrawing: false }));
  }, []);

  // ==============================================
  // MAP MANAGEMENT FUNCTIONS
  // ==============================================

  const clearMap = useCallback((): void => {
    setState(prev => ({
      ...prev,
      currentMap: {
        ...prev.currentMap,
        tiles: {},
        objects: {}
      }
    }));
  }, []);

  const fillMap = useCallback((): void => {
    setState(prev => {
      const newTiles: Record<string, GridTile> = {};
      
      for (let y = 0; y < prev.gridSize.height; y++) {
        for (let x = 0; x < prev.gridSize.width; x++) {
          const tileKey = `${x},${y}`;
          if (prev.selectedTile === 'custom') {
            newTiles[tileKey] = {
              type: 'custom',
              customColor: prev.customColor
            };
          } else {
            newTiles[tileKey] = {
              type: prev.selectedTile
            };
          }
        }
      }

      return {
        ...prev,
        currentMap: {
          ...prev.currentMap,
          tiles: newTiles
        }
      };
    });
  }, []);

  const resizeMap = useCallback((newWidth: number, newHeight: number): void => {
    setState(prev => {
      // Filter out tiles that are outside the new boundaries
      const newTiles: Record<string, GridTile> = {};
      Object.entries(prev.currentMap.tiles).forEach(([key, tile]) => {
        const [x, y] = key.split(',').map(Number);
        if (x < newWidth && y < newHeight) {
          newTiles[key] = tile;
        }
      });

      return {
        ...prev,
        gridSize: { width: newWidth, height: newHeight },
        currentMap: {
          ...prev.currentMap,
          width: newWidth,
          height: newHeight,
          tiles: newTiles
        }
      };
    });
  }, []);

  // ==============================================
  // EXPORT/IMPORT FUNCTIONS
  // ==============================================

  const exportMap = useCallback((): void => {
    const mapData = {
      ...state.currentMap,
      width: state.gridSize.width,
      height: state.gridSize.height
    };

    const dataStr = JSON.stringify(mapData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${state.currentMap.name.replace(/\s+/g, '_').toLowerCase()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
  }, [state]);

  const importMap = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const mapData: MapData = JSON.parse(e.target?.result as string);
        setState(prev => ({
          ...prev,
          currentMap: mapData,
          gridSize: { width: mapData.width, height: mapData.height }
        }));
      } catch (error) {
        alert('Error loading map file. Please check the file format.');
      }
    };
    reader.readAsText(file);
    
    // Reset the input
    event.target.value = '';
  }, []);

  // ==============================================
  // RENDER FUNCTIONS
  // ==============================================

  const getTileStyle = (tile: GridTile): { backgroundColor: string; borderColor: string } => {
    if (tile.type === 'custom' && tile.customColor) {
      return {
        backgroundColor: tile.customColor,
        borderColor: tile.customColor
      };
    }
    
    const tileType = TILE_TYPES[tile.type];
    if (tileType) {
      return {
        backgroundColor: tileType.color.replace('bg-', ''),
        borderColor: tileType.borderColor.replace('border-', '')
      };
    }
    
    return {
      backgroundColor: 'transparent',
      borderColor: '#e5e7eb'
    };
  };

  const renderGrid = (): React.ReactElement[] => {
    const tiles: React.ReactElement[] = [];
    
    for (let y = 0; y < state.gridSize.height; y++) {
      for (let x = 0; x < state.gridSize.width; x++) {
        const tileKey = `${x},${y}`;
        const tile = state.currentMap.tiles[tileKey];
        
        let tileClass = 'border border-gray-300 cursor-pointer hover:opacity-80 transition-opacity';
        let style: React.CSSProperties = {
          width: tileSize,
          height: tileSize,
          gridColumn: x + 1,
          gridRow: y + 1,
          backgroundColor: '#f3f4f6', // Default gray background
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px',
          userSelect: 'none'
        };

        if (tile) {
          const tileStyle = getTileStyle(tile);
          style.backgroundColor = tileStyle.backgroundColor.startsWith('#') 
            ? tileStyle.backgroundColor 
            : `var(--${tileStyle.backgroundColor})`;
          style.borderColor = tileStyle.borderColor.startsWith('#') 
            ? tileStyle.borderColor 
            : `var(--${tileStyle.borderColor})`;
        }

        tiles.push(
          <div
            key={tileKey}
            className={tileClass}
            style={style}
            onMouseDown={(e) => handleMouseDown(x, y, e)}
            onMouseEnter={(e) => handleMouseEnter(x, y, e)}
            onContextMenu={(e) => e.preventDefault()}
            title={`(${x}, ${y}) - ${tile ? TILE_TYPES[tile.type]?.name || 'Custom' : 'Empty'}`}
          >
            {x},{y}
          </div>
        );
      }
    }
    return tiles;
  };

  return (
    <div 
      className="flex flex-col lg:flex-row gap-4 p-4 bg-slate-900 min-h-screen text-white"
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      
      {/* Left Sidebar - Tools */}
      <div className="lg:w-80 space-y-4">
        {/* Map Settings */}
        <div className="bg-slate-800 p-4 rounded-lg">
          <h3 className="text-lg font-bold mb-3 text-blue-400">Map Settings</h3>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">Map Name</label>
              <input
                type="text"
                value={state.currentMap.name}
                onChange={(e) => setState(prev => ({
                  ...prev,
                  currentMap: { ...prev.currentMap, name: e.target.value }
                }))}
                className="w-full p-2 bg-slate-700 border border-slate-600 rounded text-white"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium mb-1">Width</label>
                <input
                  type="number"
                  min="5"
                  max="20"
                  value={state.gridSize.width}
                  onChange={(e) => resizeMap(parseInt(e.target.value), state.gridSize.height)}
                  className="w-full p-2 bg-slate-700 border border-slate-600 rounded text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Height</label>
                <input
                  type="number"
                  min="5"
                  max="15"
                  value={state.gridSize.height}
                  onChange={(e) => resizeMap(state.gridSize.width, parseInt(e.target.value))}
                  className="w-full p-2 bg-slate-700 border border-slate-600 rounded text-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tile Palette */}
        <div className="bg-slate-800 p-4 rounded-lg">
          <h3 className="text-lg font-bold mb-3 text-green-400">Tile Palette</h3>
          
          <div className="grid grid-cols-3 gap-2 mb-4">
            {Object.values(TILE_TYPES).map((tileType) => (
              <button
                key={tileType.id}
                onClick={() => setState(prev => ({ ...prev, selectedTile: tileType.id }))}
                className={`p-3 rounded-lg border-2 transition-all ${
                  state.selectedTile === tileType.id
                    ? 'border-yellow-400 shadow-lg'
                    : 'border-slate-600 hover:border-slate-500'
                }`}
                style={{
                  backgroundColor: tileType.id === 'custom' 
                    ? state.customColor 
                    : tileType.color.includes('bg-') 
                      ? `var(--${tileType.color.replace('bg-', '')})` 
                      : tileType.color
                }}
                title={tileType.name}
              >
                <div className="text-xs font-bold text-center text-black">
                  {tileType.name}
                </div>
              </button>
            ))}
          </div>

          {/* Custom Color Picker */}
          {state.selectedTile === 'custom' && (
            <div className="mt-3">
              <label className="block text-sm font-medium mb-1">Custom Color</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={state.customColor}
                  onChange={(e) => setState(prev => ({ ...prev, customColor: e.target.value }))}
                  className="w-12 h-8 rounded border border-slate-600"
                />
                <input
                  type="text"
                  value={state.customColor}
                  onChange={(e) => setState(prev => ({ ...prev, customColor: e.target.value }))}
                  className="flex-1 p-1 bg-slate-700 border border-slate-600 rounded text-white text-sm"
                  placeholder="#8B5CF6"
                />
              </div>
            </div>
          )}
        </div>

        {/* Tools */}
        <div className="bg-slate-800 p-4 rounded-lg">
          <h3 className="text-lg font-bold mb-3 text-orange-400">Tools</h3>
          
          <div className="space-y-2">
            <button
              onClick={fillMap}
              className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-500 transition-colors"
            >
              🎨 Fill All
            </button>
            <button
              onClick={clearMap}
              className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-500 transition-colors"
            >
              🧹 Clear All
            </button>
          </div>
        </div>

        {/* Export/Import */}
        <div className="bg-slate-800 p-4 rounded-lg">
          <h3 className="text-lg font-bold mb-3 text-purple-400">File Operations</h3>
          
          <div className="space-y-2">
            <button
              onClick={exportMap}
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-500 transition-colors"
            >
              💾 Export JSON
            </button>
            <label className="w-full bg-yellow-600 text-white p-2 rounded hover:bg-yellow-500 transition-colors cursor-pointer block text-center">
              📁 Import JSON
              <input
                type="file"
                accept=".json"
                onChange={importMap}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-slate-800 p-4 rounded-lg text-xs">
          <h3 className="text-sm font-bold mb-2 text-cyan-400">Instructions</h3>
          <div className="space-y-1 text-slate-400">
            <div>• Left click: Place tile</div>
            <div>• Right click: Remove tile</div>
            <div>• Hold + drag: Paint mode</div>
            <div>• Export creates JSON for game</div>
            <div>• Objects can be added later</div>
          </div>
        </div>
      </div>

      {/* Center - Grid Canvas */}
      <div className="flex-1 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4 text-cyan-400">
          Level Maker - {state.currentMap.name}
        </h1>
        
        <div className="mb-4 text-sm text-slate-400">
          Selected Tool: <span className="text-yellow-400 font-bold">
            {TILE_TYPES[state.selectedTile]?.name || 'Unknown'}
          </span>
        </div>

        <div 
          className="relative bg-slate-700 border-4 border-slate-600 rounded-lg shadow-2xl mb-4 overflow-hidden"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${state.gridSize.width}, ${tileSize}px)`,
            gridTemplateRows: `repeat(${state.gridSize.height}, ${tileSize}px)`,
            gap: '0px'
          }}
        >
          {renderGrid()}
        </div>

        {/* Stats */}
        <div className="bg-slate-800 p-3 rounded-lg text-center text-sm">
          <div>Grid: {state.gridSize.width} × {state.gridSize.height} = {state.gridSize.width * state.gridSize.height} tiles</div>
          <div>Painted: {Object.keys(state.currentMap.tiles).length} tiles</div>
        </div>
      </div>

      {/* Right Sidebar - Map Preview & Code */}
      <div className="lg:w-80 space-y-4">
        {/* Map Preview */}
        <div className="bg-slate-800 p-4 rounded-lg">
          <h3 className="text-lg font-bold mb-3 text-pink-400">JSON Preview</h3>
          
          <div className="bg-slate-900 p-3 rounded text-xs font-mono text-green-400 max-h-40 overflow-auto">
            <pre>
{JSON.stringify({
  name: state.currentMap.name,
  width: state.gridSize.width,
  height: state.gridSize.height,
  tiles: Object.keys(state.currentMap.tiles).length > 0 
    ? `{${Object.keys(state.currentMap.tiles).length} tiles...}` 
    : '{}'
}, null, 2)}
            </pre>
          </div>
        </div>

        {/* Integration Guide */}
        <div className="bg-slate-800 p-4 rounded-lg">
          <h3 className="text-lg font-bold mb-3 text-yellow-400">Integration Guide</h3>
          
          <div className="text-xs space-y-2 text-slate-300">
            <div className="font-semibold text-white">1. Export your map as JSON</div>
            <div className="font-semibold text-white">2. Add to RPG game MAPS object:</div>
            <div className="bg-slate-900 p-2 rounded font-mono text-green-400">
              {`yourMapId: {\n  ...importedJSON,\n  backgroundColor: 'bg-green-100',\n  tileClass: 'bg-green-200',\n  objects: {}\n}`}
            </div>
            <div className="font-semibold text-white">3. Add objects manually</div>
            <div className="font-semibold text-white">4. Test in game!</div>
          </div>
        </div>

        {/* Tile Statistics */}
        <div className="bg-slate-800 p-4 rounded-lg">
          <h3 className="text-lg font-bold mb-3 text-emerald-400">Tile Stats</h3>
          
          <div className="space-y-2 text-sm">
            {Object.entries(
              Object.values(state.currentMap.tiles).reduce((acc, tile) => {
                acc[tile.type] = (acc[tile.type] || 0) + 1;
                return acc;
              }, {} as Record<string, number>)
            ).map(([type, count]) => (
              <div key={type} className="flex justify-between">
                <span>{TILE_TYPES[type]?.name || type}:</span>
                <span className="font-bold">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LevelMaker;