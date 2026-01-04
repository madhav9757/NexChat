"use client";

import React from "react";
import ConversationFallback from "@/components/shared/conversation/ConversationFallback";
import { motion } from "framer-motion";

const ConversationPage = () => {
  return (
    /* We use a subtle gradient and overflow-hidden to ensure the 
       background elements don't cause scrollbars.
    */
    <div className="relative h-full hidden lg:flex w-full items-center justify-center bg-white dark:bg-zinc-950 overflow-hidden">
      
      {/* --- POSH BACKGROUND DECORATIONS --- */}
      {/* These ambient glows add depth without being distracting */}
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-blue-50/50 dark:bg-blue-900/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-indigo-50/50 dark:bg-indigo-900/10 blur-[100px] rounded-full pointer-events-none" />

      {/* --- MAIN CONTENT WITH ENTRANCE ANIMATION --- */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ 
          duration: 0.5, 
          ease: [0.22, 1, 0.36, 1] 
        }}
        className="relative z-10 w-full max-w-lg px-8"
      >
        <div className="relative group">
          {/* A subtle outer glow that appears when the page loads */}
          <div className="absolute -inset-10 bg-gradient-to-tr from-blue-500/5 to-indigo-500/5 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          
          <div className="relative">
            <ConversationFallback />
          </div>
        </div>
      </motion.div>

      {/* --- TECHNICAL OVERLAY (OPTIONAL) --- */}
      {/* Adds a very fine grid or noise pattern for that "designer" feel */}
      <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};

export default ConversationPage;