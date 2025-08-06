import React from 'react'
import DesktopNav from './nav/DesktopNav'
import MobileNav from './nav/MobileNav'

const SidebarWrapper = ({ children }) => {
  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row gap-0">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex">
        <DesktopNav />
      </aside>

      {/* Main Content */}
      <main className="flex-1 w-full p-4 pb-24 lg:pb-4">
        {children}
      </main>

      {/* Mobile Bottom Nav */}
      <MobileNav />
    </div>
  )
}

export default SidebarWrapper
