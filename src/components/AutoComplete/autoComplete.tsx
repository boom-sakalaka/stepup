import React, { FC, useState, ChangeEvent, ReactElement, useEffect } from 'react'
import useDebounce from '../../hooks/useDebounce'
import Input ,{ InputProps } from '../Input/input'
import Icon from '../Icon/icon'

interface DataSourceObject {
  value: string;
}

export type DataSourceType <T = {}> = T & DataSourceObject
export interface AutoCompleteProps extends InputProps {
  fetchSuggestions: (str:string) => DataSourceType[] | Promise<DataSourceType[]>;
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
  const [inputValue, setInputValue] = useState(value as string)
  const [sugestions,setSugestions] = useState<DataSourceType[]>([])
  const [loading,setLoading] = useState(false)
  const debouncedValued = useDebounce(inputValue, 500)
  useEffect(() => {
    if(debouncedValued){
      const results = fetchSuggestions(debouncedValued)
      if(results instanceof Promise){
          results.then(data => {
            setLoading(false)
            setSugestions(data)
          }).catch(e => {
            setLoading(false)
            setSugestions([])
          })
      }else{
        setLoading(false)
        setSugestions(results)
      }
    }else{
      setLoading(false)
      setSugestions([])
    }
  },[debouncedValued,fetchSuggestions])
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)
    setLoading(true)
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
        { loading && (<ul><Icon icon="spinner" spin /></ul>) }
        {
          (sugestions.length > 0 && generateDropdown())
        }
    </div>
  )
}
