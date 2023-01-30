import React, { useEffect,useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import Cookies from 'js-cookie'
import { AxiosResponse } from 'axios'
import { Http } from '../../../../services'
import RatuBackend from '../../../../assets/ratuBackend.mp4'
import RajaFrontend from '../../../../assets/rajaFrontend.mp4'
import PadukaFullstek from '../../../../assets/padukaFullstek.mp4'
import userImg from '../../../../assets/user.png'
import { useRecoilValue } from 'recoil'
import'./setting.css'
import { CharsSelect } from '../../../../globalState'
import { useMap } from '../../../../utils'
import { Icon } from '../../../atoms'
import theme1 from '../../../../assets/electronic-future-beats-117997.mp3'
import theme2 from '../../../../assets/leonell-cassio-the-blackest-bouquet-118766.mp3'
import theme3 from '../../../../assets/password-infinity-123276.mp3'
import theme4 from '../../../../assets/save-as-115826.mp3'
import theme5 from '../../../../assets/simple-piano-melody-9834.mp3'
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
function Setting() {
  const [user,setUser]=useState<ILists>() 
  const token= Cookies.get('token')??''
  const [char,setChar]=useState()
  const chars=useRecoilValue(CharsSelect)
  const {id}=useParams()
  const filterDataChar=useMap(chars).filter(char=>char[1].id == id)
  const navigate=useNavigate()
    ///audio
          const themes=[theme1,theme2,theme3,theme4,theme5]
          let index=Math.floor(Math.random()*themes.length -1);
          const audiotheme=new Audio(themes[index])

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

                audiotheme.volume=0.8
                audiotheme.loop=true
                  audiotheme.play();
                return ()=>{
                        audiotheme.pause()
                      }
  },[])
  useEffect(()=>{
    filterDataChar.map(char=>{
      setChar(char[1].char_id)
    })

      
  },[])
    // useEffect(()=>{
    //   ()=>{
    //     // clearInterval(randPosition)
    //     audiotheme.pause()
    //   }
    // },[])
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
          pauseTitle:'pauseTitle-raja',
          target:'raja-target'
      },
      ratu:{
          card:'RatuBackendCard',
          link:'RatuBackendLinkMenu',
          pauseTitle:'pauseTitle-ratu',
          target:'ratu-target'
      },
      paduka:{
          card:'PadukaFullstekCard',
          link:'PadukaFullstekLinkMenu',
          pauseTitle:'pauseTitle-paduka',
          target:'paduka-target'
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
        <div className='parent-setting-container'>
          <video src={datachars[char || 'ratu']} autoPlay loop muted className='game-video'></video>
          <div className={`filter-setting`}></div>
          {/* point */}
            <div className="game-point-container">
              <h4 className={`setting-title`}><Icon icon='gear-wide-connected' name={''}>settings</Icon> </h4>
              {/* <h4 className={`point-random ${pop==true?'':'d-none'} ${styleCharsPacks[char || 'ratu'].target}`}>{randPoint} {status}</h4> */}
            </div>
          {/* pause btn */}
          <div className={`link-wrapper back-btn ${styleCharsPacks[char || 'ratu'].link}`}>
              <h2 className={`title-game-pause ${styleCharsPacks[char || 'ratu'].pauseTitle}`}>
                back <Icon icon={'pause-circle'} name={''}/>
              </h2>
            </div>
            {/* pause menu */}

           {/* game */}
           <div className="setting-container">
              <img src={userImg} alt="image" className="user-setting-img"/>
              <ul className='user-settings'>
                <li>name : <input type="text" /></li>
                <li>username : <input type="text" /></li>
                <li>password : <input type="text" /></li>
                <li>status : <input type="text" /></li>
                <li><button>simpan</button></li>
              </ul>
              <ul className='user-info-settings'>
                <li>name : papacom</li>
                <li>username : yotsusan_machi</li>
                <li>password : its secret</li>
                <li>status : i want to conquere isekai</li>
              </ul>

    
           </div>
        </div>
  )
}

export {Setting}