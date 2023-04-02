import React, { useEffect,useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import Cookies from 'js-cookie'
import { AxiosResponse } from 'axios'
import { Http } from '../../../../services'
import RatuBackend from '../../../../assets/ratuBackend.mp4'
import RajaFrontend from '../../../../assets/rajaFrontend.mp4'
import PadukaFullstek from '../../../../assets/padukaFullstek.mp4'
import userImg from '../../../../assets/user.png'
import emblem from '../../../../assets/emblem.svg'
import { useRecoilValue } from 'recoil'
import'./userinfo.css'
import { AvatarDomainSelectSelect, CharsSelect } from '../../../../globalState'
import { useMap } from '../../../../utils'
import { Icon } from '../../../atoms'
// import theme1 from '../../../../assets/electronic-future-beats-117997.mp3'
// import theme2 from '../../../../assets/leonell-cassio-the-blackest-bouquet-118766.mp3'
// import theme3 from '../../../../assets/password-infinity-123276.mp3'
// import theme4 from '../../../../assets/save-as-115826.mp3'
// import theme5 from '../../../../assets/simple-piano-melody-9834.mp3'
//=======================
  type Tdata={
    id:string,
    username:string,
    email:string,
  }
 interface ILists{
   data:Tdata,
 }
 interface IProfile{
  avatar:string,
  country:string,
  emblem:string,
  gender:string,
  name:string,
  ranking:number,
  score:number,
  status:string,
  user_conections:string,
  username:string
 }
//============
function UserInfo() {
  const [user,setUser]=useState<ILists>() 
  const avatarDomain=useRecoilValue(AvatarDomainSelectSelect)
  const [Profile,setProfile]=useState<IProfile>() 
  const token= Cookies.get('token')??''
  const [char,setChar]=useState()
  const chars=useRecoilValue(CharsSelect)
  const {id,playername}=useParams()
  const filterDataChar=useMap(chars).filter(char=>char[1].id == id)
  const navigate=useNavigate()
    ///audio
          // const themes=[theme1,theme2,theme3,theme4,theme5]
          // let index=Math.floor(Math.random()*themes.length -1);
          // const audiotheme=new Audio(themes[index])

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

                // audiotheme.volume=0.8
                // audiotheme.loop=true
                //   audiotheme.play();
                  //======get api
                  Http.get(`/user/${playername}`)
                  .then(({data}:AxiosResponse)=>{
                      setProfile({...data.data})
                  }).catch(err=>{
                      
                  })
                return ()=>{
                        // audiotheme.pause()
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
              <h4 className={`setting-title`}><Icon icon='person-bounding-box' name={''}>user info</Icon> </h4>
              {/* <h4 className={`point-random ${pop==true?'':'d-none'} ${styleCharsPacks[char || 'ratu'].target}`}>{randPoint} {status}</h4> */}
            </div>
          {/* pause btn */}
          <div className={`link-wrapper back-btn ${styleCharsPacks[char || 'ratu'].link}`}>
              <h2 className={`title-game-pause ${styleCharsPacks[char || 'ratu'].pauseTitle}`} onClick={()=>navigate(-1)}>
                back <Icon icon={'back'} name={''}/>
              </h2>
            </div>
            {/* pause menu */}

           {/* user info */}
           <div className={`setting-container ${styleCharsPacks[char || 'ratu'].target}`}>
              <img src={Profile?.avatar == null?userImg:`${avatarDomain}${Profile.avatar}`} alt="image" className={`user-info-img ${styleCharsPacks[char || 'ratu'].profile}`}/>
                <ul className='user-info-title'>
                  <li><Icon icon={'person-fill'} name={''} />{Profile?.name}</li>
                  <li><Icon icon={'person-fill-lock'} name={''} />{Profile?.username}</li>
                  <li><Icon icon={'flag-fill'} name={''} />{Profile?.country}</li>
                  <li><Icon icon={`circle-fill ${Profile?.user_conections}`} name={''} />{Profile?.user_conections}</li>
                  <li><Icon icon={`gender-${Profile?.gender}`} name={''} /></li>
                </ul>
              <hr />
              <ul className='user-info'>
                <li><Icon icon={'bezier2'} name={''} /> {String(Profile?.status).length > 30?`${Profile?.status.slice(0,19)}...`:Profile?.status}</li>
                <li><img src={emblem} alt="emblem" className='emblem'/> {Profile?.emblem}</li>
                <li><Icon icon={'exclude'} name={''} /> global ranks : {Profile?.ranking}</li>
                <li><Icon icon={`exclamation ${Profile?.name == undefined?'offline':'d-none'}`} name={Profile?.name==undefined?'kamu jangan ngotak atik query parameternya dong jadilah hacker yang bijak!!!!':''} /> </li>
                <li><Icon icon={'fan'} name={''}/>{Profile?.score}</li>
              </ul>

                <div className="hiasan info-user-hiasan-kiri">
                      <Icon icon='suit-diamond' name=''/>
                      <Icon icon='suit-diamond-fill' name=''/>
                      <Icon icon='suit-diamond' name=''/>
                  </div>
                <div className="hiasan info-user-hiasan-kanan">
                      <Icon icon='x-diamond' name=''/>
                      <Icon icon='x-diamond-fill' name=''/>
                      <Icon icon='x-diamond' name=''/>
                  </div>
                <div className="hiasan info-user-hiasan-atas">
                      <Icon icon='star' name=''/>
                      <Icon icon='stars' name=''/>
                      <Icon icon='star' name=''/>
                  </div>
                <div className="hiasan info-user-hiasan-bawah">
                      <Icon icon='moon-stars' name=''/>
                      <Icon icon='moon-stars-fill' name=''/>
                      <Icon icon='moon-stars' name=''/>
                  </div>

                <div className="jajar-wrapper-kanan-bawah jajar-genjang-menu">
                  <div className="jajar-genjang"></div>
                </div>
                <div className="jajar-wrapper-kiri-bawah jajar-genjang-menu">
                  <div className="jajar-genjang"></div>
                </div>
                <div className="jajar-wrapper-kanan-atas jajar-genjang-menu">
                  <div className="jajar-genjang"></div>
                </div>
                <div className="jajar-wrapper-kiri-atas jajar-genjang-menu">
                  <div className="jajar-genjang"></div>
                </div>

           </div>
        </div>
  )
}

export {UserInfo}