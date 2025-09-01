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

const MobileNav = () => {
  const paths = useNavigation()
  const { isActive } = useConversation()

  if (isActive) return null

  return (
    <TooltipProvider>
      <nav
        className={cn(
          // Outer container: fixed, centered, and responsive
          'fixed bottom-4 left-1/2 z-50 -translate-x-1/2 w-[95%] max-w-md',
          'bg-card/80 dark:bg-card/80 backdrop-blur-md',
          'border border-border shadow-xl',
          'rounded-full p-2 flex justify-around items-center gap-2',
          'lg:hidden'
        )}
      >
        {/* Navigation links */}
        {paths.map(({ href, icon: Icon, name, active, count }, index) => (
          <Tooltip key={index} delayDuration={150}>
            <TooltipTrigger asChild>
              <Link href={href} aria-label={name}>
                <Button
                  size="icon"
                  variant="ghost"
                  className={cn(
                    'relative w-11 h-11 rounded-full transition-all duration-300',
                    active
                      ? 'bg-primary/10 text-primary hover:bg-primary/20'
                      : 'text-muted-foreground hover:bg-primary/10 hover:text-primary'
                  )}
                >
                  {/* Icon with consistent sizing */}
                  {React.cloneElement(Icon, { className: 'h-6 w-6' })}
                  {/* Badge for notifications */}
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
              side="top"
              sideOffset={5}
              className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded-md shadow-md"
            >
              {name}
            </TooltipContent>
          </Tooltip>
        ))}

        {/* Theme toggle and User/Profile button */}
        <div className="flex items-center gap-2">
          <Tooltip delayDuration={150}>
            <TooltipTrigger asChild>
              <ModeToggle />
            </TooltipTrigger>
            <TooltipContent
              side="top"
              sideOffset={5}
              className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded-md shadow-md"
            >
              Theme
            </TooltipContent>
          </Tooltip>
          <Tooltip delayDuration={150}>
            <TooltipTrigger asChild>
              {/* UserButton wrapped to control styling */}
              <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center border-2 border-transparent hover:border-border transition-colors">
                <UserButton />
              </div>
            </TooltipTrigger>
            <TooltipContent
              side="top"
              sideOffset={5}
              className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded-md shadow-md"
            >
              Profile
            </TooltipContent>
          </Tooltip>
        </div>
      </nav>
    </TooltipProvider>
  )
}

export default MobileNav