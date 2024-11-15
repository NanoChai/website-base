"use client";

import { WalletOutline, SettingsOutline } from 'react-ionicons';
import 'animate.css';

interface WalletIconProps {
  isHovering: boolean;
  isConnected: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
  balance?: string | null;
}

export const WalletIcon = ({ 
  isHovering, 
  isConnected, 
  onMouseEnter, 
  onMouseLeave, 
  onClick, 
  balance 
}: WalletIconProps) => {
  return (
    <div className="flex items-center gap-0">
      {isConnected && balance && (
        <div className="flex items-center animate__animated animate__zoomIn animate__faster">
          <span className="text-gray-500 text-sm font-medium bg-gray-200 rounded-l-full px-3 py-1.5 border-10 border-r-0 border-gray-300">
            {Number(balance) * 1000} REQUESTS
          </span>
        </div>
      )}
      <button 
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={`transition-colors flex items-center justify-center -ml-[2px] h-8
          ${isConnected 
            ? 'bg-green-500 hover:bg-green-600 w-8 rounded-r-full' 
            : 'bg-blue-500 hover:bg-blue-600 px-4 rounded'
          } text-white`}
      >
        {isConnected ? (
          <div className={`animate__animated ${isHovering ? 'animate__pulse' : ''}`}>
            {isHovering ? (
              <SettingsOutline
                color={'white'} 
                height="20px"
                width="20px"
              />
            ) : (
              <WalletOutline
                color={'white'} 
                height="20px"
                width="20px"
              />
            )}
          </div>
        ) : (
          'Connect Wallet'
        )}
      </button>
    </div>
  );
};
