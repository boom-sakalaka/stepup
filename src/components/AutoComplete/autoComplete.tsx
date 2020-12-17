import React, { FC, useState, ChangeEvent, ReactElement, useEffect,KeyboardEvent, useRef } from 'react'
import classNames from 'classnames'
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
  const [highlightIndex, setHighlightIndex] = useState(-1)
  const isSeachCtr = useRef(false)
  const debouncedValued = useDebounce(inputValue, 500)
  useEffect(() => {
    if(debouncedValued && isSeachCtr.current){
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
    setHighlightIndex(-1)
  },[debouncedValued,fetchSuggestions])
  const highLight = (index : number) => {
    if(index < 0) index = 0
    if(index >= sugestions.length) {
      index = sugestions.length -1
    }
    setHighlightIndex(index)
  }
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      case 13: 
        if(sugestions[highlightIndex]){
          handleSelect(sugestions[highlightIndex])
        }
        break;
      case 38:
        highLight(highlightIndex -1) 
        break;
      case 40:
        highLight(highlightIndex +1) 
        break;
      case 27:
        setSugestions([])
        break;
      default:
        break;
    }
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)
    setLoading(true)
    isSeachCtr.current = true
  }
  const handleSelect = (item :DataSourceType) => {
    setInputValue(item.value)
    setSugestions([])
    if(onSelct){
      onSelct(item)
    }
    isSeachCtr.current = false
  }

  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value
  }

  const generateDropdown = () => { 
    return (
      <ul>
        {sugestions.map((item,index) => {
          const cnames = classNames('suggestion-item', {
            'item-highLighted': index === highlightIndex
          })
          return (
            <li className={cnames} key={index} onClick={() => handleSelect(item)}>
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
          onKeyDown={handleKeyDown}
          {...restProps}
        />
        { loading && (<ul><Icon icon="spinner" spin /></ul>) }
        {
          (sugestions.length > 0 && generateDropdown())
        }
    </div>
  )
}
