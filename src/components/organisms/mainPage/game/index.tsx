import React, { useEffect,useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import Cookies from 'js-cookie'
import { AxiosResponse } from 'axios'
import { Http } from '../../../../services'
import RatuBackend from '../../../../assets/ratuBackend.mp4'
import RajaFrontend from '../../../../assets/rajaFrontend.mp4'
import PadukaFullstek from '../../../../assets/padukaFullstek.mp4'
import { useRecoilValue } from 'recoil'
import'./game.css'
import { CharsSelect } from '../../../../globalState'
import { useMap } from '../../../../utils'
import { Icon } from '../../../atoms'
import splash from '../../../../assets/water-splash.mp3'
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
  const [pause,setPause]=useState<Boolean>(false)
  const [pop,setPop]=useState<Boolean>(false)
  const [point,setPoint]=useState<number>(0)
  const randPoint=Math.floor(Math.random()*10)
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
    // acak
      type acakProps={x:number,y:number,unit:string}
    const acak=({x,y,unit}:acakProps)=>{
        const randomize=(number:number)=>Math.floor(Math.random()*number)
      const target=document.getElementById('target')?.style
        target!.position='absolute'
        target!.transform=`translateY(${randomize(y)} ${unit}) translateX(${randomize(x)}) ${unit}`
          
    }
    const randPosition=setInterval(()=>{
      acak({x:1200,y:400,unit:'px'})
      // const target=document.getElementById('target')?.style
      //   target!.position='absolute'
      //   target!.transform=`translateY(${randomize(400)}) translateX(${randomize(1200)})`
    },3000)
      ;
      ()=>{
        clearInterval(randPosition)
      }
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
        <div className='parent-game-container'>
          <video src={datachars[char || 'ratu']} autoPlay loop className='game-video'></video>
          <div className={`${pause?"filter-pause":'filter-continue'}`}></div>
          {/* point */}
            <div className="game-point-container">
              <h4 className={`game-point`}>score: {point}</h4>
              <h4 className={`point-random ${pop==true?'':'d-none'}`}>+point {randPoint}</h4>
            </div>
          {/* pause btn */}
          <div className={`link-wrapper pause-btn ${styleCharsPacks[char || 'ratu'].link}`}>
              <h2 className={`title-game-pause ${styleCharsPacks[char || 'ratu'].pauseTitle}`} onClick={()=>setPause(true)}>
                pause <Icon icon={'pause-circle'} name={''}/>
              </h2>
            </div>
            {/* pause menu */}
          <div className={`${pause?'pause-container-togled':'pause-container'}
 ${styleCharsPacks[char || 'ratu'].card}`}>
            <div className={`link-wrapper ${styleCharsPacks[char || 'ratu'].link}`}>
              <h2 className={`title-game-pause ${styleCharsPacks[char || 'ratu'].pauseTitle}`}>paused <Icon icon={'pause-circle'} name={''}/></h2>
            </div>
            <div className={`link-wrapper ${styleCharsPacks[char || 'ratu'].link}`}>
              <NavLink to={''} className={``} onClick={(e:React.MouseEvent<HTMLAnchorElement, MouseEvent>)=>{
                  e.preventDefault()
                  setPause(false)
              }}>
                continue <Icon icon={'play-circle'} name={''}/>
              </NavLink>
            </div>
            <div className={`link-wrapper ${styleCharsPacks[char || 'ratu'].link}`}>
              <NavLink to={`/loading/${id}/menu`} className={``}>
                back to main menu <Icon icon={'list'} name={''}/>
              </NavLink>
            </div>
            <div className={`link-wrapper ${styleCharsPacks[char || 'ratu'].link}`}>
              <NavLink to={`/loading/${id}/char&change`} className={''}>
                settings <Icon icon={'gear'} name={''}/>
              </NavLink>
            </div>
          </div>
           {/* game */}
           <div className="game-container">

              <Icon icon={`${pop===false?'qr-code':'qr-code-scan'}`} id={'target'} name={''}
                onClick={()=>{
                   setPop(true)
                   setPoint(prevValue=>prevValue+=randPoint)
                   new Audio(splash).play()
                   const popTimeout=setTimeout(()=>{
                      setPop(false)
                   },2000)
                }}
              />
           </div>
        </div>
  )
}

export {Game}