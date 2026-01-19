"use client";

import React from 'react';
import DesktopNav from './nav/DesktopNav';
import MobileNav from './nav/MobileNav';
import { motion } from 'framer-motion';

const SidebarWrapper = ({ children }) => {
  return (
    <div className="flex flex-col lg:flex-row h-screen w-full bg-white dark:bg-zinc-950 overflow-hidden">

      {/* --- DESKTOP SIDEBAR --- */}
      {/* We use a subtle border and a slightly different background to create depth */}
      <aside className="hidden lg:flex flex-col h-full border-r border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50/30 dark:bg-zinc-900/20 backdrop-blur-xl">
        <DesktopNav />
      </aside>

      {/* --- MAIN CONTENT --- */}
      {/* - pb-24 on mobile ensures the bottom nav doesn't cover the last message/item.
          - smooth scroll and custom scrollbar styling (optional via CSS)
      */}
      <main className="flex-1 h-full w-full relative overflow-y-auto overflow-x-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15 }}
          className="h-full p-4 lg:p-6 pb-24 lg:pb-6"
        >
          {children}
        </motion.div>
      </main>

      {/* --- MOBILE BOTTOM NAV --- */}
      {/* - Glassmorphism: backdrop-blur-lg + transparent background
          - Floating effect: we use p-4 and a rounded-t-3xl to make it feel detached and modern
      */}
      <div className="fixed bottom-0 left-0 w-full lg:hidden z-50 px-4 pb-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl border border-zinc-200/50 dark:border-zinc-800/50 shadow-[0_-8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] overflow-hidden"
        >
          <MobileNav />
        </motion.div>
      </div>
    </div>
  );
};

export default SidebarWrapper;