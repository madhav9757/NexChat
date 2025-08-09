'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@radix-ui/react-tooltip'
import { useNavigation } from '@/hooks/useNavigation'
import { UserButton } from '@clerk/nextjs'
import { cn } from '@/lib/utils'
import { useConversation } from '@/hooks/useConversation'
import { ModeToggle } from '@/components/ui/theme/ThemeToggle'
import { Badge } from '@/components/ui/badge'

// This component renders a horizontal navigation bar for mobile.
const MobileNav = () => {
  const paths = useNavigation()
  const { isActive } = useConversation()

  if (isActive) return null

  return (
    <TooltipProvider>
      <nav
        className={cn(
          // Positioning and sizing for a horizontal bar
          'fixed bottom-4 left-1/2 z-50 -translate-x-1/2 w-[95%] max-w-md',
          'bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md',
          'border border-gray-200 dark:border-neutral-800 shadow-xl',
          'rounded-full p-2 flex justify-around items-center gap-2', // Changed to flex for horizontal layout
          'lg:hidden'
        )}
      >
        {/* Navigation links */}
        {paths.map(({ href, icon, name, active, count }, index) => (
          <Tooltip key={index} delayDuration={150}>
            <TooltipTrigger asChild>
              <Link href={href} aria-label={name}>
                <Button
                  size="icon"
                  variant="ghost"
                  className={cn(
                    'relative w-10 h-10 rounded-full transition-colors', // Changed to rounded-full
                    active
                      ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300'
                      : 'text-muted-foreground hover:text-primary'
                  )}
                >
                  {icon}
                  {count > 0 && (
                    <Badge
                      className="absolute -top-1 -right-1 text-xs px-1 py-0 h-4 min-w-[1rem] flex items-center justify-center rounded-full"
                      variant="destructive"
                    >
                      {count}
                    </Badge>
                  )}
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent
              side="top" // Tooltip is now on the top
              sideOffset={5}
              className="bg-black text-white text-xs px-2 py-1 rounded-md shadow-md"
            >
              {name}
            </TooltipContent>
          </Tooltip>
        ))}

        {/* Theme toggle */}
        <Tooltip delayDuration={150}>
          <TooltipTrigger asChild>
            <div>
              <ModeToggle />
            </div>
          </TooltipTrigger>
          <TooltipContent
            side="top" // Tooltip is now on the top
            sideOffset={5}
            className="bg-black text-white text-xs px-2 py-1 rounded-md shadow-md"
          >
            Theme
          </TooltipContent>
        </Tooltip>

        {/* User/Profile button */}
        <Tooltip delayDuration={150}>
          <TooltipTrigger asChild>
            <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center border border-gray-300 dark:border-neutral-700">
              <UserButton />
            </div>
          </TooltipTrigger>
          <TooltipContent
            side="top" // Tooltip is now on the top
            sideOffset={5}
            className="bg-black text-white text-xs px-2 py-1 rounded-md shadow-md"
          >
            Profile
          </TooltipContent>
        </Tooltip>
      </nav>
    </TooltipProvider>
  )
}

export default MobileNav
