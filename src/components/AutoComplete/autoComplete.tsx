import React, { FC, useState, ChangeEvent } from 'react'
import Input ,{ InputProps } from '../Input/input'

export interface AutoCompleteProps extends InputProps {
  fetchSuggestions: (str:string) => string[];
  onSelct?: (item:string) => void;
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onSelct,
    value,
    ...restProps,
  } = props
  const [inputValue, setInputValue] = useState(value)
  const [sugestions,setSugestions] = useState<string[]>([])
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
  
  return (
    <div className="stepup-auto-complete">
        <Input 
          value={inputValue}
          onChange={handleChange}
          {...restProps}
        />
    </div>
  )
}
