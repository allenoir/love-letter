import React from 'react';
import { useGameContext } from './GameContext';

const MessageModal: React.FC = () => {
  const { showMessage, message, setShowMessage, setMessage } = useGameContext();

  if (!showMessage) return null;

  return (
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
  );
};

export default MessageModal;