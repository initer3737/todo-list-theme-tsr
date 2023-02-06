import axios from 'axios';
import React ,{ChangeEvent, FormEvent, useEffect,useState} from 'react'
import { Http } from '../../../../services/http'
import Cookies from  'js-cookie'
import { NavLink, useNavigate ,useParams} from 'react-router-dom';
import { CharsSelect } from '../../../../globalState';
import { useRecoilValue } from 'recoil';
import './register.css'
import { useMap } from '../../../../utils';
import RatuBackend from '../../../../assets/ratuBackend.mp4'
import RajaFrontend from '../../../../assets/rajaFrontend.mp4'
import PadukaFullstek from '../../../../assets/padukaFullstek.mp4'
import { IChar } from '../../../../Types&Interfaces';
import { IstyleCharsPacks } from '../../../../Types&Interfaces/stylecharspaks/IstyleChar';
//======================
function Register() {
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
                      navigate(`/list/${id}`)
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
            <NavLink to={`/loading/${id}/login`} className={`backLink`}>Kembali</NavLink>
      </div>
    <div className={`login__container ${styleCharsPacks[char || 'ratu'].card}`}>
        <div className={errmsg.trim().length>1?"err-message":'d-none'}><h3>{errmsg}</h3></div>
        <label htmlFor="username">email</label>
        <input type="text" id='username' autoComplete='off' required value={username} onChange={onChangeInput}/>
        <label htmlFor="username">username</label>
        <input type="text" id='username' autoComplete='off' required value={username} onChange={onChangeInput}/>
        <label htmlFor="username">country</label>
        <input type="text" id='username' autoComplete='off' required value={username} onChange={onChangeInput}/>
        <label htmlFor="password">password</label>
        <input type="password" id='password' required value={password} onChange={onChangeInput}/>
        <label htmlFor="password">confirm password</label>
        <input type="password" id='password' required value={password} onChange={onChangeInput}/>
        <label htmlFor="username">gender</label>
        <select name="" id="">
          <option value="" selected>male</option>
          <option value="">female</option>
        </select>
        <button
          className={`${styleCharsPacks[char || 'ratu'].link}`}
        >register</button>
    </div>
    <NavLink to={`/menu/${id}`} className='menujumenugame'>
       menuju menu game!!!!
    </NavLink>
    </form>
  )
}

export {Register}