import React, { Fragment,createContext, useState } from 'react'
import { tabsItemProps } from './tabItem'
type SelectCallback = (selectedIndex: string) => void
interface TabsProps {
  defaultIndex?: string;
  onSelect?:SelectCallback
}

interface ITabsContext {
  index : string;
  onSelect?: SelectCallback;
}
export const TabsContext = createContext<ITabsContext>({index: '0'})
const Tabs:React.FC<TabsProps> = (props) => {
  const { defaultIndex,onSelect,children } = props
  const [currentIndex, setActive] = useState(defaultIndex)
  const handleClikc = (index : string) => {
    alert(index)
    setActive(index)
    if(onSelect) {
      onSelect(index)
    }
  }
  const passedContext : ITabsContext = {
      index: currentIndex ? currentIndex: '0',
      onSelect: handleClikc
  }
  const renderChild = () => {
    return React.Children.map(children, (child,index) => {
      const childElement = child as React.FunctionComponentElement<tabsItemProps>
      const { displayName } = childElement.type
      if(displayName && displayName === 'TabsItem'){
        return React.cloneElement(childElement, {
          index: index.toString()
        })
      }
    })
  }
  return (
    <Fragment>
      <ul>
        <TabsContext.Provider value= {passedContext}>
          {renderChild()}
        </TabsContext.Provider>
      </ul>
    </Fragment>
  )
}

Tabs.defaultProps = {
  defaultIndex: '0'
}

export default Tabs

