"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const LoadingLogo = ({ size = 100 }) => {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-[#fafafa] dark:bg-zinc-950">
      <div className="relative flex items-center justify-center">
        {/* Outer Ripple Effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: [0, 0.15, 0], 
            scale: [1, 1.4, 1.8],
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute h-32 w-32 rounded-full border border-blue-500 dark:border-blue-400"
        />

        {/* Inner Glow */}
        <div className="absolute inset-0 blur-2xl bg-blue-500/10 dark:bg-blue-400/5 rounded-full" />

        {/* The Logo Container */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
          style={{ width: size, height: size }}
        >
          <motion.div
            animate={{ 
              y: [0, -8, 0],
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <Image
              src="/logo.svg"
              alt="Nexus Logo"
              width={size}
              height={size}
              className="drop-shadow-2xl brightness-110 dark:brightness-100"
              priority
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Loading Text - Subtle & Elegant */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-400 dark:text-zinc-500">
          Initializing Nexus
        </span>
        
        {/* Minimal Progress Line */}
        <div className="h-[1px] w-24 bg-zinc-200 dark:bg-zinc-800 overflow-hidden relative">
          <motion.div 
            initial={{ left: "-100%" }}
            animate={{ left: "100%" }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute top-0 bottom-0 w-12 bg-gradient-to-r from-transparent via-blue-500 to-transparent"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default LoadingLogo;