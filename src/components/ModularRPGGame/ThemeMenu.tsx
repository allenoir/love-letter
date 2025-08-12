import React from 'react';
import { useGameContext } from './GameContext';

const ThemeMenu: React.FC = () => {
  const { showThemeMenu, closeThemeMenu, selectTheme } = useGameContext();

  if (!showThemeMenu) return null;

  const themes = [
    { id: 'goth', name: 'Goth/MCR', icon: '🖤' },
    { id: 'mouthwash', name: 'Mouthwash', icon: '🧴' },
    { id: 'omori', name: 'Omori', icon: '😶' },
    { id: 'sketchbook', name: 'Sketchbook', icon: '🎨' },
    { id: 'hell', name: 'Helluva Hotel', icon: '😈' },
    { id: 'frog', name: 'Frog Kingdom', icon: '🐸' },
    { id: 'dog', name: 'Dog Park', icon: '🐶' },
    { id: 'forest', name: 'Dark Forest', icon: '🌲' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-slate-800 border border-slate-600 p-6 rounded-lg shadow-2xl max-w-2xl w-full mx-4">
        <h2 className="text-2xl font-bold mb-6 text-center text-purple-400">Choose a Theme</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {themes.map(theme => (
            <button 
              key={theme.id}
              onClick={() => selectTheme(theme.id)} 
              className="bg-slate-700 p-4 rounded-lg hover:bg-slate-600 transition-colors flex flex-col items-center"
            >
              <span className="text-4xl mb-2">{theme.icon}</span>
              <span>{theme.name}</span>
            </button>
          ))}
        </div>
        <button 
          onClick={closeThemeMenu}
          className="mt-6 w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-500 transition-colors font-bold"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ThemeMenu;