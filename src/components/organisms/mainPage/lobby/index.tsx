import React, { useEffect,useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import Cookies from 'js-cookie'
import axios, { AxiosResponse } from 'axios'
import { Http } from '../../../../services'
import RatuBackend from '../../../../assets/ratuBackend.mp4'
import RajaFrontend from '../../../../assets/rajaFrontend.mp4'
import PadukaFullstek from '../../../../assets/padukaFullstek.mp4'
import userImg from '../../../../assets/user.png'
import emblem from '../../../../assets/emblem.svg'
import avatar from '../../../../assets/user.png'
import { useRecoilValue } from 'recoil'
import'./lobby.css'
import { AvatarDomainSelectSelect, CharsSelect } from '../../../../globalState'
import { useMap } from '../../../../utils'
import { Icon } from '../../../atoms'
// import theme1 from '../../../../assets/electronic-future-beats-117997.mp3'
// import theme2 from '../../../../assets/leonell-cassio-the-blackest-bouquet-118766.mp3'
// import theme3 from '../../../../assets/password-infinity-123276.mp3'
// import theme4 from '../../../../assets/save-as-115826.mp3'
// import theme5 from '../../../../assets/simple-piano-melody-9834.mp3'
//=======================
  type TuserStatusCount={
    online:string,
    offline:string,
  }
 interface IuserStatusCount{
   data:TuserStatusCount,
 }
  type TLobbyInformation={
    username:string,
    name:string,
    emblem:string,
    score:number,
    ranking:number,
    avatar:string,
  }
 interface ILobbyInformation{
   data:[TLobbyInformation],
 }
 type TProfile={
  username:string
}
 interface IProfile{
   data:[TProfile],
 }
//============
function Lobby() {
  const [char,setChar]=useState()
  const avatarDomain=useRecoilValue(AvatarDomainSelectSelect)
  const [profile,setProfile]=useState<IProfile>()
  const [userStatusCount,setUserStatusCount]=useState<IuserStatusCount>()
  const [lobbyInformation,setUserLobbyInformation]=useState<ILobbyInformation>()
  const chars=useRecoilValue(CharsSelect)
  const {id}=useParams()
  const filterDataChar=useMap(chars).filter(char=>char[1].id == id)
  const navigate=useNavigate()
    ///audio
          // const themes=[theme1,theme2,theme3,theme4,theme5]
          // let index=Math.floor(Math.random()*themes.length);
          // const audiotheme=new Audio(themes[index])

  useEffect(()=>{

                // audiotheme.volume=0.8
                // audiotheme.loop=true
                //   audiotheme.play();
                // return ()=>{
                //         audiotheme.pause()
                //       }
  },[])
  useEffect(()=>{
    filterDataChar.map(char=>{
      setChar(char[1].char_id)
    })
    Http.get('/user/conections/counting')
    .then(({data}:AxiosResponse)=>{
        setUserStatusCount({...data})
    }).catch(err=>console.log(err))
    Http.get('/lobby')
    .then(({data}:AxiosResponse)=>{
        setUserLobbyInformation({...data})
    }).catch(err=>console.log(err))
    // setUserStatusCount
    
    Http.get('/session/profile')
    .then(({data}:AxiosResponse)=>{
        setProfile({...data})
    }).catch(err=>console.log(err))
    // setUserStatusCount
    
  },[])
 //=====================================    
 //============char style
 const styleCharsPacks={
      raja:{
          card:'RajaFrontendCard',
          link:'RajaFrontendLinkMenu',
          pauseTitle:'pauseTitle-raja',
          target:'raja-target',
          border:'raja-border',
          profile:'raja-profile',
          filter:'filter-raja'
      },
      ratu:{
          card:'RatuBackendCard',
          link:'RatuBackendLinkMenu',
          pauseTitle:'pauseTitle-ratu',
          target:'ratu-target',
          border:'ratu-border',
          profile:'ratu-profile',
          filter:'filter-ratu'
      },
      paduka:{
          card:'PadukaFullstekCard',
          link:'PadukaFullstekLinkMenu',
          pauseTitle:'pauseTitle-paduka',
          target:'paduka-target',
          border:'paduka-border',
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
          <video src={datachars[char || 'ratu']} autoPlay loop muted className='lobby-video'></video>
          <div className={`${styleCharsPacks[char || 'ratu'].filter} filter-lobby`}></div>
          {/* point */}
            <div className="game-point-container">
              <h4 className={`setting-title`}><Icon icon='person-bounding-box' name={''}>lobby</Icon> </h4>
              {/* <h4 className={`point-random ${pop==true?'':'d-none'} ${styleCharsPacks[char || 'ratu'].target}`}>{randPoint} {status}</h4> */}
            </div>
          {/* pause btn */}
          <div className={`link-wrapper back-btn ${styleCharsPacks[char || 'ratu'].link}`}>
              <h2 className={`title-game-pause ${styleCharsPacks[char || 'ratu'].pauseTitle}`} onClick={()=>navigate(`/loading/${id}/menu`)}>
                back <Icon icon={'back'} name={''}/>
              </h2>
            </div>
            {/* pause menu */}

           {/* lobby info */}
           <div className={`lobby-container ${styleCharsPacks[char || 'ratu'].target}`}>
              {/* <img src={userImg} alt="image" className={`user-info-img ${styleCharsPacks[char || 'ratu'].profile}`}/> */}
                <ul className='lobby-info-title'>
                  <li><Icon icon={' person-fill'} name={''} />ranking</li>
                  <li><Icon icon={' person-fill-lock'} name={''} />player</li>
                  <li><Icon icon={' flag-fill'} name={''} />emblem</li>
                  <li><Icon icon={' circle-fill online'} name={''} />score</li>
                  {/* <li><Icon icon={'gender-male'} name={''} /></li> */}
                </ul>
              <hr />
                  {lobbyInformation?.data.map((data=>(
                    <ul className={`lobby-info ${data.username !== profile?.data[0].username ?styleCharsPacks[char || 'ratu'].filter:undefined}  border-info`}>
                      <li><Icon icon={'bezier2'} name={''} /> {data.ranking}</li>
                      <li>
                        <NavLink className={'lobby-link'} to={`/user/show/${data.username}/${id}`}>
                          <img src={data.avatar ===null?avatar:`${avatarDomain}${data.avatar}`} alt="avatar" className='emblem'/> {data.name}
                        </NavLink>
                      </li>
                      <li><img src={emblem} alt="emblem" className='emblem'/> {data.emblem}</li>
                      <li><Icon icon={'fan'} name={''}/>{data.score}</li>
                    </ul>
                  )))}

              <ul className={`player-counter d-flex content-between ${styleCharsPacks[char || 'ratu'].border} border-info`}>
                {/* <li><Icon icon={'bezier2'} name={''} /> 1</li> */}
                <li><Icon icon={'circle-fill online'} name={''} />{userStatusCount?.data.online} online</li>
                <li><Icon icon={'circle-fill offline'} name={''} />{userStatusCount?.data.offline} offline</li>
                {/* <li><img src={emblem} alt="emblem" className='emblem'/> godong gedang</li> */}
                {/* <li><Icon icon={'fan'} name={''}/>245</li> */}
              </ul>
                  <div className="hiasan hiasan-kiri-pojok">
                      <Icon icon='gem' name=''/>
                      <Icon icon='gem' name=''/>
                  </div>
                  <div className="hiasan hiasan-kiri">
                      <Icon icon='diamond-fill' name=''/>
                      <Icon icon='diamond-fill' name=''/>
                      <Icon icon='diamond-fill' name=''/>
                  </div>
                  <div className="hiasan hiasan-kanan">
                      <Icon icon='diamond-fill' name=''/>
                      <Icon icon='diamond-fill' name=''/>
                      <Icon icon='diamond-fill' name=''/>
                  </div>
                  <div className="hiasan hiasan-kanan-pojok">
                      <Icon icon='gem' name=''/>
                      <Icon icon='gem' name=''/>
                  </div>
                  <div className="hiasan hiasan-bawah-kanan">
                      <Icon icon='x-diamond-fill' name=''/>
                      <Icon icon='x-diamond-fill' name=''/>
                      <Icon icon='x-diamond-fill' name=''/>
                  </div>
                  <div className="hiasan hiasan-bawah-tengah">
                      <Icon icon='suit-diamond-fill' name=''/>
                      <Icon icon='suit-diamond-fill' name=''/>
                  </div>
                  <div className="hiasan hiasan-bawah-kiri">
                      <Icon icon='x-diamond-fill' name=''/>
                      <Icon icon='x-diamond-fill' name=''/>
                      <Icon icon='x-diamond-fill' name=''/>
                  </div>
           </div>
        </div>
  )
}

export {Lobby}