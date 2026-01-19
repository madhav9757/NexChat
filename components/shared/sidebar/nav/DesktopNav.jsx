'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip'
import { useNavigation } from '@/hooks/useNavigation'
import { UserButton } from '@clerk/nextjs'
import { ModeToggle } from '@/components/ui/theme/ThemeToggle'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const DesktopNav = () => {
  const paths = useNavigation()

  return (
    <TooltipProvider>
      {/* Using bg-zinc-50/50 for a light glass look and 
          removing the default Card border for a cleaner silhouette 
      */}
      <div className="hidden lg:flex lg:flex-col lg:justify-between h-full w-20 px-4 py-8 border-r border-zinc-200/60 dark:border-zinc-800/60 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl transition-all duration-300">

        {/* Navigation Section */}
        <nav className="flex flex-col items-center gap-8">
          <ul className="flex flex-col items-center gap-2 w-full">
            {paths.map(({ href, icon: Icon, name, active, count }, index) => (
              <li key={index} className="relative w-full flex justify-center py-1">
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Link
                      href={href}
                      className="relative flex items-center justify-center"
                    >
                      {/* Posh Active Indicator: Slides behind the icon */}
                      {active && (
                        <motion.div
                          layoutId="active-pill"
                          className="absolute inset-0 w-12 h-12 bg-zinc-900 dark:bg-zinc-100 rounded-2xl"
                          transition={{ duration: 0.15 }}
                        />
                      )}

                      <Button
                        size="icon"
                        variant="ghost"
                        className={cn(
                          "relative w-12 h-12 rounded-2xl transition-colors duration-300 z-10",
                          active
                            ? "text-white dark:text-zinc-900 shadow-lg shadow-zinc-400/20 dark:shadow-none"
                            : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        )}
                      >
                        <div className="relative flex items-center justify-center">
                          {React.cloneElement(Icon, {
                            className: 'h-6 w-6',
                            strokeWidth: active ? 2 : 1.5 // Thinner stroke for inactive items looks posh
                          })}

                          {/* Modern Notification Badge */}
                          {count > 0 && (
                            <Badge
                              className={cn(
                                "absolute -top-2 -right-2 px-1.5 py-0.5 min-w-[1.25rem] h-5 flex items-center justify-center rounded-full border-2 border-white dark:border-zinc-900 text-[10px] font-bold",
                                active ? "bg-red-500 text-white" : "bg-blue-600 text-white"
                              )}
                            >
                              {count}
                            </Badge>
                          )}
                        </div>
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right" sideOffset={10} className="font-medium">
                    {name}
                  </TooltipContent>
                </Tooltip>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer Section */}
        <div className="flex flex-col items-center gap-y-8">
          <div className="p-2 rounded-2xl bg-zinc-100 dark:bg-zinc-900/50">
            <ModeToggle />
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-500" />
            <div className="relative border-2 border-white dark:border-zinc-900 rounded-full">
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "h-9 w-9 rounded-full"
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}

export default DesktopNav