import axios from 'axios';
import React ,{ChangeEvent, FormEvent, useEffect,useState} from 'react'
import { Http } from '../../../../services/http'
import Cookies from  'js-cookie'
import { NavLink, useNavigate ,useParams} from 'react-router-dom';
import { CharsSelect } from '../../../../globalState';
import { useRecoilValue } from 'recoil';
import './reset.css'
import { useMap } from '../../../../utils';
import RatuBackend from '../../../../assets/ratuBackend.mp4'
import RajaFrontend from '../../../../assets/rajaFrontend.mp4'
import PadukaFullstek from '../../../../assets/padukaFullstek.mp4'
import { IChar } from '../../../../Types&Interfaces';
import { IstyleCharsPacks } from '../../../../Types&Interfaces/stylecharspaks/IstyleChar';
import { Icon } from '../../../atoms';
//======================
function Reset() {
  let formDatas={
    username:'',
    password:'',
    password_confirm:''
  }

    type TErrorResponse={
        errors:{
            username:string,
            password:string,
            password_confirm:string
        },
        message:string 
    } 
  interface IErrorResponse{
    data:TErrorResponse
  }
  interface ISuccesResponse{
    data:{
      message:string
    }
  }
  const [formData,setFormData]=useState(formDatas);
  const {username,password,password_confirm}=formData
  const [errmsg,setErrmsg]=useState<IErrorResponse>()
  const [succmsg,setSuccmsg]=useState<ISuccesResponse>()
  const navigate=useNavigate()
  const token=Cookies.get('token')??''
  const chars=useRecoilValue<IChar>(CharsSelect)
  const [char,setChar]=useState()
  const {id}=useParams()
  const filterDataChar=useMap(chars).filter(char=>char[1].id == id)
  const datachars={
    raja:RajaFrontend,
    ratu:RatuBackend,
    paduka:PadukaFullstek,
}
 //===================================== 
 const styleCharsPacks={
  raja:{
      card:'RajaFrontendCard',
      link:'RajaFrontendLinkHome'
  },
  ratu:{
      card:'RatuBackendCard',
      link:'RatuBackendLink'
  },
  paduka:{
      card:'PadukaFullstekCard',
      link:'PadukaFullstekLink'
  }
} satisfies IstyleCharsPacks
    const submit=async(event:React.FormEvent<HTMLFormElement>)=>{
            event.preventDefault()
            try {
              await Http.post('/reset',JSON.stringify(formData))
                .then(res=>{
                  setSuccmsg({...res})
                })
                .catch(({response})=>{
                    console.log(response);
                    setErrmsg({...response})
                })
            } catch (err) {
                console.log(err);
            }
            
            // setFormData(formDatas)
    }
    const onChangeInput=(e:ChangeEvent<HTMLInputElement>)=>{
        setFormData((prevstate)=>(
            {...prevstate,[e.target.id]:e.target.value}
        ))
    }

        useEffect(()=>{
            setTimeout(()=>{
              setErrmsg(undefined)
              setSuccmsg(undefined)
              setFormData(formDatas)
              let timeoutNavigate=setTimeout(()=>{
                  navigate(`loading/${id}/login`)
                },3000)
            },3000)
        },[errmsg,succmsg])
        useEffect(()=>{
          if(token.trim().length >1)navigate('/list')
        },[token])
        useEffect(()=>{
            filterDataChar.map(chars=>{
                setChar(chars[1].char_id)
            })
        },[])
  return (
    <form onSubmit={submit}>
      <video src={datachars[char|| 'ratu']} className="login_video" autoPlay loop></video>
      <div className={`backLink-wrapper ${styleCharsPacks[char || 'ratu'].link}`}>
            <NavLink to={`/loading/${id}/login`} className={`backLink`}>
              back
              <Icon icon={'back'} name={' '}/>
            </NavLink>
      </div>
    <div className={`login__container ${styleCharsPacks[char || 'ratu'].card}`}>
        <div className={succmsg?.data.message != undefined?"succ-message":'d-none'}><h3>{succmsg?.data.message}</h3></div>
        <div className={errmsg?.data.message != undefined?"err-message":'d-none'}><h3>{errmsg?.data.message}</h3></div>
        <label htmlFor="username">username</label>
        <input type="text" id='username' autoComplete='off'  value={username} onChange={onChangeInput}/>
        <div className={errmsg?.data.errors.username != undefined?"err-message":'d-none'}><h3>{errmsg?.data.errors.username}</h3></div>
        <label htmlFor="password">new password</label>
        <input type="password" id='password'  value={password} onChange={onChangeInput}/>
        <div className={errmsg?.data.errors.password != undefined?"err-message":'d-none'}><h3>{errmsg?.data.errors.password}</h3></div>
        <label htmlFor="password_confirm">confirm password</label>
        <input type="password" id='password_confirm'  value={password_confirm} onChange={onChangeInput}/>
        <div className={errmsg?.data.errors.password_confirm != undefined?"err-message":'d-none'}><h3>{errmsg?.data.errors.password_confirm}</h3></div>
        <button
          className={`${styleCharsPacks[char || 'ratu'].link}`}
        >reset</button>
    </div>
    {/* <NavLink to={`/menu/${id}`} className='menujumenugame'>
       menuju menu game!!!!
    </NavLink> */}
    </form>
  )
}

export {Reset}