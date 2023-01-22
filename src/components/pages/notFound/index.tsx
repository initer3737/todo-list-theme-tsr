import React from 'react'
import './notFound.css'
import RajaFrontend from '../../../assets/rajaFrontend.mp4'
import { NavLink } from 'react-router-dom'
//====================================================
export default function NotFound() {
  return (
    <div>
      <video src={RajaFrontend} loop autoPlay className='notFoundvideo'></video>
      <div className="not-found-message">
        <p>
          404 page not found
        </p>
        <p>
          content you are search was not found in this page
        </p>
        <NavLink to={'/'}>
           Go Back
        </NavLink>
      </div>
    </div>
  )
}
