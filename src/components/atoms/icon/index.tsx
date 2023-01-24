import React from 'react'
 type iconProps={
    icon:string,
    name:string,
    
 }
export default function Icon({icon,name}:iconProps) {
  return (
    <i className={`bi bi-${icon}`}>{name}</i>
  )
}
