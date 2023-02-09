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
import'./lobby.css'
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
function Lobby() {
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
              <ul className={`lobby-info ${styleCharsPacks[char || 'ratu'].border} border-info`}>
                <li><Icon icon={'bezier2 '} name={''} /> 1</li>
                <li><Icon icon={'exclude'} name={''} /> jojo yoshiharu</li>
                <li><img src={emblem} alt="emblem" className='emblem'/> godong gedang</li>
                <li><Icon icon={'fan'} name={''}/>12.245</li>
              </ul>
              <ul className={`lobby-info ${styleCharsPacks[char || 'ratu'].border} border-info`}>
                <li><Icon icon={'bezier2'} name={''} /> 2</li>
                <li><Icon icon={'exclude'} name={''} /> sugiono yukatta</li>
                <li><img src={emblem} alt="emblem" className='emblem'/> godong gedang</li>
                <li><Icon icon={'fan'} name={''}/>11.145</li>
              </ul>
              <ul className={`lobby-info  border-info`}>
                <li><Icon icon={'bezier2'} name={''} /> 3</li>
                <li><Icon icon={'exclude'} name={''} /> yotsusan_machi</li>
                <li><img src={emblem} alt="emblem" className='emblem'/> godong gedang</li>
                <li><Icon icon={'fan'} name={''}/>10.245</li>
              </ul>
              <ul className={`lobby-info ${styleCharsPacks[char || 'ratu'].border} border-info`}>
                <li><Icon icon={'bezier2'} name={''} /> 4</li>
                <li><Icon icon={'exclude'} name={''} /> mariyati sukomiya</li>
                <li><img src={emblem} alt="emblem" className='emblem'/> not yet mature</li>
                <li><Icon icon={'fan'} name={''}/>9.245</li>
              </ul>
              <ul className={`lobby-info ${styleCharsPacks[char || 'ratu'].border} border-info`}>
                <li><Icon icon={'bezier2'} name={''} /> 5</li>
                <li><Icon icon={'exclude'} name={''} /> budi yotukoto</li>
                <li><img src={emblem} alt="emblem" className='emblem'/> not bad noobs</li>
                <li><Icon icon={'fan'} name={''}/>9.215</li>
              </ul>
              <ul className={`lobby-info ${styleCharsPacks[char || 'ratu'].border} border-info`}>
                <li><Icon icon={'bezier2'} name={''} /> 6</li>
                <li><Icon icon={'exclude'} name={''} /> eko fugiwara</li>
                <li><img src={emblem} alt="emblem" className='emblem'/> not bad noobs</li>
                <li><Icon icon={'fan'} name={''}/>8.845</li>
              </ul>
              <ul className={`lobby-info ${styleCharsPacks[char || 'ratu'].border} border-info`}>
                <li><Icon icon={'bezier2'} name={''} /> 7</li>
                <li><Icon icon={'exclude'} name={''} /> minova peko peko </li>
                <li><img src={emblem} alt="emblem" className='emblem'/> not bad noobs</li>
                <li><Icon icon={'fan'} name={''}/>8.745</li>
              </ul>
              <ul className={`lobby-info ${styleCharsPacks[char || 'ratu'].border} border-info`}>
                <li><Icon icon={'bezier2'} name={''} /> 8</li>
                <li><Icon icon={'exclude'} name={''} /> elina megumin</li>
                <li><img src={emblem} alt="emblem" className='emblem'/> not bad noobs</li>
                <li><Icon icon={'fan'} name={''}/>8.625</li>
              </ul>
              <ul className={`lobby-info ${styleCharsPacks[char || 'ratu'].border} border-info`}>
                <li><Icon icon={'bezier2'} name={''} /> 9</li>
                <li><Icon icon={'exclude'} name={''} /> sasha pavlichenko</li>
                <li><img src={emblem} alt="emblem" className='emblem'/> rotten egg</li>
                <li><Icon icon={'fan'} name={''}/>7.245</li>
              </ul>
              <ul className={`lobby-info ${styleCharsPacks[char || 'ratu'].border} border-info`}>
                <li><Icon icon={'bezier2'} name={''} /> 10</li>
                <li><Icon icon={'exclude'} name={''} /> yorunaka tri </li>
                <li><img src={emblem} alt="emblem" className='emblem'/> rotten egg</li>
                <li><Icon icon={'fan'} name={''}/>5.245</li>
              </ul>
              <ul className={`player-counter d-flex content-between ${styleCharsPacks[char || 'ratu'].border} border-info`}>
                {/* <li><Icon icon={'bezier2'} name={''} /> 1</li> */}
                <li><Icon icon={'circle-fill online'} name={''} />3 online</li>
                <li><Icon icon={'circle-fill offline'} name={''} />200 offline</li>
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