import ItemList from '@/components/shared/item-list/ItemList'
import React from 'react'


function layout({ children }) {
  return (
    <div className='flex'>
      <ItemList title="Conversation">Conversation Page</ItemList>
      {children}
    </div>
  )
}

export default layout