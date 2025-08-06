
import SidebarWrapper from '@/components/shared/sidebar/SidebarWrapper';
import React from 'react'


function layout({children}) {
  return (
    <SidebarWrapper>{children}</SidebarWrapper>
  )
}

export default layout