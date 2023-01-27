import React from 'react'
import './notFound.css'
import RajaFrontend from '../../../assets/rajaFrontend.mp4'
import { NavLink ,useParams } from 'react-router-dom'
import { RouterSmooth } from '../../../services'
//====================================================
export default function NotFound() {
    const {id}=useParams()
  return (
    <RouterSmooth>
      <video src={RajaFrontend} loop autoPlay className='notFoundvideo'></video>
      <div className="not-found-message">
        <p>
          404 page not found
        </p>
        <p>
          content you are search was not found in this page
        </p>
        <NavLink to={`/loading/${id}/home`}>
           Go Back 
        </NavLink>
      </div>
    </RouterSmooth>
  )
}
