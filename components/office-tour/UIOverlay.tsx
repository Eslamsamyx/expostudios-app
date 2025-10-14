'use client';

import { useState, useEffect } from 'react';
import { FiMaximize2, FiMinimize2, FiHelpCircle, FiX } from 'react-icons/fi';

interface UIOverlayProps {
  isPointerLocked: boolean;
  onToggleFullscreen: () => void;
  isFullscreen: boolean;
}

export default function UIOverlay({
  isPointerLocked,
  onToggleFullscreen,
  isFullscreen,
}: UIOverlayProps) {
  const [showWelcome, setShowWelcome] = useState(true);
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    // Hide welcome modal after first interaction
    if (isPointerLocked && showWelcome) {
      setShowWelcome(false);
    }
  }, [isPointerLocked, showWelcome]);

  return (
    <>
      {/* Welcome Modal */}
      {showWelcome && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl max-w-2xl w-full mx-4 p-8 space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-white">Welcome to Our Office</h2>
              <p className="text-slate-400">
                Explore our workspace in immersive 3D. Use the controls below to navigate freely.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <span className="text-2xl">🖱️</span> Movement
                </h3>
                <div className="space-y-2 text-slate-300">
                  <div className="flex items-center gap-3">
                    <kbd className="px-3 py-1 bg-slate-800 rounded border border-slate-600 font-mono text-sm">
                      W A S D
                    </kbd>
                    <span className="text-sm">Move around</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <kbd className="px-3 py-1 bg-slate-800 rounded border border-slate-600 font-mono text-sm">
                      Mouse
                    </kbd>
                    <span className="text-sm">Look around</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <kbd className="px-3 py-1 bg-slate-800 rounded border border-slate-600 font-mono text-sm">
                      Shift
                    </kbd>
                    <span className="text-sm">Run faster</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <span className="text-2xl">⌨️</span> Controls
                </h3>
                <div className="space-y-2 text-slate-300">
                  <div className="flex items-center gap-3">
                    <kbd className="px-3 py-1 bg-slate-800 rounded border border-slate-600 font-mono text-sm">
                      ESC
                    </kbd>
                    <span className="text-sm">Exit pointer lock</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <kbd className="px-3 py-1 bg-slate-800 rounded border border-slate-600 font-mono text-sm">
                      F
                    </kbd>
                    <span className="text-sm">Toggle fullscreen</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <kbd className="px-3 py-1 bg-slate-800 rounded border border-slate-600 font-mono text-sm">
                      H
                    </kbd>
                    <span className="text-sm">Toggle help</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <button
                onClick={() => setShowWelcome(false)}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Start Exploring
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Help Panel */}
      {showHelp && !showWelcome && (
        <div className="fixed top-4 left-4 z-30 bg-slate-900/90 backdrop-blur-md border border-slate-700 rounded-xl shadow-xl p-4 max-w-xs">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-semibold">Controls</h3>
            <button
              onClick={() => setShowHelp(false)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <FiX size={20} />
            </button>
          </div>
          <div className="space-y-2 text-sm text-slate-300">
            <p><kbd className="px-2 py-1 bg-slate-800 rounded text-xs">WASD</kbd> Move</p>
            <p><kbd className="px-2 py-1 bg-slate-800 rounded text-xs">Mouse</kbd> Look</p>
            <p><kbd className="px-2 py-1 bg-slate-800 rounded text-xs">Shift</kbd> Run</p>
            <p><kbd className="px-2 py-1 bg-slate-800 rounded text-xs">ESC</kbd> Exit lock</p>
          </div>
        </div>
      )}

      {/* Top Bar - Only show when pointer is not locked */}
      {!isPointerLocked && (
        <div className="fixed top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/60 to-transparent backdrop-blur-sm p-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="text-white">
              <h1 className="text-xl font-bold">Expo Studios Office</h1>
              <p className="text-sm text-slate-300">Click to start exploring</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowHelp(!showHelp)}
                className="p-2 bg-slate-800/80 hover:bg-slate-700/80 text-white rounded-lg transition-colors"
                aria-label="Toggle help"
              >
                <FiHelpCircle size={24} />
              </button>
              <button
                onClick={onToggleFullscreen}
                className="p-2 bg-slate-800/80 hover:bg-slate-700/80 text-white rounded-lg transition-colors"
                aria-label="Toggle fullscreen"
              >
                {isFullscreen ? <FiMinimize2 size={24} /> : <FiMaximize2 size={24} />}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Hint - Only show when pointer is locked */}
      {isPointerLocked && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-20 bg-slate-900/90 backdrop-blur-md border border-slate-700 rounded-full px-6 py-3 shadow-xl">
          <p className="text-slate-300 text-sm">
            Press <kbd className="px-2 py-1 bg-slate-800 rounded text-xs">ESC</kbd> to exit •{' '}
            <kbd className="px-2 py-1 bg-slate-800 rounded text-xs">H</kbd> for help
          </p>
        </div>
      )}
    </>
  );
}
