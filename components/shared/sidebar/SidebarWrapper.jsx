import React from 'react';
import DesktopNav from './nav/DesktopNav';
import MobileNav from './nav/MobileNav';

const SidebarWrapper = ({ children }) => {
  return (
    <div className="flex flex-col lg:flex-row h-full">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block lg:w-fit border-r border-transparent bg-transparent transition-all duration-300 ease-in-out">
        <DesktopNav />
      </aside>

      {/* Main Content */}
      <main className="flex-1 w-full p-4 pb-24 lg:pb-4 overflow-y-auto">
        {children}
      </main>

      {/* Mobile Bottom Nav */}
      <div className="fixed bottom-0 left-0 w-full lg:hidden z-50">
        <MobileNav />
      </div>
    </div>
  );
};

export default SidebarWrapper;