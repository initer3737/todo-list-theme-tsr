import axios from 'axios';
import React ,{ChangeEvent, FormEvent, useEffect,useState} from 'react'
import { Http } from '../../../../services/http'
import Cookies from  'js-cookie'
import { NavLink, useNavigate ,useParams} from 'react-router-dom';
import { CharsSelect } from '../../../../globalState';
import { useRecoilValue } from 'recoil';
import './login.css'
import { useMap } from '../../../../utils';
import RatuBackend from '../../../../assets/ratuBackend.mp4'
import RajaFrontend from '../../../../assets/rajaFrontend.mp4'
import PadukaFullstek from '../../../../assets/padukaFullstek.mp4'
import { IChar } from '../../../../Types&Interfaces';
import { IstyleCharsPacks } from '../../../../Types&Interfaces/stylecharspaks/IstyleChar';
import { Icon } from '../../../atoms';
//======================
function Login() {
  let formDatas={
    username:'',
    password:''
  }
  const [formData,setFormData]=useState(formDatas);
  const {username,password}=formData
  const [errmsg,setErrmsg]=useState('')
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
              await Http.post('/login',JSON.stringify(formData))
                .then(res=>{
                  const {data}=res
                  console.log(res)
                    if(data.status == 403)setErrmsg(data.message)
                    if(data.status == 200){
                        const getResToken=data.token;
                      Cookies.set('token',getResToken)
                      // setTimeout(()=>navigate('/list'),3000)
                      navigate(`/menu/${id}`)
                    }
                })
                .catch((er)=>{
                    console.log(er);
                })
            } catch (err) {
                console.log(err);
            }
            
            setFormData(formDatas)
    }
    const onChangeInput=(e:ChangeEvent<HTMLInputElement>)=>{
        setFormData((prevstate)=>(
            {...prevstate,[e.target.id]:e.target.value}
        ))
    }

        useEffect(()=>{
            setTimeout(()=>{
              setErrmsg('')
            },3000)
        },[errmsg])
        useEffect(()=>{
          if(token.trim().length >1)navigate(`/menu/${id}`)
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
            <NavLink to={`/loading/${id}/home`} className={`backLink`}>
              back
              <Icon icon={'back'} name={' '}/>
            </NavLink>
      </div>
    <div className={`login__container ${styleCharsPacks[char || 'ratu'].card}`}>
        <div className={errmsg.trim().length>1?"err-message":'d-none'}><h3>{errmsg}</h3></div>
        <label htmlFor="username">username</label>
        <input type="text" id='username' autoComplete='off' required value={username} onChange={onChangeInput}/>
        <label htmlFor="password">password</label>
        <input type="password" id='password' required value={password} onChange={onChangeInput}/>
        <button
          className={`${styleCharsPacks[char || 'ratu'].link}`}
        >login</button>
        <div className="sub-login-container">
          <NavLink to={`/register/${id}`} className={`${styleCharsPacks[char || 'ratu'].link}`}>
             create account
          </NavLink>
          <NavLink to={`/forgot/${id}`} className={`${styleCharsPacks[char || 'ratu'].link}`}>
            reset account
          </NavLink>
        </div>
    </div>
    <NavLink to={`/menu/${id}`} className='menujumenugame'>
       menuju menu game!!!!
    </NavLink>
    </form>
  )
}

export {Login}