import React, { useContext, useState } from 'react'
import { TabsContext } from './tabs'

type labelType = string | number | (number | string)[]
export interface tabsItemProps {
  label: labelType;
  disabled?: boolean;
  index?: string;
}

const TabItem :React.FC<tabsItemProps> = (props) => {
  const context = useContext(TabsContext)
  const { disabled, children,index,label } = props
  // const handleClick = () => {
  //   if(context.onSelect && !disabled && (typeof index === 'string')){
  //     context.onSelect(index)
  //   }
  // }
  const handleClick = () => {
    if(context.onSelect && !disabled && (typeof index === 'string')){
      context.onSelect(index)
    }
  }
  return (
   <li>
      <div onClick={handleClick}>{label}</div>
      <div>
        {children}
      </div>
   </li>
  )
}


TabItem.displayName = 'TabsItem'
export default TabItem