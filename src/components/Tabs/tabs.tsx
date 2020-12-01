import React, { Fragment } from 'react'
import { tabsItemProps } from './tabItem'

interface TabsProps {
  defaultIndex?: number;
  onSelect?: (selectIndex: number) => void
}

const Tabs:React.FC<TabsProps> = (props) => {
  const { defaultIndex,onSelect,children } = props

  const renderChild =  React.Children.map(children, (child,index) => {
    const childElement = child as React.FunctionComponentElement<tabsItemProps>
    const { displayName } = childElement.type
    if(displayName && displayName === 'TabsItem'){
      return React.cloneElement(childElement,{
        index: index.toString()
      })
    }
  })
  return (
    <Fragment>
      <ul>
        {renderChild}
      </ul>
    </Fragment>
  )
}

Tabs.defaultProps = {
  defaultIndex: 0
}

export default Tabs

