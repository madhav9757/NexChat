'use client'

import React from 'react'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { useConversation } from '@/hooks/useConversation'
import { ScrollArea } from '@/components/ui/scroll-area'
import { motion } from 'framer-motion'

const ItemList = ({ children, title, Action, className }) => {
  const { isActive } = useConversation()

  return (
    <Card
      className={cn(
        'h-full w-full lg:w-[320px] lg:flex-none flex flex-col transition-all duration-300',
        'bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl border-zinc-200/50 dark:border-zinc-800/50',
        'rounded-[1.5rem] lg:rounded-[2rem] shadow-sm overflow-hidden',
        {
          'hidden lg:flex': isActive, 
          'flex': !isActive,           
        },
        className
      )}
    >
      {/* HEADER SECTION */}
      <div className="p-5 pb-3">
        <div className="flex items-center justify-between mb-4">
          <motion.h1 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-100"
          >
            {title}
          </motion.h1>
          
          {Action && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {Action}
            </motion.div>
          )}
        </div>

        {/* Optional: Subtle separator or search bar could go here */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />
      </div>

      {/* CONTENT SECTION */}
      <ScrollArea className="flex-1 px-3">
        <div className="flex flex-col gap-1 py-2">
          {children}
        </div>
      </ScrollArea>
      
      {/* Subtle Footer/Indicator */}
      <div className="h-6 w-full flex items-center justify-center pointer-events-none">
        <div className="h-1 w-8 rounded-full bg-zinc-200 dark:bg-zinc-800 opacity-50" />
      </div>
    </Card>
  )
}

export default ItemList