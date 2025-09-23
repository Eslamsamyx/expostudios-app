"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ backgroundColor: '#0F1419' }}>
      {/* Animated Background Pattern */}
      <div className="absolute inset-0">
        {/* Geometric Grid Pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-5" style={{ filter: 'blur(0.5px)' }}>
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00E5CC" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Animated Light Beams */}
        <motion.div
          className="absolute top-0 left-1/4 w-px h-full opacity-20"
          style={{
            background: 'linear-gradient(to bottom, transparent, #00A6FB 50%, transparent)',
          }}
          animate={{
            x: [-100, 100, -100],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-0 right-1/4 w-px h-full opacity-20"
          style={{
            background: 'linear-gradient(to bottom, transparent, #7C4DFF 50%, transparent)',
          }}
          animate={{
            x: [100, -100, 100],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Floating Tech Orbs */}
        <motion.div
          className="absolute top-20 left-[20%] w-[400px] h-[400px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, #00A6FB 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
          animate={{
            x: [0, 30, -30, 0],
            y: [0, -20, 20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-[20%] w-[350px] h-[350px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, #7C4DFF 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
          animate={{
            x: [0, -30, 30, 0],
            y: [0, 20, -20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Background Image */}
      <div
        className="absolute bottom-0 right-0 w-[600px] h-[600px] pointer-events-none"
        style={{
          backgroundImage: 'url(/background-coming-soon.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'bottom right',
          opacity: 0.08,
          mixBlendMode: 'screen',
          filter: 'blur(0.2px)',
        }}
      />

      {/* Login Form */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl sm:text-5xl font-thin tracking-[0.2em] mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#00E5CC] via-[#00A6FB] to-[#7C4DFF]">
              EXPOSTUDIOS
            </h1>
            <p className="text-sm font-light" style={{ color: '#00E5CC' }}>
              Admin Portal
            </p>
          </motion.div>

          {/* Glass Card with Tech Border */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative rounded-xl p-8"
            style={{
              background: 'linear-gradient(135deg, rgba(15, 20, 25, 0.9) 0%, rgba(15, 20, 25, 0.6) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(0, 166, 251, 0.2)',
            }}
          >
            {/* Animated Border Sweep - Top */}
            <motion.div
              className="absolute top-0 left-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
              style={{ width: '100px' }}
              animate={{
                x: [0, 300, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Animated Border Sweep - Bottom */}
            <motion.div
              className="absolute bottom-0 right-0 h-px bg-gradient-to-l from-transparent via-purple-400 to-transparent"
              style={{ width: '100px' }}
              animate={{
                x: [0, -300, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
                delay: 1.5,
              }}
            />

            <h2 className="text-2xl font-light tracking-wider mb-6 text-center" style={{ color: '#E8ECEF' }}>
              Welcome Back
            </h2>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 rounded-lg text-sm"
                style={{
                  color: '#00E5CC',
                  backgroundColor: 'rgba(0, 229, 204, 0.1)',
                  border: '1px solid rgba(0, 229, 204, 0.2)',
                }}
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-light mb-2" style={{ color: '#00E5CC' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-black/30 text-white placeholder-gray-500 transition-all duration-300"
                  style={{
                    border: '1px solid rgba(0, 166, 251, 0.2)',
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'rgba(0, 229, 204, 0.5)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(0, 166, 251, 0.2)'}
                  placeholder="admin@expostudios.com"
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-light mb-2" style={{ color: '#00E5CC' }}>
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-black/30 text-white placeholder-gray-500 transition-all duration-300"
                  style={{
                    border: '1px solid rgba(0, 166, 251, 0.2)',
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'rgba(0, 229, 204, 0.5)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(0, 166, 251, 0.2)'}
                  placeholder="Enter your password"
                  required
                  disabled={isLoading}
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-lg font-light tracking-wider transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                style={{
                  background: 'linear-gradient(135deg, #00A6FB 0%, #7C4DFF 100%)',
                  color: '#FFFFFF',
                  border: '1px solid rgba(0, 166, 251, 0.3)',
                }}
              >
                {/* Button Shine Effect */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100"
                  style={{
                    background: 'linear-gradient(105deg, transparent 40%, rgba(255, 255, 255, 0.2) 50%, transparent 60%)',
                  }}
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 0.8,
                    ease: "easeInOut",
                  }}
                />
                <span className="relative z-10">
                  {isLoading ? "Authenticating..." : "Sign In"}
                </span>
              </motion.button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-xs font-light" style={{ color: '#8A94A6' }}>
                Secure access for authorized personnel only
              </p>
            </div>
          </motion.div>

          {/* Back to Home */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-center mt-6"
          >
            <Link
              href="/"
              className="text-sm font-light hover:opacity-80 transition-opacity inline-flex items-center gap-2"
              style={{ color: '#00E5CC' }}
            >
              <span>←</span>
              <span>Back to Homepage</span>
            </Link>
          </motion.div>

          {/* Tech Decorative Elements */}
          <div className="absolute -bottom-20 -left-20 w-40 h-40 opacity-10">
            <svg viewBox="0 0 200 200">
              <polygon
                points="100,20 180,60 180,140 100,180 20,140 20,60"
                fill="none"
                stroke="#00A6FB"
                strokeWidth="1"
              />
            </svg>
          </div>
          <div className="absolute -top-20 -right-20 w-40 h-40 opacity-10">
            <svg viewBox="0 0 200 200">
              <polygon
                points="100,20 180,60 180,140 100,180 20,140 20,60"
                fill="none"
                stroke="#7C4DFF"
                strokeWidth="1"
              />
            </svg>
          </div>
        </motion.div>
      </div>
    </div>
  );
}