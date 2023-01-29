import React from 'react'
 type iconProps={
    icon:string,
    name:string,
    id?:string,
    onClick?:React.MouseEventHandler<HTMLElement> 
 }
export default function Icon({icon,name,onClick,id}:iconProps) {
  return (
    <i className={`bi bi-${icon}`} id={id} onClick={onClick}>{name}</i>
  )
}
