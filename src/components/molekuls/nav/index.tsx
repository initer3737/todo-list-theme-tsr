import React from 'react'
import './nav.css'
import { Link ,NavLink,useLocation } from 'react-router-dom'

export default function Nav() {
    const userOnPage=(wichPath:string)=>{
      const {pathname}=useLocation()
      const lokasiUser=pathname.split('/')
        return lokasiUser[1] === wichPath
    }
  return (
    <nav>
     <div className="nav__inner__link">
        <NavLink to={'/'}>
          home
        </NavLink>
        <NavLink to={'/'}>
          about
        </NavLink>
     </div>
      <NavLink to={'/login'}>
        login
      </NavLink>
    </nav>
  )
}
