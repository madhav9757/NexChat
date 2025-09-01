'use client'

import React from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip'
import { useNavigation } from '@/hooks/useNavigation'
import { UserButton } from '@clerk/nextjs'
import { ModeToggle } from '@/components/ui/theme/ThemeToggle'
import { Badge } from '@/components/ui/badge'

const DesktopNav = () => {
  const paths = useNavigation()

  return (
    <TooltipProvider>
      <Card className="hidden lg:flex lg:flex-col lg:justify-between h-full w-16 px-2 py-4 shadow-xl border-r border-border/50 bg-background transition-all duration-300">
        {/* Navigation Section */}
        <nav className="w-full">
          <ul className="flex flex-col items-center gap-4">
            {paths.map(({ href, icon: Icon, name, active, count }, index) => (
              <li key={index} className="relative w-full flex justify-center">
                {active && (
                  <span className="absolute left-[-16px] top-1/2 -translate-y-1/2 h-8 w-1.5 rounded-r-lg bg-primary transition-all duration-300" />
                )}

                <Tooltip delayDuration={100}>
                  <TooltipTrigger asChild>
                    <Link
                      href={href}
                      aria-label={name}
                      aria-current={active ? 'page' : undefined}
                      className="relative"
                    >
                      <Button
                        size="icon"
                        variant={active ? 'default' : 'ghost'}
                        className="w-10 h-10 relative group-hover:bg-accent group-hover:text-accent-foreground"
                      >
                        <div className="flex items-center justify-center">
                          {React.cloneElement(Icon, { className: 'h-6 w-6' })}
                          {count > 0 && (
                            <Badge
                              className="absolute -top-1 -right-1 text-xs font-bold px-1 py-0 h-4 min-w-[1rem] flex items-center justify-center rounded-full"
                              variant="destructive"
                            >
                              {count}
                            </Badge>
                          )}
                        </div>
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">{name}</TooltipContent>
                </Tooltip>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer Section */}
        <div className="flex flex-col items-center gap-y-6">
          <ModeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </Card>
    </TooltipProvider>
  )
}

export default DesktopNav