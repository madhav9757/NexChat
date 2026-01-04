"use client";

import SidebarWrapper from '@/components/shared/sidebar/SidebarWrapper';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * The Layout component acts as the high-level boundary for the authenticated app.
 * It wraps all children (Conversations, Friends, Settings) in the Posh Sidebar.
 */
function Layout({ children }) {
  return (
    <SidebarWrapper>
      {/* AnimatePresence allows us to animate children out when they unmount.
          We use a subtle scale and fade for that "premium" page transition feel.
      */}
      <AnimatePresence mode="wait">
        <motion.div
          key="main-content"
          initial={{ opacity: 0, scale: 0.99, y: 5 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.99, y: -5 }}
          transition={{ 
            duration: 0.3, 
            ease: [0.22, 1, 0.36, 1] // Custom cubic-bezier for "posh" physics
          }}
          className="h-full w-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </SidebarWrapper>
  );
}

export default Layout;