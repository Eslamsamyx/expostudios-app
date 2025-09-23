"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface ComingSoonProps {
  launchDate?: string;
  showNewsletter?: boolean;
}

export default function ComingSoon({
  launchDate = "Q1 2025",
  showNewsletter = true
}: ComingSoonProps) {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [newsletterEnabled, setNewsletterEnabled] = useState(true);

  useEffect(() => {
    // Check settings including maintenance mode
    const checkSettings = async () => {
      try {
        const response = await fetch('/api/public/settings');
        if (response.ok) {
          const settings = await response.json();
          setNewsletterEnabled(settings.enable_newsletter ?? true);

          // Check maintenance mode
          if (settings.maintenance_mode === true) {
            // Redirect to maintenance page
            window.location.href = '/maintenance';
          }
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };

    checkSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      try {
        const response = await fetch('/api/newsletter', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            source: 'COMING_SOON',
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setIsSubmitted(true);
          setTimeout(() => setIsSubmitted(false), 5000);
          setEmail("");
        } else {
          console.error('Subscription failed:', data.error);
          // You could add error state here to show error message
        }
      } catch (error) {
        console.error('Error submitting email:', error);
      }
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ backgroundColor: '#121417' }}>
      {/* Professional Animated Background */}
      <div className="absolute inset-0">
        {/* Dynamic Gradient Elements */}
        <motion.div
          className="absolute top-20 left-[10%] sm:left-[20%] w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, #4A8E55 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
          animate={{
            x: [0, 50, -50, 0],
            y: [0, -30, 30, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-20 right-[10%] sm:right-[20%] w-[250px] sm:w-[350px] md:w-[450px] lg:w-[500px] h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, #C3A355 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
          animate={{
            x: [0, -50, 50, 0],
            y: [0, 30, -30, 0],
            scale: [1, 0.95, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Tech Glow Accent */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, #22D3EE 0%, transparent 60%)',
            filter: 'blur(60px)',
          }}
          animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Dynamic Glass Elements */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute pointer-events-none"
            style={{
              width: `${80 + i * 15}px`,
              height: `${80 + i * 15}px`,
              left: `${10 + i * 20}%`,
              top: `${15 + i * 15}%`,
              background: 'linear-gradient(135deg, rgba(195, 163, 85, 0.1) 0%, rgba(74, 142, 85, 0.05) 100%)',
              border: '1px solid rgba(195, 163, 85, 0.15)',
              backdropFilter: 'blur(10px)',
              borderRadius: '16px',
              boxShadow: '0 8px 32px rgba(195, 163, 85, 0.08)',
              zIndex: 1,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0 + i * 72, 360 + i * 72],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 20 + i * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.8,
            }}
          />
        ))}

        {/* Mesh Gradient Background */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              radial-gradient(at 40% 20%, rgba(74, 142, 85, 0.3) 0px, transparent 50%),
              radial-gradient(at 80% 0%, rgba(195, 163, 85, 0.2) 0px, transparent 50%),
              radial-gradient(at 10% 50%, rgba(34, 211, 238, 0.1) 0px, transparent 50%),
              radial-gradient(at 80% 80%, rgba(74, 142, 85, 0.2) 0px, transparent 50%),
              radial-gradient(at 30% 80%, rgba(195, 163, 85, 0.15) 0px, transparent 50%)
            `,
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-3xl w-full"
        >
          {/* Main Content Card */}
          <div
            className="relative overflow-hidden rounded-3xl shadow-2xl mx-2 sm:mx-0"
            style={{
              background: 'linear-gradient(135deg, rgba(42, 46, 53, 0.8) 0%, rgba(42, 46, 53, 0.4) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(195, 163, 85, 0.2)',
            }}
          >
            {/* Gold Accent Line */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{
                background: 'linear-gradient(90deg, transparent, #C3A355, transparent)',
              }}
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            <div className="p-6 sm:p-8 md:p-12 lg:p-16">
              {/* Quality Badge */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="flex justify-center mb-8"
              >
                <div
                  className="px-6 py-2 rounded-full"
                  style={{
                    background: 'linear-gradient(135deg, rgba(195, 163, 85, 0.1) 0%, rgba(195, 163, 85, 0.05) 100%)',
                    border: '1px solid rgba(195, 163, 85, 0.3)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <span className="text-xs sm:text-sm font-light tracking-[0.2em] sm:tracking-[0.3em]" style={{ color: '#C3A355' }}>
                    COMING SOON
                  </span>
                </div>
              </motion.div>

              {/* Brand Name with Luxury Typography */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-center mb-8"
              >
                <h1
                  className="font-thin mb-6 mx-auto"
                  style={{
                    fontSize: 'clamp(1.2rem, 4.5vw, 6rem)',
                    letterSpacing: 'clamp(0.01em, 0.2vw, 0.08em)',
                    background: 'linear-gradient(135deg, #E8ECEF 0%, #C3A355 50%, #E8ECEF 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    textShadow: '0 0 40px rgba(195, 163, 85, 0.2)',
                    maxWidth: '95%',
                  }}
                >
                  EXPOSTUDIOS
                </h1>

                {/* Emerald Divider */}
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="h-[1px] w-20" style={{ background: 'linear-gradient(90deg, transparent, #4A8E55)' }} />
                  <div className="w-2 h-2 rotate-45" style={{ backgroundColor: '#4A8E55' }} />
                  <div className="h-[1px] w-20" style={{ background: 'linear-gradient(90deg, #4A8E55, transparent)' }} />
                </div>

                <p className="text-base sm:text-lg md:text-xl font-light tracking-wider" style={{ color: '#8A94A6' }}>
                  Imagine · Create · Build · Amplify
                </p>
                <p className="text-xs sm:text-sm mt-2 font-light tracking-wide opacity-70 px-4 sm:px-0" style={{ color: '#8A94A6' }}>
                  From insight to impact • A clear path to unforgettable experiences
                </p>
              </motion.div>

              {/* Early Access Form - Only show if newsletter is enabled */}
              {newsletterEnabled && (
                <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                onSubmit={handleSubmit}
                className="mb-10"
              >
                <div
                  className="relative rounded-2xl overflow-hidden p-1"
                  style={{
                    background: isHovered
                      ? 'linear-gradient(135deg, #C3A355 0%, #4A8E55 100%)'
                      : 'linear-gradient(135deg, rgba(195, 163, 85, 0.3) 0%, rgba(74, 142, 85, 0.3) 100%)',
                    transition: 'all 0.5s ease',
                  }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <div
                    className="rounded-xl overflow-hidden flex flex-col sm:flex-row"
                    style={{ backgroundColor: '#2A2E35' }}
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter email for early access"
                      className="flex-1 bg-transparent px-4 sm:px-6 py-3 sm:py-4 outline-none font-light tracking-wide text-sm sm:text-base"
                      style={{ color: '#E8ECEF', placeholderColor: '#8A94A6' }}
                      required
                    />
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="px-4 sm:px-6 md:px-8 py-3 sm:py-4 font-light tracking-wider transition-all duration-500 text-xs sm:text-sm md:text-base"
                      style={{
                        background: 'linear-gradient(135deg, #C3A355 0%, #4A8E55 100%)',
                        color: '#121417',
                      }}
                    >
                      {isSubmitted ? "ACCESS CONFIRMED" : "REQUEST ACCESS"}
                    </motion.button>
                  </div>
                </div>

                {isSubmitted && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mt-4 font-light tracking-wide"
                    style={{ color: '#4A8E55' }}
                  >
                    Welcome aboard. Let's create something people will talk about.
                  </motion.p>
                )}
              </motion.form>
              )}

              {/* Our Promise */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85, duration: 0.8 }}
                className="text-center mb-6 px-4"
              >
                <p className="text-sm sm:text-base font-light italic opacity-80" style={{ color: '#8A94A6' }}>
                  "We craft experiences people can feel and outcomes you can measure"
                </p>
              </motion.div>

              {/* Our Approach */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.87, duration: 0.8 }}
                className="text-center mb-10"
              >
                <p className="text-xs font-light tracking-wider opacity-70 mb-2" style={{ color: '#C3A355' }}>
                  OUR APPROACH
                </p>
                <p className="text-xs sm:text-sm font-light opacity-60" style={{ color: '#8A94A6' }}>
                  Research & Strategy → Design & Planning → Production & Supervision → Launch & Support
                </p>
              </motion.div>

              {/* Core Services */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8"
              >
                {[
                  {
                    icon: (
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    ),
                    title: "CONSULT",
                    subtitle: "Strategy & Concept",
                    description: "Alignment & measurable objectives"
                  },
                  {
                    icon: (
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                      </svg>
                    ),
                    title: "CREATE",
                    subtitle: "3D Design",
                    description: "On-brand & production-ready"
                  },
                  {
                    icon: (
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 3.096l-.102.104m-1.64 1.64l5.71-5.71" />
                      </svg>
                    ),
                    title: "BUILD",
                    subtitle: "Development",
                    description: "Robust interactive experiences"
                  },
                  {
                    icon: (
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" />
                      </svg>
                    ),
                    title: "AMPLIFY",
                    subtitle: "Marketing",
                    description: "Visibility & engagement"
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="text-center p-4 sm:p-6 rounded-xl transition-all duration-300 group"
                    style={{
                      background: 'linear-gradient(135deg, rgba(42, 46, 53, 0.5) 0%, rgba(42, 46, 53, 0.2) 100%)',
                      border: '1px solid rgba(195, 163, 85, 0.1)',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <div className="mb-3 group-hover:scale-110 transition-transform flex justify-center" style={{ color: '#C3A355' }}>
                      {item.icon}
                    </div>
                    <h3 className="font-light tracking-[0.15em] text-xs sm:text-sm mb-1" style={{ color: '#E8ECEF' }}>
                      {item.title}
                    </h3>
                    <p className="text-[10px] sm:text-xs font-light opacity-70 mb-2" style={{ color: '#C3A355' }}>
                      {item.subtitle}
                    </p>
                    <p className="text-[9px] sm:text-[10px] font-light opacity-60 hidden sm:block" style={{ color: '#8A94A6' }}>
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>

              {/* Industry Standards & Certifications */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0, duration: 0.8 }}
                className="mb-10"
              >
                <h3 className="text-center text-xs font-light tracking-[0.2em] mb-4 opacity-60" style={{ color: '#C3A355' }}>
                  WHERE WE OPERATE
                </h3>
                <div className="flex flex-wrap justify-center gap-3 px-4">
                  {[
                    "Exhibitions & Pavilions",
                    "Visitor/Experience Centers",
                    "Government Showcases",
                    "Museums & Cultural",
                    "Retail & Pop-ups"
                  ].map((spec, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.1 + index * 0.1, duration: 0.5 }}
                      className="px-4 py-2 text-[10px] sm:text-xs font-light tracking-wider rounded-full"
                      style={{
                        background: 'linear-gradient(135deg, rgba(74, 142, 85, 0.1) 0%, rgba(74, 142, 85, 0.05) 100%)',
                        border: '1px solid rgba(74, 142, 85, 0.2)',
                        color: '#8A94A6',
                      }}
                    >
                      {spec}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Elegant Social Links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.8 }}
                className="flex justify-center gap-6"
              >
                {[
                  {
                    name: "LinkedIn",
                    icon: (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                        <circle cx="4" cy="4" r="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )
                  },
                  {
                    name: "Instagram",
                    icon: (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeLinecap="round" />
                      </svg>
                    )
                  },
                  {
                    name: "Behance",
                    icon: (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h5a3 3 0 010 6H3V7zM3 13h5.5a3.5 3.5 0 010 7H3v-7z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 13h8s-.5-4-4-4-4 4-4 4zM14 13s0 4 4 4 4-4 4-4m-8 0h8M15 7h6" />
                      </svg>
                    )
                  },
                  {
                    name: "X",
                    icon: (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4l11.733 16h4.267l-11.733-16zM4 20l6.768-9.275M17.232 4L11 13.275" />
                      </svg>
                    )
                  }
                ].map((social) => (
                  <motion.a
                    key={social.name}
                    href="#"
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
                    style={{
                      background: 'linear-gradient(135deg, rgba(42, 46, 53, 0.8) 0%, rgba(42, 46, 53, 0.4) 100%)',
                      border: '1px solid rgba(195, 163, 85, 0.2)',
                      backdropFilter: 'blur(10px)',
                      color: '#C3A355',
                    }}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </motion.div>
            </div>

            {/* Bottom Gold Accent */}
            <div
              className="h-[1px]"
              style={{
                background: 'linear-gradient(90deg, transparent 10%, #C3A355 50%, transparent 90%)',
              }}
            />
          </div>

          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="text-center text-xs font-light tracking-[0.2em] mt-8 opacity-50"
            style={{ color: '#8A94A6' }}
          >
            © 2025 EXPOSTUDIOS • ALL RIGHTS RESERVED
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}