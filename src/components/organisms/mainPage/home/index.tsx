import React, {useRef}from 'react'
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
import { IstyleCharsPacks } from '../../../../Types&Interfaces/stylecharspaks/IstyleChar'
import RatuBackend from '../../../../assets/ratuBackend.mp4'
import RajaFrontend from '../../../../assets/rajaFrontend.mp4'
import PadukaFullstek from '../../../../assets/padukaFullstek.mp4'

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y,EffectFade,Parallax } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/scrollbar';
//=======================
//=======================

function Home() {
  const datachars={
    raja:RajaFrontend,
    ratu:RatuBackend,
    paduka:PadukaFullstek,
}
        
const styleCharsPacks={
    raja:{
        card:'raja__front__end__card',
        link:'RajaFrontendLinkHome'
    },
    ratu:{
        card:'ratu__back__end__card',
        link:'ratu__link'
    },
    paduka:{
        card:'paduka__fullstek__card',
        link:'paduka__link'
    }
} satisfies IstyleCharsPacks
    const recoilCharSelect=useRecoilValue(CharsSelect)
    const magSlide=()=>{
        return new Audio(magIn).play()
    }
  return (
    <div className='fullscreen'>
      {/* <div className="home-organism-text-container">
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
      </div> */}
       <Swiper
        className='swipper-container-home'
        modules={[Navigation, EffectFade]}
        spaceBetween={850}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        parallax={true}
        effect={'fade'}
        speed={800}
        loop
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
    >
        <SwiperSlide className='slider-swiper'>
          <div className="swiper-text-container PadukaFullstekLink LoginLink">
          <NavLink to={`/loading/${recoilCharSelect.PadukaFullStek.id}/login`}>
            Login</NavLink>
          </div>
          <div className="swiper-text-container PadukaFullstekLink">
          <NavLink to={`/loading/${recoilCharSelect.PadukaFullStek.id}/show&char`}>
            {recoilCharSelect.PadukaFullStek.role}</NavLink>
          </div>
          <video src={PadukaFullstek} autoPlay loop muted></video>
        </SwiperSlide>
        <SwiperSlide className='slider-swiper'>
          <div className="swiper-text-container RatuBackendLink">
            <NavLink to={`/loading/${recoilCharSelect.RatuBackEnd.id}/show&char`}>
            {recoilCharSelect.RatuBackEnd.role}</NavLink>
          </div>
          <div className="swiper-text-container RatuBackendLink LoginLink">
            <NavLink to={`/loading/${recoilCharSelect.RatuBackEnd.id}/login`}>
            Login</NavLink>
          </div>
          <video src={RatuBackend} autoPlay loop muted ></video>
        </SwiperSlide>
        <SwiperSlide className='slider-swiper'>
          <div className={`swiper-text-container LoginLink ${styleCharsPacks.raja.link}`}>
            <NavLink to={`/loading/${recoilCharSelect.RajaFrontEnd.id}/login`}>
            Login</NavLink>
          </div>
          <div className={`swiper-text-container ${styleCharsPacks.raja.link}`}>
            <NavLink to={`/loading/${recoilCharSelect.RajaFrontEnd.id}/show&char`}>
            {recoilCharSelect.RajaFrontEnd.role}</NavLink>
          </div>
          <video src={RajaFrontend} autoPlay loop muted></video>
        </SwiperSlide>
    </Swiper>
      {/* <div className="data-recoil">
      {
          useMap(recoilCharSelect).map(data =>(
            <div className="card" key={data[1].id}>
              <video src={datachars[data[1].char_id || 'paduka']} autoPlay loop muted className='home-organisms-video'></video>
              <p>char id {data[1].char_id}</p>
              <NavLink to={`/show/${data[1].id}/char`}>{data[1].description.substr(0,40)}...</NavLink>
            </div>
          ))
        }
      </div> */}
      
    </div>
  )
}

export {
    Home
}
