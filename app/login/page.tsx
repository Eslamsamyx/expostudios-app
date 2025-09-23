"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
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
    <div className="relative min-h-screen overflow-hidden" style={{ backgroundColor: '#121417' }}>
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-[20%] w-[400px] h-[400px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, #4A8E55 0%, transparent 70%)',
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
            background: 'radial-gradient(circle, #C3A355 0%, transparent 70%)',
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
            <h1
              className="text-4xl sm:text-5xl font-thin tracking-[0.1em] mb-4"
              style={{
                background: 'linear-gradient(135deg, #E8ECEF 0%, #C3A355 50%, #E8ECEF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              EXPOSTUDIOS
            </h1>
            <p className="text-sm font-light opacity-70" style={{ color: '#8A94A6' }}>
              Admin Portal
            </p>
          </motion.div>

          {/* Glass Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="rounded-2xl p-8"
            style={{
              background: 'linear-gradient(135deg, rgba(42, 46, 53, 0.8) 0%, rgba(42, 46, 53, 0.4) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(195, 163, 85, 0.2)',
            }}
          >
            <h2 className="text-2xl font-light tracking-wider mb-6 text-center" style={{ color: '#E8ECEF' }}>
              Welcome Back
            </h2>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 rounded-lg text-sm text-red-400 bg-red-400/10 border border-red-400/20"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-light mb-2" style={{ color: '#8A94A6' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-black/20 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
                  placeholder="admin@expostudios.com"
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-light mb-2" style={{ color: '#8A94A6' }}>
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-black/20 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
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
                className="w-full py-3 rounded-lg font-light tracking-wider transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: isLoading
                    ? 'linear-gradient(135deg, #4A8E55 0%, #2A5E35 100%)'
                    : 'linear-gradient(135deg, #C3A355 0%, #4A8E55 100%)',
                  color: '#121417',
                }}
              >
                {isLoading ? "Signing In..." : "Sign In"}
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
            <a
              href="/"
              className="text-sm font-light opacity-70 hover:opacity-100 transition-opacity"
              style={{ color: '#C3A355' }}
            >
              ← Back to Homepage
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}