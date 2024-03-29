import React, { useEffect,useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import Cookies from 'js-cookie'
import { AxiosResponse } from 'axios'
import { Http } from '../../../../services'
import RatuBackend from '../../../../assets/ratuBackend.mp4'
import RajaFrontend from '../../../../assets/rajaFrontend.mp4'
import PadukaFullstek from '../../../../assets/padukaFullstek.mp4'
import avatar from '../../../../assets/user.png'
import { useRecoilValue } from 'recoil'
import'./todo.css'
import { AvatarDomainSelectSelect, CharsSelect } from '../../../../globalState'
import { useMap } from '../../../../utils'
import { Icon } from '../../../atoms'
//=======================
  type TTop3={
    avatar:string,
    name:string,
    user_conections:string,
  }
 interface ITop3{
   data:[TTop3],
 }
 type TProfile={
  avatar:string,
  score:string,
  username:string
}
 interface IProfile{
   data:[TProfile],
 }
//============
function Todo() {
  // const token= Cookies.get('token')??null
  const [char,setChar]=useState()
  const avatarDomain=useRecoilValue(AvatarDomainSelectSelect)
  const [top3,setTop3]=useState<ITop3>()
  const [profile,setProfile]=useState<IProfile>()
  const [jam,setJam]=useState('')
  const [tokenRefresher,setTokenRefresher]=useState(true)
  const chars=useRecoilValue(CharsSelect)
  const {id}=useParams()
  const filterDataChar=useMap(chars).filter(char=>char[1].id == id)
  const navigate=useNavigate()
  const [audio,setaudio]=useState(true)
  const logout=()=>{
       try {
            Http.get('/logout')
          .then((res:AxiosResponse)=>{
              if(res.status === 200){
                Cookies.remove('token')
                navigate(`/loading/${id}/home`)
          }
          console.log(res)
       })
       } catch (err) {
          console.log(err)
       }
  }

  useEffect(()=>{
    // token===null?navigate(`/loading/${id}/home`):undefined
    // const logoutBtn=document.getElementById('logout')
    //     logoutBtn?.onclick
    filterDataChar.map(char=>{
      setChar(char[1].char_id)
      console.log('token is :',Cookies.get('token'))
    })
     const jamInterval=setInterval(()=>{
        setJam(new Date().toLocaleTimeString())
      },1000);
      //==========call api
      Http.get('/top3/players/info')
      .then(({data}:AxiosResponse)=>{
          setTop3({...data})
      }).catch(err=>{
        // navigate(`/loading/${id}/home`)
      })
      Http.get('/session/profile')
      .then(({data}:AxiosResponse)=>{
          setProfile({...data})
      }).catch(err=>{
        // navigate(`/loading/${id}/home`)
      })
      return ()=>{
          clearInterval(jamInterval)
      }
  },[])
      useEffect(()=>{
        // const getTokentRefresh=setTimeout(()=>{
          if(tokenRefresher === true){
              // window.location.reload()
              setTokenRefresher(false);
          }
        // },1000)  ;
        // return ()=>{
        //   clearTimeout(getTokentRefresh)
        // }
      },[Cookies.get('token')])
 //=====================================    
 //============char style
 const styleCharsPacks={
      raja:{
          card:'RajaFrontendCard',
          link:'RajaFrontendLinkMenu',
          playerContainer:'linear-raja',
          btnPlay:'btn-play-raja'
      },
      ratu:{
          card:'RatuBackendCard',
          link:'RatuBackendLinkMenu',
          playerContainer:'linear-ratu',
          btnPlay:'btn-play-ratu'
      },
      paduka:{
          card:'PadukaFullstekCard',
          link:'PadukaFullstekLinkMenu',
          playerContainer:'linear-paduka',
          btnPlay:'btn-play-paduka'
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
          <video src={datachars[char || 'ratu']} muted autoPlay loop className='menu-video'></video>
          <div className="jam-container">
             <h3>{jam}</h3>
          </div>
              <div className="wall-of-fame">
               <div className="wall-of-fame-wrapper">
                  <Icon icon='suit-diamond-fill kelip' name={''}/>
                 <h1>{top3 == undefined?'reload browsernya!!, data dari api / sever macet,harus kamu reload browsernya!':'wall of fame'}</h1>
               </div>
              </div>

                <div className="top3-container">
                  {top3?.data.map((data)=>(
                    <div className="card">
                      <img src={data.avatar==null?avatar:`${avatarDomain}${data.avatar}`} alt="" className='player-img' />
                      <Icon icon={`circle-fill ${data.user_conections} status-user`} name={''}/>
                      <h1>
                        {data.name}
                      </h1>
                    </div>
                  ))}
                </div>
              {/* play button start*/}
                <NavLink to={`/loading/${id}/game`} className={`btn-play-game ${styleCharsPacks[char || 'ratu'].btnPlay}`}>
                  <Icon icon={'chevron-left'} name={''}/>
                  <Icon icon={'chevron-left'} name={''}/>
                  start game
                  <Icon icon={'chevron-right'} name={''}/>
                  <Icon icon={'chevron-right'} name={''}/>
                </NavLink>
              {/* play button end */}
            <div className={`player-container ${styleCharsPacks[char || 'ratu'].playerContainer}`}>
             
              <NavLink to={`/user/show/${profile?.data[0].username}/${id}`} className={``}>
                <div className="">
                  <img src={profile?.data[0].avatar==null || ''?avatar:`${avatarDomain}${profile?.data[0].avatar}`} alt="" className='player-img' />
                  <Icon icon={'fan'} name={''}>
                    {profile?.data[0].score}
                  </Icon>
                </div>
              </NavLink>
              <NavLink to={`/loading/${id}/char&change`} className={''}>
                <Icon icon={'person-gear'} name={''}>
                  change char
                </Icon>
              </NavLink>
              <NavLink to={`/loading/${id}/lobby`} className={''}>
                <Icon icon={'person-bounding-box'} name={''}>
                  lobby
                </Icon>
              </NavLink>
              <NavLink to={`/loading/${id}/user&setting`} className={''}>
                <Icon icon={'gear-fill'} name={''}>
                  settings
                </Icon>
              </NavLink>
              <a target={'_blank'} href={`https://initer3737.github.io/`} className={''}>
                <Icon icon={'code-slash'} name={''}>
                  developer
                </Icon>
              </a>
              <NavLink to={`/loading/${id}/kredit&list`} className={''}>
                <Icon icon={'pencil-square'} name={''}>
                  credit lists
                </Icon>
              </NavLink>
              <NavLink to={''} className={''} id='logout' onClick={(e:React.MouseEvent<HTMLAnchorElement, MouseEvent>)=>{
                  e.preventDefault()
                  logout()
              }}>
                <Icon icon={'box-arrow-right'} name={''}>
                  logout
                </Icon>
              </NavLink>
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

export {Todo}