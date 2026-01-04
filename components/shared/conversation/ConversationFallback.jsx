"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageSquare, Sparkles, PlusCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const ConversationFallback = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center px-4">
      {/* --- ICON COMPOSITION --- */}
      <div className="relative mb-8">
        {/* Floating Background Sparkle */}
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-6 -right-6 text-blue-500/40 dark:text-blue-400/30"
        >
          <Sparkles size={32} />
        </motion.div>

        {/* Main Icon with Glassmorphism Effect */}
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [-10, 0, -10] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10 w-24 h-24 rounded-[2.5rem] bg-white dark:bg-zinc-900 shadow-2xl shadow-blue-500/10 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center"
        >
          <MessageSquare 
            className="w-10 h-10 text-zinc-400 dark:text-zinc-500" 
            strokeWidth={1.5} 
          />
        </motion.div>

        {/* Shadow under the floating icon */}
        <motion.div 
          animate={{ scale: [0.8, 1.1, 0.8], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-2 bg-zinc-900/10 dark:bg-white/10 blur-md rounded-full"
        />
      </div>

      {/* --- TYPOGRAPHY --- */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-3"
      >
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Your Workspace
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 max-w-[280px] text-sm leading-relaxed mx-auto font-medium">
          Select a chat from the sidebar or start a new conversation to get things moving.
        </p>
      </motion.div>

      {/* --- QUICK ACTIONS --- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-8 flex items-center gap-3"
      >
        <Button 
          variant="outline" 
          className="rounded-full h-10 px-5 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all gap-2 text-xs font-semibold uppercase tracking-wider"
        >
          <Search size={14} strokeWidth={2.5} />
          Find Chat
        </Button>
        <Button 
          className="rounded-full h-10 px-5 bg-zinc-900 dark:bg-zinc-50 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 transition-all gap-2 text-xs font-semibold uppercase tracking-wider shadow-lg shadow-zinc-200 dark:shadow-none"
        >
          <PlusCircle size={14} strokeWidth={2.5} />
          New Group
        </Button>
      </motion.div>
    </div>
  );
};

export default ConversationFallback;