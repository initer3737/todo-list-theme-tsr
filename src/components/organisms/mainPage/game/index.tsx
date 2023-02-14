import React, { useEffect,useState } from 'react'
import { json, NavLink, useNavigate, useParams } from 'react-router-dom'
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
import picu from '../../../../assets/picu-woice.mp3'
import splash from '../../../../assets/water-splash.mp3'
import electric from '../../../../assets/electric-splash.mp3'
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
  type TScore={
    score:number
  }
 interface IScore{
   data:[TScore]
 }
//============
function Game() {
  const [user,setUser]=useState<ILists>() 
  const token= Cookies.get('token')??''
  const [highScore,setHighScore]=useState<IScore>()
  const [char,setChar]=useState()
  const [pause,setPause]=useState<Boolean>(false)
  const [pop,setPop]=useState<Boolean>(false)
  const [point,setPoint]=useState<number>(0)
  const [status,setStatus]=useState<string>('')
  const randPoint=Math.floor(Math.random()*20)
  const [popupSound,setPopupSound]=useState<string>('');
  const chars=useRecoilValue(CharsSelect)
  const {id}=useParams()
  const filterDataChar=useMap(chars).filter(char=>char[1].id == id)
  const navigate=useNavigate()
    ///audio
          const themes=[theme1,theme2,theme3,theme4,theme5]
          let index=Math.floor(Math.random()*themes.length);
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
  type acakProps={x:number,y:number,unit:string}
  const acak=({x,y,unit}:acakProps)=>{
      const randomize=(number:number)=>Math.floor(Math.random()*number)
      const target=document.getElementById('target')
      target?.style.setProperty('--translate-x',String(randomize(x)+unit))
      target?.style.setProperty('--translate-y',String(randomize(y)+unit))
        
  }
  const blastingCursor=()=>{
    const blasting=document.getElementById('blastingEvent')
        document.onmousemove=(e:MouseEvent)=>{
            blasting!.style.left=(e.pageX-15)+'px';
            blasting!.style.top=(e.pageY-122)+'px';
            blasting!.style.position='absolute'
            blasting!.style.display=pop===true?'block':'none'
        } 
  }
  useEffect(()=>{

    const randPosition=setInterval(()=>{
          if(pause !== false){
            acak({x:0,y:0,unit:'px'})  
          }else{
            acak({x:1200,y:400,unit:'px'})
          }
      
        },1000)
                audiotheme.volume=0.8
                audiotheme.loop=true
                  audiotheme.play();
                return ()=>{
                        clearInterval(randPosition)
                        audiotheme.pause()
                      }
  },[pause])
  useEffect(()=>{
    filterDataChar.map(char=>{
      setChar(char[1].char_id)
    })
          
  },[])
    useEffect(()=>{
      //call api
      Http.get('/game/score')
      .then( ({data}:AxiosResponse)=>{
            console.log(data)
            setHighScore({...data})
      })
      .catch(err=>{
          console.log(err)
      }) 

      if(Number(highScore?.data[0].score) < point)
           {
              Http.post('game/update',JSON.stringify({score:point}))
              .then(({data}:AxiosResponse)=>{
                    console.log('update score will be : ',data)
              }).catch(err=>{
                  console.log(err)
              })
              
           }
           point>Number(highScore?.data[0].score)?new Audio(picu).play():undefined
    },[point,highScore?.data[0].score])
  useEffect(()=>{
    if(randPoint > 5){
        setStatus('good job!');
        setPopupSound(splash);
    }
    if(randPoint===5){
        setStatus('nice!')
        setPopupSound(splash);
    }
    if(randPoint < 5){
        setStatus('weak!!')
        setPopupSound(electric);
    }

  },[status,randPoint])
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
 blastingCursor();  
  return (
        <div className='parent-game-container'>
          <video src={datachars[char || 'ratu']} autoPlay loop muted className='game-video'></video>
          <div className={`${pause?"filter-pause":'filter-continue'}`}></div>
          {/* point */}
            <div className="game-point-container">
              <h4 className={`game-point`}>score : {point}
                      <Icon icon={`stars  ${Number(highScore?.data[0].score) < point? 'game-icon-effect-togled':'game-icon-effect' }`} name=''/>
              </h4>
              {/* <h4 className={`point-random ${pop==true?'':'d-none'} ${styleCharsPacks[char || 'ratu'].target}`}>{randPoint} {status}</h4> */}
              <h4>highscore: {highScore?.data[0].score} </h4>
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
              <NavLink to={`/loading/${id}/user&setting`} className={''}>
                settings <Icon icon={'gear'} name={''}/>
              </NavLink>
            </div>

                  <div className="hiasan hiasan-game">
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

          </div>
           {/* game */}
           <div className="game-container">

              <Icon icon={`${pop===false?'qr-code':'qr-code-scan disable-click'} ${styleCharsPacks[char || 'ratu'].target}`} id={'target'} name={''}
                onClick={()=>{
                   setPop(true)
                   setPoint(prevValue=>prevValue+=randPoint)
                  //  new Audio(splash).play()
                   new Audio(popupSound).play()
                   const popTimeout=setTimeout(()=>{
                      setPop(false)
                   },2000)
                }}/>
                  <h4 className={`point-random ${pop==true?'':'d-none'} ${styleCharsPacks[char || 'ratu'].target}`} id='blastingEvent'>{randPoint} {status}</h4>
                  {/* <h3 id='blastingEvent'>hello</h3> */}
                  {/* hiasan */}
                  <div className="game-hiasan-wrapper-atas">
                    <Icon icon='suit-diamond-fill game-hiasan-kelip' name=''/>
                  </div>
                  <div className="game-hiasan-wrapper-bawah">
                    <Icon icon='suit-diamond-fill game-hiasan-kelip' name=''/>
                  </div>
                  <div className="game-hiasan-wrapper-kiri">
                    <Icon icon='suit-diamond-fill game-hiasan-kelip-kiri' name=''/>
                  </div>
                  <div className="game-hiasan-wrapper-kanan">
                    <Icon icon='suit-diamond-fill game-hiasan-kelip-kanan' name=''/>
                  </div>
           </div>
        </div>
  )
}

export {Game}