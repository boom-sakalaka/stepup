import React, { ReactElement, InputHTMLAttributes,ChangeEvent} from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import classNames from 'classnames' 
import Icon from '../Icon/icon'
type InputSize = 'lg' | 'sm'
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'>{
  disabled?: boolean;
  size?: InputSize;
  icon?: IconProp;
  prepend?: string | ReactElement;
  append?: string | ReactElement;
  onChange? : (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<InputProps> = (props) => {
    const {
      disabled,
      size,
      icon,
      prepend,
      append,
      style,
      ...restProps
    } = props
    const cnames = classNames('stepup-input-wrapper',{
      [`input-size-${size}`]: size,
      'is-disabled': disabled,
      'input-group': prepend || append,
      'input-group-append': !!append,
      'input-group-prepend': !!prepend,
    }) 
    const fixControlledValue = (value: any) => {
      if (typeof value === 'undefined' || value === null) {
        return ''
      }
      return value
    }
    if('value' in props) {
      delete restProps.defaultValue
      restProps.value = fixControlledValue(props.value)
    }
    return (
      <div className={cnames} style={style}>
      {prepend && <div className="stepup-input-group-prepend">{prepend}</div>}
      {icon && <div className="icon-wrapper"><Icon icon={icon} title={`title-${icon}`}/></div>}
      <input 
        className="stepup-input-inner"
        disabled={disabled}
        {...restProps}
      />
      {append && <div className="stepup-input-group-append">{append}</div>}
    </div>
    )
}
export default Input;