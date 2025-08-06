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

const MobileNav = () => {
  const paths = useNavigation()

  return (
    <TooltipProvider>
      <nav
        className={cn(
          'fixed bottom-4 left-1/2 z-50 -translate-x-1/2 w-[95%] max-w-md',
          'bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md',
          'border border-gray-200 dark:border-neutral-800 shadow-xl',
          'rounded-full p-2 flex justify-around items-center',
          'lg:hidden'
        )}
      >
        {paths.map(({ href, icon, name, active }, index) => (
          <Tooltip key={index} delayDuration={150}>
            <TooltipTrigger asChild>
              <Link href={href} aria-label={name}>
                <Button
                  size="icon"
                  variant="ghost"
                  className={cn(
                    'w-10 h-10 rounded-full transition-colors',
                    active
                      ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300'
                      : 'text-muted-foreground hover:text-primary'
                  )}
                >
                  {icon}
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent
              side="top"
              sideOffset={5}
              className="bg-black text-white text-xs px-2 py-1 rounded-md shadow-md"
            >
              {name}
            </TooltipContent>
          </Tooltip>
        ))}

        {/* Profile/User button */}
        <Tooltip delayDuration={150}>
          <TooltipTrigger asChild>
            <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center border border-gray-300 dark:border-neutral-700">
              <UserButton />
            </div>
          </TooltipTrigger>
          <TooltipContent
            side="top"
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
