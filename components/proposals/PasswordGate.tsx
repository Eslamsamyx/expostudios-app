'use client';

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiLockClosed, HiEye, HiEyeOff } from 'react-icons/hi';

interface PasswordGateProps {
  children: React.ReactNode;
  password: string;
  title?: string;
  subtitle?: string;
}

export default function PasswordGate({
  children,
  password,
  title = 'Protected Content',
  subtitle = 'Please enter the password to continue',
}: PasswordGateProps) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [inputPassword, setInputPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (inputPassword.toLowerCase() === password.toLowerCase()) {
      setIsUnlocked(true);
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
      setInputPassword('');
    }
  };

  if (isUnlocked) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 80, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-cyan-500/10 to-indigo-500/10 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="relative p-8 md:p-10 rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl">
          {/* Lock icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="flex justify-center mb-8"
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center">
              <HiLockClosed className="w-10 h-10 text-blue-400" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold text-white text-center mb-3"
          >
            {title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-white/60 text-center mb-8"
          >
            {subtitle}
          </motion.p>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={inputPassword}
                onChange={(e) => {
                  setInputPassword(e.target.value);
                  setError('');
                }}
                placeholder="Enter password"
                className="w-full px-4 py-3 pr-12 rounded-lg bg-white/[0.05] border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-blue-400/50 focus:bg-white/[0.08] transition-all"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
              >
                {showPassword ? (
                  <HiEyeOff className="w-5 h-5" />
                ) : (
                  <HiEye className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Error message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-red-400 text-sm text-center"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Unlock
            </button>
          </motion.form>

          {/* Hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-white/30 text-xs text-center mt-6"
          >
            This content is password protected
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
