"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function NotFound() {
  const router = useRouter();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ backgroundColor: '#121417' }}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient orbs */}
        <motion.div
          className="absolute top-[20%] left-[15%] w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, #C3A355 0%, transparent 70%)',
            filter: 'blur(100px)',
            transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
          }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-[10%] right-[20%] w-[400px] h-[400px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, #4A8E55 0%, transparent 70%)',
            filter: 'blur(80px)',
            transform: `translate(${-mousePosition.x * 0.3}px, ${-mousePosition.y * 0.3}px)`,
          }}
          animate={{
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Geometric shapes */}
        <motion.div
          className="absolute top-[40%] right-[25%]"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div
            className="w-32 h-32 border-2 opacity-10"
            style={{
              borderColor: '#C3A355',
              transform: 'rotate(45deg)',
            }}
          />
        </motion.div>

        <motion.div
          className="absolute bottom-[30%] left-[30%]"
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div
            className="w-24 h-24 border-2 opacity-10 rounded-full"
            style={{
              borderColor: '#4A8E55',
            }}
          />
        </motion.div>

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(#C3A355 1px, transparent 1px), linear-gradient(90deg, #C3A355 1px, transparent 1px)`,
            backgroundSize: '100px 100px',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          {/* 404 Number */}
          <motion.div
            className="relative mb-8"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1
              className="text-[180px] md:text-[220px] font-thin leading-none select-none"
              style={{
                background: 'linear-gradient(135deg, #C3A355 0%, #4A8E55 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 0 80px rgba(195, 163, 85, 0.3)',
              }}
            >
              404
            </h1>

            {/* Glitch effect */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2,
              }}
            >
              <h1
                className="text-[180px] md:text-[220px] font-thin leading-none select-none"
                style={{
                  color: '#4A8E55',
                  transform: 'translate(2px, -2px)',
                  opacity: 0.5,
                }}
              >
                404
              </h1>
            </motion.div>
          </motion.div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2
              className="text-2xl md:text-3xl font-light tracking-wider mb-4"
              style={{ color: '#E8ECEF' }}
            >
              Page Not Found
            </h2>
            <p
              className="text-lg font-light mb-8 max-w-md mx-auto"
              style={{ color: '#8A94A6' }}
            >
              The page you're looking for seems to have wandered off into the digital void.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              onClick={() => router.push('/')}
              className="px-8 py-3 rounded-lg font-light transition-all duration-300 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #C3A355 0%, #4A8E55 100%)',
                color: '#121417',
                boxShadow: '0 10px 30px rgba(195, 163, 85, 0.3)',
              }}
            >
              Return Home
            </button>

            <button
              onClick={() => router.back()}
              className="px-8 py-3 rounded-lg font-light transition-all duration-300 hover:scale-105"
              style={{
                background: 'rgba(42, 46, 53, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(195, 163, 85, 0.3)',
                color: '#E8ECEF',
              }}
            >
              Go Back
            </button>
          </motion.div>

          {/* Helpful Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 pt-12 border-t"
            style={{ borderColor: 'rgba(195, 163, 85, 0.2)' }}
          >
            <p className="text-sm mb-4" style={{ color: '#8A94A6' }}>
              Perhaps you were looking for one of these?
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              {['Articles', 'Contact', 'About'].map((link, index) => (
                <motion.button
                  key={link}
                  onClick={() => router.push(`/${link.toLowerCase()}`)}
                  className="text-sm px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'rgba(42, 46, 53, 0.4)',
                    border: '1px solid rgba(195, 163, 85, 0.2)',
                    color: '#C3A355',
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
                  whileHover={{
                    borderColor: 'rgba(195, 163, 85, 0.5)',
                    background: 'rgba(42, 46, 53, 0.6)',
                  }}
                >
                  {link}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <p className="text-xs" style={{ color: '#8A94A6' }}>
          © 2024 ExpoStudios. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
}