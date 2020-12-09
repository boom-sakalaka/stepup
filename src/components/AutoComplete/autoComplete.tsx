import React, { FC, useState, ChangeEvent, ReactElement } from 'react'
import Input ,{ InputProps } from '../Input/input'

interface DataSourceObject {
  value: string;
}

export type DataSourceType <T = {}> = T & DataSourceObject
export interface AutoCompleteProps extends InputProps {
  fetchSuggestions: (str:string) => DataSourceType[];
  onSelct?: (item:DataSourceType) => void;
  renderOption?: (item: DataSourceType) => ReactElement;
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onSelct,
    value,
    renderOption,
    ...restProps
  } = props
  const [inputValue, setInputValue] = useState(value)
  const [sugestions,setSugestions] = useState<DataSourceType[]>([])
  console.log(sugestions)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)
    if(value){
      const results = fetchSuggestions(value)
      setSugestions(results)
    }else{
      setSugestions([])
    }
  }
  const handleSelect = (item :DataSourceType) => {
    setInputValue(item.value)
    setSugestions([])
    if(onSelct){
      onSelct(item)
    }
  }

  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value
  }

  const generateDropdown = () => {
    return (
      <ul>
        {sugestions.map((item,index) => {
          return (
            <li key={index} onClick={() => handleSelect(item)}>
              { renderTemplate(item) }
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <div className="stepup-auto-complete">
        <Input 
          value={inputValue}
          onChange={handleChange}
          {...restProps}
        />
        {
          (sugestions.length > 0 && generateDropdown())
        }
    </div>
  )
}
