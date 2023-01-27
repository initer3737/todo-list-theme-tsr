import React, { useEffect,useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import Cookies from 'js-cookie'
import { AxiosResponse } from 'axios'
import { Http } from '../../../../services'
import RatuBackend from '../../../../assets/ratuBackend.mp4'
import RajaFrontend from '../../../../assets/rajaFrontend.mp4'
import PadukaFullstek from '../../../../assets/padukaFullstek.mp4'
import { useRecoilValue } from 'recoil'
import'./todo.css'
import { CharsSelect } from '../../../../globalState'
import { useMap } from '../../../../utils'
import { Icon } from '../../../atoms'
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
function Game() {
  const [user,setUser]=useState<ILists>() 
  const token= Cookies.get('token')??''
  const [char,setChar]=useState()
  const [pause,setPause]=useState<Boolean>(true)
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
          link:'RajaFrontendLinkMenu',
          pauseTitle:'pauseTitle-raja'
      },
      ratu:{
          card:'RatuBackendCard',
          link:'RatuBackendLinkMenu',
          pauseTitle:'pauseTitle-ratu'
      },
      paduka:{
          card:'PadukaFullstekCard',
          link:'PadukaFullstekLinkMenu',
          pauseTitle:'pauseTitle-paduka'
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
          <video src={datachars[char || 'ratu']} autoPlay loop className='menu-video'></video>
          <div className={`link-wrapper pause-btn ${styleCharsPacks[char || 'ratu'].link}`}>
              <h2 className={`title-game-pause ${styleCharsPacks[char || 'ratu'].pauseTitle}`}>
                pause <Icon icon={'pause-circle'} name={''}/>
              </h2>
            </div>
          <div className={`game-container ${styleCharsPacks[char || 'ratu'].card}`}>
            <div className={`link-wrapper ${styleCharsPacks[char || 'ratu'].link}`}>
              <h2 className={`title-game-pause ${styleCharsPacks[char || 'ratu'].pauseTitle}`}>paused <Icon icon={'pause-circle'} name={''}/></h2>
            </div>
            <div className={`link-wrapper ${styleCharsPacks[char || 'ratu'].link}`}>
              <NavLink to={''} className={``}>
                continue <Icon icon={'play-circle'} name={''}/>
              </NavLink>
            </div>
            <div className={`link-wrapper ${styleCharsPacks[char || 'ratu'].link}`}>
              <NavLink to={`/loading/${id}/menu`} className={``}>
                back to main menu <Icon icon={'play-circle'} name={''}/>
              </NavLink>
            </div>
            <div className={`link-wrapper ${styleCharsPacks[char || 'ratu'].link}`}>
              <NavLink to={`/loading/${id}/char&change`} className={''}>
                settings <Icon icon={'gear'} name={''}/>
              </NavLink>
            </div>
          </div>
        </div>
  )
}

export {Game}