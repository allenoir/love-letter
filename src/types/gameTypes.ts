export interface Position {
  x: number;
  y: number;
}

export interface GameStats {
  health: number;
  mana: number;
  experience: number;
  gold: number;
}

export interface Player {
  level: number;
  position: Position;
  stats: GameStats;
}

export interface GameState {
  currentMap: string;
  mapData: MapData;
  stats: GameStats;
}

export interface MapObject {
  type: string;
  sprite: string;
  name: string;
  message: string;
  onInteract: (player: Player, gameState: GameState) => any;
}

export interface MapData {
  name: string;
  width: number;
  height: number;
  backgroundColor: string;
  tileClass: string;
  objects: Record<string, MapObject>;
}

export type Direction = 'up' | 'down' | 'left' | 'right';