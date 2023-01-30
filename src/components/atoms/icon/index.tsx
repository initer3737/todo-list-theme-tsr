import React from 'react'
 type iconProps={
    icon:string,
    name:string,
    children?:React.ReactNode
    id?:string,
    onClick?:React.MouseEventHandler<HTMLElement> 
 }
export default function Icon({icon,name,onClick,id,children}:iconProps) {
  return (
    <i className={`bi bi-${icon}`} id={id} onClick={onClick}>{name} {children}</i>
  )
}
