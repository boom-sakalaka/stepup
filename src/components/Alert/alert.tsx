import React from 'react'
import classNames from 'classnames'

export enum AlertType {
  Success = 'success',
  Default = 'default',
  Danger = 'danger',
  Warning = 'warning',
}

interface BaseAlertProps {
  className ?: string;
  alertType ?: AlertType;
  showClose ?: boolean;
  title ?: string;
  content ?: string;
  isShowAlert : boolean;
}

type NativeAlertProps = BaseAlertProps & React.ButtonHTMLAttributes<HTMLElement>
type AnchorAlertProps = BaseAlertProps & React.AnchorHTMLAttributes<HTMLElement>
export type AlertProps = Partial<NativeAlertProps & AnchorAlertProps>

const Alert: React.FC<AlertProps> = (props) => {
  const { 
    className, 
    alertType, 
    showClose,
    title,
    content,
    isShowAlert,
    onClick,
    ...restProps
  } = props
  const classes = classNames('alert', className, {
    [`alert-${alertType}`] : alertType
  })
  if(isShowAlert){
    return (
      <div 
      className={classes}
      { ...restProps}
      >
     {showClose ? <div className="alert-closeIcon" onClick={onClick}>关闭</div> : ''}
     { title ? <div className="alert-title">{title}</div>: ''}
     { content ? <div className="alert-content">{content}</div> : ''}
    </div>
    )
  }else {
    return (<div style={{display:"none"}}></div>)
  }
}

export default Alert

Alert.defaultProps = {
  showClose: true,
  alertType: AlertType.Default
}