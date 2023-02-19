import React, { ChangeEvent, useEffect,useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import Cookies from 'js-cookie'
import axios, { AxiosResponse } from 'axios'
import { Http } from '../../../../services'
import RatuBackend from '../../../../assets/ratuBackend.mp4'
import RajaFrontend from '../../../../assets/rajaFrontend.mp4'
import PadukaFullstek from '../../../../assets/padukaFullstek.mp4'
import userImg from '../../../../assets/user.png'
import { useRecoilValue } from 'recoil'
import'./setting.css'
import { CharsSelect,AvatarDomainSelectSelect } from '../../../../globalState'
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

 type TEror={
  gender:Array<string>,
  avatar:Array<string>,
  country:Array<string>,
  username:Array<string>,
  name:Array<string>
  password:Array<string>
  password_confirm:Array<string>
  status:Array<string>
}
interface IError{
  errors:TEror,
  message:string
}
interface ISucc{
  message:string
}

 let formDatas ={
   avatar:'',
   country:'',
   gender:'',
   name:'',
   password:'',
   status:'',
   user_conections:'',
   username:''
 }
//============
function Setting() {
  const [userInfoSetting,setUserInfoSetting]=useState<IUserInfoSetting>() 
  const [formData,setFormData]=useState(formDatas) 
  const [errmsg,setErrmsg]=useState<IError>()
  const [succmsg,setSuccmsg]=useState<ISucc>()
  const token= Cookies.get('token')??''
  const [char,setChar]=useState()
  const chars=useRecoilValue(CharsSelect)
  const avatarDomain=useRecoilValue(AvatarDomainSelectSelect)
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
  const submit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()  
        // Http
    await Http.post('/setting',formData)
        .then(({data}:AxiosResponse)=>{
          console.log('response setting :',data)
          setSuccmsg({...data})
          setTimeout(()=>{
              // document.location.reload()
              navigate(`/loading/${id}/user&setting`)
          },2000)
        }).catch(({response})=>{
          console.log('error setting will be',response)
          setErrmsg({...response.data})
        })
        
  } 
  //onchange event
  const onChangeInput=(e:ChangeEvent<HTMLInputElement>)=>{
    setFormData((prevstate)=>(
        {...prevstate,[e.target.id]:e.target.value}
    ))
}
  const onChangeInputFile=(e:ChangeEvent<HTMLInputElement>)=>{
    //   console.log('foto =',e.target.files![0])
     setFormData(prevstate=>(
        {...prevstate,[e.target.id]:e.currentTarget.files![0]}
     ))
}

const onChangeSelect=(e:ChangeEvent<HTMLSelectElement>)=>{
  console.log('select will be ',e.target.selectedOptions[0].value)
  setFormData((prevstate)=>(
      {...prevstate,[e.target.id]:e.target.selectedOptions[0].value}
  ))
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
 
  useEffect(()=>{
      const errDisapear=setTimeout(() => {
            setErrmsg(undefined)
            setSuccmsg(undefined)
      }, 3000);
      return()=>{
        clearTimeout(errDisapear)
      }
  },[errmsg,succmsg])
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
           <form action="" onSubmit={submit} encType='multipart/form-data'>
           <div className={`setting-container ${styleCharsPacks[char || 'ratu'].target}`}>
              <img src={userInfoSetting?.data[0].avatar == null?userImg:`${avatarDomain}${userInfoSetting?.data[0].avatar}`} alt="image" className={`user-setting-img ${styleCharsPacks[char || 'ratu'].profile}`} onClick={()=>{
                  document.getElementById('avatar')?.click()
              }}/>
              <ul className='user-settings'>
              <div className={errmsg?.message?"err-message":'d-none'}><h3>{errmsg?.message}</h3></div>
              <div className={succmsg?.message != undefined?"succ-message":'d-none'}><h3>{succmsg?.message}</h3></div>
                <li><span>name : </span> <input type="text" id={'name'} onChange={onChangeInput}  placeholder={'name'} value={formData.name} /></li>
                <div className={errmsg?.errors.name != undefined?"err-message":'d-none'}><h3>{errmsg?.errors.name ?? ''}</h3></div>
                <li><span>username :</span> <input type="text" id={'username'} onChange={onChangeInput}  placeholder={'username'} value={formData.username} /></li>
                <div className={errmsg?.errors.username?"err-message":'d-none'}><h3>{errmsg?.errors.username}</h3></div>
                <li><span>password :</span> <input type="text" id={'password'} onChange={onChangeInput}  placeholder={'password'} /></li>
                <div className={errmsg?.errors.password?"err-message":'d-none'}><h3>{errmsg?.errors.password}</h3></div>
                <li><span>confirm password :</span> <input type="text" id={'password_confirm'} onChange={onChangeInput}  placeholder={'confirm password'} /></li>
                <div className={errmsg?.errors.password_confirm?"err-message":'d-none'}><h3>{errmsg?.errors.password_confirm}</h3></div>
                <li><span>status :</span> <input type="text" id={'status'} onChange={onChangeInput}  placeholder={'status'}  /></li>
                <div className={errmsg?.errors.status?"err-message":'d-none'}><h3>{errmsg?.errors.status}</h3></div>
                <li><span>country :</span> <input type="text" id={'country'} onChange={onChangeInput}  placeholder={'country'}  /></li>
                <div className={errmsg?.errors.country?"err-message":'d-none'}><h3>{errmsg?.errors.country}</h3></div>
                <li>
                  <span>gender :</span> 
                  <select id="gender" onChange={onChangeSelect}>
                    <option value="" selected>select</option>
                    <option value="male">male</option>
                    <option value="female">female</option>
                  </select>
                </li>
                <div className={errmsg?.errors.gender?"err-message":'d-none'}><h3>{errmsg?.errors.gender}</h3></div>
                <li><input type="file" id="avatar" onChange={onChangeInputFile} className='d-none' accept='image/*'/></li>
                {/* <li><input type="file" id="avatar" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
                  onChangeInputFile2(e.target.files!)
                }} className='d-none' accept='image/*'/></li> */}
                <div className={errmsg?.errors.avatar?"err-message":'d-none'}><h3>{errmsg?.errors.avatar}</h3></div>
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