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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
          className="h-full w-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </SidebarWrapper>
  );
}

export default Layout;