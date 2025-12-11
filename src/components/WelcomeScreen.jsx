import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Galaxy from './Galaxy';

export default function WelcomeScreen({ isPlaying, onStart }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize mouse position to -1 to 1 range
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {!isPlaying && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
          style={{
            backgroundImage: `
       radial-gradient(circle at center, #93c5fd, transparent)
     `,
          }}
          className="absolute inset-0 z-20 overflow-hidden bg-white/70 "
        >
          {/* Animated background grid */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

          {/* Floating particles effect */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-blue-400 rounded-full"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  opacity: 0,
                }}
                animate={{
                  y: [null, Math.random() * window.innerHeight],
                  opacity: [0, 0.6, 0],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* Main content container with mouse parallax */}
          <motion.div
            className="relative h-full flex flex-col items-center justify-center px-4 max-w-6xl mx-auto"
            style={{
              transform: `translate(${mousePosition.x * 20}px, ${
                mousePosition.y * 20
              }px)`,
              transition: 'transform 0.3s ease-out',
            }}
          >
            {/* Logo/Brand section */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.6, type: 'spring' }}
              className="mb-8"
              style={{
                transform: `translateZ(${mousePosition.x * 50}px) rotateY(${
                  mousePosition.x * 15
                }deg) rotateX(${-mousePosition.y * 15}deg)`,
                transition: 'transform 0.2s ease-out',
              }}
            >
              <div className="w-20 h-20 bg-linear-to-r from-black to-gray-700 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/50">
                <svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
            </motion.div>

            {/* Main heading with 3D effect */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="text-center space-y-6 mb-12"
              style={{
                transform: `perspective(1000px) rotateY(${
                  mousePosition.x * 10
                }deg) rotateX(${-mousePosition.y * 10}deg) translateZ(30px)`,
                transition: 'transform 0.2s ease-out',
              }}
            >
              <h1
                className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-400 via-cyan-300 to-blue-500"
                style={{
                  textShadow: `${mousePosition.x * 30}px ${
                    mousePosition.y * 30
                  }px 60px rgba(59, 130, 246, 0.6)`,
                  transition: 'text-shadow 0.2s ease-out',
                }}
              >
                Chào mừng đến với DU1
              </h1>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="h-1 bg-linear-to-r from-transparent via-cyan-500 to-transparent mx-auto"
              />
            </motion.div>

            {/* Subtitle with tech keywords */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="text-center space-y-4 mb-12 max-w-3xl"
              style={{
                transform: `translateZ(${mousePosition.y * 20}px)`,
                transition: 'transform 0.3s ease-out',
              }}
            >
              <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed">
                Cùng khám phá về team DU1
              </p>
              <div className="flex flex-wrap justify-center gap-3 mt-6">
                {[
                  'Sáng tạo',
                  'Linh hoạt',
                  'Gắn kết',
                  'Sẻ chia',
                  'Nhiệt huyết',
                  'Đam mê',
                ].map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.6 + i * 0.1, duration: 0.4 }}
                    whileHover={{
                      scale: 1.1,
                      rotateZ: mousePosition.x * 5,
                    }}
                    className="px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-full text-cyan-300 text-sm font-medium cursor-default"
                    style={{
                      transform: `translateZ(${(i + 1) * 10}px)`,
                    }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* CTA Button with enhanced hover effect */}
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 20px 60px rgba(59, 130, 246, 0.5)',
                rotateY: mousePosition.x * 10,
                rotateX: -mousePosition.y * 10,
              }}
              whileTap={{ scale: 0.98 }}
              onClick={onStart}
              className="group relative px-10 py-4 bg-linear-to-r from-blue-600 to-cyan-600 rounded-xl font-semibold text-lg text-white shadow-2xl shadow-blue-500/40 overflow-hidden transition-all duration-300"
              style={{
                transform: `perspective(1000px) translateZ(${
                  mousePosition.x * 30
                }px)`,
                transition: 'transform 0.2s ease-out',
              }}
            >
              <span className="relative z-10 flex items-center gap-3">
                Khám phá ngay
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
              <motion.div
                className="absolute inset-0 bg-linear-to-r from-cyan-600 to-blue-600"
                initial={{ x: '100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            {/* Footer hint with bounce animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
              style={{
                transform: `translateX(-50%) translateY(${
                  mousePosition.y * -10
                }px)`,
                transition: 'transform 0.3s ease-out',
              }}
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="flex flex-col items-center gap-2 text-slate-400"
              >
                <span className="text-sm font-medium">Scroll to explore</span>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
