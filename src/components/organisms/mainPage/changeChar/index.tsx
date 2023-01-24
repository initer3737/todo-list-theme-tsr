import React, {useEffect, useRef,useState}from 'react'
import { NavLink ,useNavigate,useParams} from 'react-router-dom'
import {
  useMap,
  Title
} from '../../../../utils'
import { 
  Header 
} from '../../../molekuls'
import './changeChar.css'
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
import { Icon } from '../../../atoms'
//=======================
//=======================

function ChangeChar() {
  const [char,setchar]=useState();//char_id
  const datachars={
    raja:RajaFrontend,
    ratu:RatuBackend,
    paduka:PadukaFullstek,
}
   const navigate=useNavigate()  
   const {id}=useParams();   
const styleCharsPacks={
    raja:{
        card:'raja__front__end__card',
        link:'RajaFrontendLink'
    },
    ratu:{
        card:'ratu__back__end__card',
        link:'RatuBackendLink'
    },
    paduka:{
        card:'paduka__fullstek__card',
        link:'PadukaFullstekLink'
    }
} satisfies IstyleCharsPacks
    const recoilCharSelect=useRecoilValue(CharsSelect)
    const magSlide=()=>{
        return new Audio(magIn).play()
    }
        useEffect(()=>{
           useMap(recoilCharSelect)
           .filter(char=>char[1].id == id)
           .map(char=>{
              setchar(char[1].char_id)
           })
        },[])
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
        <video src={datachars[char || 'ratu']} className='video-container-change-char' autoPlay loop ></video>
       {/* <Swiper
        className='swipper-container-change-char'
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
          <NavLink to={`/login/${recoilCharSelect.PadukaFullStek.id}`}>
            Kembali</NavLink>
          </div>
          <div className="swiper-text-container PadukaFullstekLink">
          <NavLink to={`/char/change/${recoilCharSelect.PadukaFullStek.id}`}>
            {recoilCharSelect.PadukaFullStek.role}</NavLink>
          </div>
          <video src={PadukaFullstek} autoPlay loop muted></video>
        </SwiperSlide>
        <SwiperSlide className='slider-swiper'>
          <div className="swiper-text-container RatuBackendLink">
            <NavLink to={`/char/change/${recoilCharSelect.RatuBackEnd.id}`} onClick={(e:React.MouseEvent<HTMLAnchorElement, MouseEvent>)=>{
              navigate(`/char/change/${recoilCharSelect.RatuBackEnd.id}`)
                e.preventDefault()
            }}>
            {recoilCharSelect.RatuBackEnd.role}</NavLink>
          </div>
          <div className="swiper-text-container RatuBackendLink LoginLink">
            <NavLink to={`/login/${recoilCharSelect.RatuBackEnd.id}`}>
            Login</NavLink>
          </div>
          <video src={RatuBackend} autoPlay loop ></video>
        </SwiperSlide>
        <SwiperSlide className='slider-swiper'>
          <div className="swiper-text-container RajaFrontendLink LoginLink">
            <NavLink to={`/login/${recoilCharSelect.RajaFrontEnd.id}`}>
            Login</NavLink>
          </div>
          <div className="swiper-text-container RajaFrontendLink">
            <NavLink to={`/char/change/${recoilCharSelect.RajaFrontEnd.id}`}>
            {recoilCharSelect.RajaFrontEnd.role}</NavLink>
          </div>
          <video src={RajaFrontend} autoPlay loop muted></video>
        </SwiperSlide>
    </Swiper> */}
      <div className={`swiper-text-container ${styleCharsPacks[char || 'ratu'].link} LoginLink`}>
            <NavLink to={`/menu/${id}`}>
              kembali
            </NavLink>
          </div>
    <div className="card-char-container">
      <div className={`card-char ${styleCharsPacks.raja.link}`}>
        {/* <div className={`swiper-text-container ${styleCharsPacks.raja.link} LoginLink`}>
            <NavLink to={`/login/${recoilCharSelect.RajaFrontEnd.id}`}>
            kembali
            </NavLink>
          </div> */}
          <div className={`swiper-text-container ${styleCharsPacks.raja.link}`}>
            <NavLink to={`/char/change/${recoilCharSelect.RajaFrontEnd.id}`}>
            {recoilCharSelect.RajaFrontEnd.role}
            <Icon icon={`check2-square ${recoilCharSelect.RajaFrontEnd.id == Number(id)?'':'d-none'}`} name={' '}/>
            </NavLink>
          </div>
        <video src={RajaFrontend} autoPlay loop muted></video>
      </div>
      <div className={`card-char ${styleCharsPacks.paduka.link}`}>
        {/* <div className={`swiper-text-container ${styleCharsPacks.paduka.link} LoginLink`}>
            <NavLink to={`/login/${recoilCharSelect.PadukaFullStek.id}`}>
              kembali
            </NavLink>
          </div> */}
          <div className={`swiper-text-container ${styleCharsPacks.paduka.link} `}>
            <NavLink to={`/char/change/${recoilCharSelect.PadukaFullStek.id}`}>
            {recoilCharSelect.PadukaFullStek.role}
              <Icon icon={`check2-square ${recoilCharSelect.PadukaFullStek.id == Number(id)?'':'d-none'}`} name={' '}/>
            </NavLink>
          </div>
        <video src={PadukaFullstek} autoPlay loop muted></video>
      </div>
      <div className={`card-char ${styleCharsPacks.ratu.link}`}>
          <div className={`swiper-text-container ${styleCharsPacks.ratu.link} `}>
            <NavLink to={`/char/change/${recoilCharSelect.RatuBackEnd.id}`}>
            {recoilCharSelect.RatuBackEnd.role}
             <Icon icon={`check2-square ${recoilCharSelect.RatuBackEnd.id == Number(id)?'':'d-none'}`} name={' '}/>
            </NavLink>
          </div>
        <video src={RatuBackend} autoPlay loop muted></video>
      </div>
    </div>
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
  ChangeChar
}
