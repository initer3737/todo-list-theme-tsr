import React, { useEffect,useState } from 'react'
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom'
import Cookies from 'js-cookie'
import { AxiosResponse } from 'axios'
import { Http } from '../../../../services'
import RatuBackend from '../../../../assets/ratuBackend.mp4'
import RajaFrontend from '../../../../assets/rajaFrontend.mp4'
import PadukaFullstek from '../../../../assets/padukaFullstek.mp4'
import { useRecoilValue } from 'recoil'
import'./credit.css'
import { CharsSelect } from '../../../../globalState'
import { useMap } from '../../../../utils'
//=======================
  type Tdata={
    id:string,
    username:string,
    email:string,
  }
 interface ILists{
   data:Tdata,
 }
//============
function CreditList() {
  const [user,setUser]=useState<ILists>() 
  const token= Cookies.get('token')??''
  const [char,setChar]=useState()
  const chars=useRecoilValue(CharsSelect)
  const {id}=useParams()
  const filterDataChar=useMap(chars).filter(char=>char[1].id == id)
  const navigate=useNavigate()
  const logout=()=>{
       try {
            Http.get('/logout')
          .then((res:AxiosResponse)=>{
              if(res.status === 200){
                Cookies.remove('token')
                navigate('/login')
          }
       })
       } catch (err) {
          console.log(err)
       }
  }
  useEffect(()=>{
    filterDataChar.map(char=>{
      setChar(char[1].char_id)
    })
  },[])
      // useEffect(()=>{
      //   try {
      //     const getDataUser=async()=>{
      //      await Http.get<ILists>('/lists')
      //         .then((res: AxiosResponse<ILists>)=>{
      //             setUser({...res.data}) 
      //             if(res.status === 401)navigate('/login')
      //             //memasukkan object dengan property data ke dalam state
      //         })
      //     }
      //     getDataUser()
          
      //   } catch (err) {
      //     console.log('err',err);
      //   }
      // },[])
      // useEffect(()=>{
      //   if(token.trim().length<1)navigate('/login')
      // },[token])
 //=====================================    
 //============char style
 const styleCharsPacks={
      raja:{
          card:'RajaFrontendCard',
          link:'RajaFrontendLinkCredit'
      },
      ratu:{
          card:'RatuBackendCard',
          link:'RatuBackendLinkMenu'
      },
      paduka:{
          card:'PadukaFullstekCardCredit',
          link:'PadukaFullstekLinkCredit'
      } 
    }
 //============char style 
 //===========video chars
 const datachars={
  raja:RajaFrontend,
  ratu:RatuBackend,
  paduka:PadukaFullstek,
}
 //===========video chars
  return (
        <div>
          <video src={datachars[char || 'ratu']} autoPlay loop className='kredit-video'></video>
          <div className={`menu-container ${styleCharsPacks[char || 'ratu'].card}`}>
            <div className={`link-wrapper-credit ${styleCharsPacks[char || 'ratu'].link}`}>
              <p  className={`credit-text`}>
                kredit lists
              </p>
            </div>
            <div className={`link-wrapper-credit ${styleCharsPacks[char || 'ratu'].link}`}>
              <a href={'https://www.instagram.com/mr.vaank/'} target='_blank' className={''}>
                animations by mr_vaank
              </a>
            </div>
            <div className={`link-wrapper-credit ${styleCharsPacks[char || 'ratu'].link}`}>
              <a href={'https://steamcommunity.com/id/vaank/myworkshopfiles/'} target='_blank' className={''}>
                wallpaper engine by mr_vaank
              </a>
            </div>
            <div className={`link-wrapper-credit ${styleCharsPacks[char || 'ratu'].link}`}>
              <a href={'https://www.riotgames.com/en'} target='_blank' className={''}>
                ilustrations by riot
              </a>
            </div>
            <div className={`link-wrapper-credit ${styleCharsPacks[char || 'ratu'].link}`}>
              <NavLink to={''} target='_blank' className={''}>
                unique skill 
              </NavLink>
            </div>
            <div className={`link-wrapper-credit ${styleCharsPacks[char || 'ratu'].link}`}>
              <a href={'https://pixabay.com/vectors/wreath-olympic-winner-first-gray-305111/'} target='_blank' className={''}>
                emblem
              </a>
            </div>
            <div className={`link-wrapper-credit ${styleCharsPacks[char || 'ratu'].link}`}>
              <a href={'https://icons.getbootstrap.com/'} target='_blank' className={''}>
                bootstrap icon 
              </a>
            </div>
            <div className={`link-wrapper-credit ${styleCharsPacks[char || 'ratu'].link}`}>
              <a href={'https://pixabay.com/'} target='_blank' className={''}>
                pixabay
              </a>
            </div>
            <div className={`link-wrapper-credit ${styleCharsPacks[char || 'ratu'].link}`}>
              <a href={'https://freesvg.org/el-lissitzky-beat-the-whites-with-the-red-wedge'} target='_blank' className={''}>
                loading asset
              </a>
            </div>
            <div className={`link-wrapper-credit ${styleCharsPacks[char || 'ratu'].link}`}>
              <a href={'https://pixabay.com/sound-effects/water-splash-80537/'} target='_blank' className={''}>
                water splash
              </a>
            </div>
            <div className={`link-wrapper-credit ${styleCharsPacks[char || 'ratu'].link}`}>
              <a href={'https://www.youtube.com/watch?v=L2GRCLohdD4'} target='_blank' className={''}>
                electrict splash
              </a>
            </div>
            <div className={`link-wrapper-credit ${styleCharsPacks[char || 'ratu'].link}`}>
              <NavLink to={`/loading/${id}/menu`} className={''}>
                back
              </NavLink>
            </div>
          </div>
        </div>
  )
}

export {CreditList}