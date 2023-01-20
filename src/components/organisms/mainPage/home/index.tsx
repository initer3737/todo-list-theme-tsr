import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  useMap,
  Title
} from '../../../../utils'
import { 
  Header 
} from '../../../molekuls'
import './home.css'
import { 
  useRecoilValue
} from 'recoil'
import { 
  CharsSelect 
} from '../../../../globalState'
import magIn from '../../../../assets/mag-slide-in-80901.mp3'
//=======================
//=======================

function Home() {
    const recoilCharSelect=useRecoilValue(CharsSelect)
    const magSlide=()=>{
        return new Audio(magIn).play()
    }
  return (
    <div className=''>
      <div className="home-organism-text-container">
        <div className="card" onMouseEnter={()=>magSlide()}>
          <h5 className="title">title</h5>
          <p className="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, quas laboriosam ducimus excepturi tempore reprehenderit. Vitae quia accusantium, nam officiis rem animi beatae amet temporibus blanditiis perspiciatis impedit cum necessitatibus.</p>
        </div>
        <div className="card" onMouseEnter={()=>magSlide()}>
          <h5 className="title">title</h5>
          <p className="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, quas laboriosam ducimus excepturi tempore reprehenderit. Vitae quia accusantium, nam officiis rem animi beatae amet temporibus blanditiis perspiciatis impedit cum necessitatibus.</p>
        </div>
        <div className="card" onMouseEnter={()=>magSlide()}>
          <h5 className="title">title</h5>
          <p className="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, quas laboriosam ducimus excepturi tempore reprehenderit. Vitae quia accusantium, nam officiis rem animi beatae amet temporibus blanditiis perspiciatis impedit cum necessitatibus.</p>
        </div>
        <div className="card" onMouseEnter={()=>magSlide()}>
          <h5 className="title">title</h5>
          <p className="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, quas laboriosam ducimus excepturi tempore reprehenderit. Vitae quia accusantium, nam officiis rem animi beatae amet temporibus blanditiis perspiciatis impedit cum necessitatibus.</p>
        </div>
      </div>
      <div className="data-recoil">
      {
          useMap(recoilCharSelect).map(data =>(
            <div className="card" key={data[1].id}>
              {/* <p>id : {data[1].id}</p> */}
              <p>name : {data[1].name}</p>
              <p>{data[1].age} years old</p>
              <p className={data[1].mission ??'d-none'}>mission : {data[1].mission}</p>
              <NavLink to={`/show/${data[1].id}/char`}>{data[1].description.substr(0,40)}...</NavLink>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export {
    Home
}
