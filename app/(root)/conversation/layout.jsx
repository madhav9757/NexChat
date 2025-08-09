// /app/conversation/layout.jsx
import ItemList from '@/components/shared/item-list/ItemList'
import React from 'react'

const Layout = ({ children }) => {
  return (
    <div className='h-full flex'>
      <ItemList title="Conversation">Conversation Page</ItemList>
      {children}
    </div>
  )
}

export default Layout
