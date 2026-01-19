'use client'

import React from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip'
import { useNavigation } from '@/hooks/useNavigation'
import { UserButton } from '@clerk/nextjs'
import { cn } from '@/lib/utils'
import { useConversation } from '@/hooks/useConversation'
import { ModeToggle } from '@/components/ui/theme/ThemeToggle'
import { Badge } from '@/components/ui/badge'

const MobileNav = () => {
  const paths = useNavigation()
  const { isActive } = useConversation()

  // Do not render if in an active conversation to maximize screen real estate
  if (isActive) return null

  return (
    <TooltipProvider>
      <nav
        className={cn(
          "fixed bottom-6 left-1/2 z-50 -translate-x-1/2 w-[90%] max-w-fit px-4 py-3",
          "bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl",
          "border border-white/20 dark:border-zinc-800/50 shadow-2xl shadow-black/10",
          "rounded-[2.5rem] flex items-center justify-center gap-4 lg:hidden"
        )}
      >
        <ul className="flex items-center gap-2">
          {paths.map(({ href, icon: Icon, name, active, count }, index) => (
            <li key={index} className="relative">
              <Link href={href}>
                <Button
                  size="icon"
                  variant="ghost"
                  className={cn(
                    "relative w-12 h-12 rounded-full transition-all duration-500",
                    active ? "text-zinc-950 dark:text-white" : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
                  )}
                >
                  {/* Floating active background pill */}
                  {active && (
                    <motion.div
                      layoutId="mobile-nav-pill"
                      className="absolute inset-0 bg-zinc-100 dark:bg-zinc-800 rounded-full -z-10"
                      transition={{ duration: 0.15 }}
                    />
                  )}

                  <div className="relative">
                    {React.cloneElement(Icon, {
                      className: 'h-6 w-6',
                      strokeWidth: active ? 2 : 1.5
                    })}

                    {count > 0 && (
                      <Badge
                        className="absolute -top-2 -right-2 h-5 min-w-[1.25rem] flex items-center justify-center rounded-full border-2 border-white dark:border-zinc-900 bg-blue-600 text-[10px] font-bold text-white px-1"
                      >
                        {count}
                      </Badge>
                    )}
                  </div>
                </Button>
              </Link>
            </li>
          ))}
        </ul>

        {/* Separator Line */}
        <div className="h-6 w-[1px] bg-zinc-200 dark:bg-zinc-800 mx-1" />

        <div className="flex items-center gap-3">
          <ModeToggle />
          <div className="relative group p-0.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
            <UserButton afterSignOutUrl="/" appearance={{ elements: { avatarBox: "h-8 w-8" } }} />
          </div>
        </div>
      </nav>
    </TooltipProvider>
  )
}

export default MobileNav