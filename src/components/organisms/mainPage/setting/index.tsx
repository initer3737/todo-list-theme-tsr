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
  type TUserInfoSetting={
    avatar:string,
    country:string,
    email:string,
    gender:string,
    name:string,
    password:string,
    score:number,
    status:string,
    user_conections:string,
    username:string
  }
 interface IUserInfoSetting{
   data:[TUserInfoSetting]
 }
//============
function Setting() {
  const [userInfoSetting,setUserInfoSetting]=useState<IUserInfoSetting>() 
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
    //===========call api
      Http.get('/setting/info')
      .then(({data}:AxiosResponse)=>{
          console.log('data from api ',data)
          setUserInfoSetting({...data})
      }).catch(err=>{
        console.log('error will be:',err)
      })
  },[])
 //=====================================    
 //============char style
 const styleCharsPacks={
      raja:{
          card:'RajaFrontendCard',
          link:'RajaFrontendLinkMenu',
          pauseTitle:'pauseTitle-raja',
          target:'raja-target',
          profile:'raja-profile',
          filter:'filter-raja'
      },
      ratu:{
          card:'RatuBackendCard',
          link:'RatuBackendLinkMenu',
          pauseTitle:'pauseTitle-ratu',
          target:'ratu-target',
          profile:'ratu-profile',
          filter:'filter-ratu'
      },
      paduka:{
          card:'PadukaFullstekCard',
          link:'PadukaFullstekLinkMenu',
          pauseTitle:'pauseTitle-paduka',
          target:'paduka-target',
          profile:'paduka-profile',
          filter:'filter-paduka'
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
          <div className={`filter-setting ${styleCharsPacks[char || 'ratu'].filter}`}></div>
          {/* point */}
            <div className="game-point-container">
              <h4 className={`setting-title`}><Icon icon='gear-wide-connected' name={''}>settings</Icon> </h4>
              {/* <h4 className={`point-random ${pop==true?'':'d-none'} ${styleCharsPacks[char || 'ratu'].target}`}>{randPoint} {status}</h4> */}
            </div>
          {/* pause btn */}
          <div className={`link-wrapper back-btn ${styleCharsPacks[char || 'ratu'].link}`}>
              <h2 className={`title-game-pause ${styleCharsPacks[char || 'ratu'].pauseTitle}`} onClick={()=>navigate(-3)}>
                back <Icon icon={'back'} name={''}/>
              </h2>
            </div>
            {/* pause menu */}

           {/* settings */}
           <form action="" onSubmit={(e:React.FormEvent<HTMLFormElement>)=>{
                  e.preventDefault()
                }}>
           <div className={`setting-container ${styleCharsPacks[char || 'ratu'].target}`}>
              <img src={userImg} alt="image" className={`user-setting-img ${styleCharsPacks[char || 'ratu'].profile}`} onClick={()=>{
                  document.getElementById('foto')?.click()
              }}/>
              <ul className='user-settings'>
                <li><span>name : </span> <input type="text" name={'name'} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
                    let {value,name}=e.target
                      
                }} value={userInfoSetting?.data[0].name} required/></li>
                <li><span>username :</span> <input type="text" required/></li>
                <li><span>password :</span> <input type="text" required/></li>
                <li><span>status :</span> <input type="text" required /></li>
                <li><span>country :</span> <input type="text" required /></li>
                <li>
                  <span>gender :</span> 
                  <select name="" id="">
                    <option value="" selected>male</option>
                    <option value="">female</option>
                  </select>
                </li>
                <li><input type="file" name="foto" id="foto" className='d-none' accept='image/*'/></li>
                <li><button className={`btn-simpan ${styleCharsPacks[char || 'ratu'].pauseTitle}`} >simpan</button></li>
              </ul>
              <ul className='user-info-settings'>
                <li><span>name :</span> <p>{userInfoSetting?.data[0].name}</p></li>
                <li><span>username :</span> <p>{userInfoSetting?.data[0].username}</p></li>
                <li><span>password :</span> <p>its secret</p></li>
                <li><span>status :</span> <p>{userInfoSetting?.data[0].status}</p></li>
                <li><span>country :</span> <p>{userInfoSetting?.data[0].country}</p></li>
                <li><span>gender :</span> <p>{userInfoSetting?.data[0].gender}</p></li>
              </ul>

                <div className="jajar-wrapper-kiri-atas">
                  <div className="jajar-genjang"></div>
                </div>
                <div className="jajar-wrapper-kiri-bawah">
                  <div className="jajar-genjang"></div>
                </div>
                <div className="jajar-wrapper-kanan-atas">
                  <div className="jajar-genjang"></div>
                </div>
                <div className="jajar-wrapper-kanan-bawah">
                  <div className="jajar-genjang"></div>
                </div>
                <div className="jajar-wrapper-atas">
                  <div className="jajar-genjang"></div>
                </div>
                <div className={`jajar-wrapper-bawah`}>
                  <div className="jajar-genjang"></div>
                </div>
           </div>
           </form>
        </div>
  )
}

export {Setting}