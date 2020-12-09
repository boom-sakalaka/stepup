import React, { FC, useState, ChangeEvent, ReactElement } from 'react'
import Input ,{ InputProps } from '../Input/input'

export interface AutoCompleteProps extends InputProps {
  fetchSuggestions: (str:string) => string[];
  onSelct?: (item:string) => void;
  renderOption?: (item: string) => ReactElement;
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onSelct,
    value,
    ...restProps
  } = props
  const [inputValue, setInputValue] = useState(value)
  const [sugestions,setSugestions] = useState<string[]>([])
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
  const handleSelect = (item :string) => {
    setInputValue(item)
    setSugestions([])
    if(onSelct){
      onSelct(item)
    }
  }
  const generateDropdown = () => {
    return (
      <ul>
        {sugestions.map((item,index) => {
          return (
            <li key={index} onClick={() => handleSelect(item)}>
              {item}
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
