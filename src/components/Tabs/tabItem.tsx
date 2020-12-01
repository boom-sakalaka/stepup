import React, { Fragment } from 'react'

type labelType = string | number | (number | string)[]
export interface tabsItemProps {
  label: labelType;
  disabled?: boolean;
  index?: string;
}

const TabItem :React.FC<tabsItemProps> = (props) => {
  const { disabled, children,index,label } = props
  return (
   <li>
      <div> {label}</div>
      <div>
        {children}
      </div>
   </li>
  )
}


TabItem.displayName = 'TabsItem'
export default TabItem