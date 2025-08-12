import type { GameState, MapData, Player } from "../types/gameTypes";

export const MAPS: Record<string, MapData> = {
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
