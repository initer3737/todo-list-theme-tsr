import React from 'react'
import './notFound.css'
import RajaFrontend from '../../../assets/rajaFrontend.mp4'
import { NavLink ,useParams ,useNavigate} from 'react-router-dom'
import { RouterSmooth } from '../../../services'
//====================================================
export default function NotFound() {
    const {id}=useParams()
    const navigate=useNavigate()
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
        <h5 onClick={()=>navigate(-3)} className={'btn-back-404'}>
           Go Back 
        </h5>
      </div>
    </RouterSmooth>
  )
}
