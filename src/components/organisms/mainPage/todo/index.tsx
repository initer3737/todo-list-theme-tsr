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
function Todo() {
  const [user,setUser]=useState<ILists>() 
  const token= Cookies.get('token')??''
  const [char,setChar]=useState()
  const [jam,setJam]=useState<String>()
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

    const jamRefresher=setInterval(()=>{
      let Time=new Date().toLocaleTimeString()
        setJam(Time)
    },1000);
      return()=>{
          clearInterval(jamRefresher)
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
          playerContainer:'linear-paduka'
      },
      ratu:{
          card:'RatuBackendCard',
          link:'RatuBackendLinkMenu',
          playerContainer:'linear-paduka'
      },
      paduka:{
          card:'PadukaFullstekCard',
          link:'PadukaFullstekLinkMenu',
          playerContainer:'linear-paduka'
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
          <div className="jam-container">
             {/* <h3>{jam}</h3> */}
             <p>kwaaaaaaaaaaaa</p>
          </div>
          <video src={datachars[char || 'ratu']} autoPlay loop className='menu-video'></video>

          {/* <div className={`menu-padding menu-container ${styleCharsPacks[char || 'ratu'].card}`}>
            <div className={`link-wrapper ${styleCharsPacks[char || 'ratu'].link}`}>
              <NavLink to={`/loading/${id}/game`} className={``}>
                start game
              </NavLink>
            </div>
            <div className={`link-wrapper ${styleCharsPacks[char || 'ratu'].link}`}>
              <NavLink to={`/loading/${id}/char&change`} className={''}>
                change character
              </NavLink>
            </div>
            <div className={`link-wrapper ${styleCharsPacks[char || 'ratu'].link}`}>
              <NavLink to={`/loading/${id}/lobby`} className={''}>
                lobby
              </NavLink>
            </div>
            <div className={`link-wrapper ${styleCharsPacks[char || 'ratu'].link}`}>
              <NavLink to={`/loading/${id}/user&setting`} className={''}>
                settings
              </NavLink>
            </div>
            <div className={`link-wrapper ${styleCharsPacks[char || 'ratu'].link}`}>
              <NavLink to={`/loading/${id}/kredit&list`} className={''}>
                credit lists
              </NavLink>
            </div>
            <div className={`link-wrapper ${styleCharsPacks[char || 'ratu'].link}`}>
              <a target={'_blank'} href={`https://initer3737.github.io/`} className={''}>
                developer
              </a>
            </div>
            <div className={`link-wrapper ${styleCharsPacks[char || 'ratu'].link}`}>
              <NavLink to={''} className={''}>
                logout
              </NavLink>
            </div>


                  <div className="hiasan hiasan-menu">
                      <Icon icon='suit-diamond' name=''/>
                      <Icon icon='suit-diamond-fill' name=''/>
                      <Icon icon='suit-diamond' name=''/>
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
          </div> */}

              {/* play button start*/}
                <NavLink to={`/loading/${id}/game`} className={`btn-play-game`}>
                  start game
                </NavLink>
              {/* play button end */}
            <div className={`player-container ${styleCharsPacks[char || 'ratu'].playerContainer}`}>
             
              <NavLink to={`/user/show/name/${id}/`} className={''}>
                <div className="">
                  <img src={avatar} alt="" className='player-img' />
                  <Icon icon={'fan'} name={''}>
                    254
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
              <NavLink to={''} className={''}>
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