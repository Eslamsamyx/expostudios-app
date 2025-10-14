'use client';

import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  progress: number;
  isLoaded: boolean;
}

export default function LoadingScreen({ progress, isLoaded }: LoadingScreenProps) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      setTimeout(() => setFadeOut(true), 500);
    }
  }, [isLoaded]);

  if (fadeOut) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 transition-opacity duration-1000 ${
        isLoaded ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="text-center space-y-8 px-4">
        {/* Logo/Title */}
        <div className="space-y-2">
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
            Office Tour
          </h1>
          <p className="text-slate-400 text-lg">Loading 3D Environment</p>
        </div>

        {/* Progress Bar */}
        <div className="w-80 max-w-full mx-auto">
          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-slate-400 text-sm mt-3">{Math.round(progress)}%</p>
        </div>

        {/* Loading Animation */}
        <div className="flex gap-2 justify-center">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
