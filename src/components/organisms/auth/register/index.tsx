import axios, { AxiosError } from 'axios';
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
import { Icon } from '../../../atoms';
//======================
function Register() {
  let formDatas={
      username:'',
      country:'',
      email:'',
      gender:'',
      password:'',
      password_confirm:'',
  }
  //==============
    type TErrMsg={
      username:Array<String>,
      country:Array<String>,
      email:Array<String>,
      gender:Array<String>,
      password:Array<String>,
      password_confirm:Array<String>,
    }
   interface IErrMsg{
      errors:TErrMsg,
      message:string
   } 
  const [formData,setFormData]=useState(formDatas);
  const {username,password,password_confirm,gender,country,email}=formData
  const [errmsg,setErrmsg]=useState<IErrMsg>()
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
              await Http.post('/register',JSON.stringify(formData))
                .then(res=>{
                  const {data}=res
                  console.log('res when success 200! ',res)
                    if(data.status == 200){
                        const getResToken=data.token;
                        console.log(getResToken)
                      Cookies.set('token',getResToken)
                      // setTimeout(()=>navigate('/list'),3000)
                      navigate(`/loading/${id}/menu`)
                    }
                })
                .catch(({response})=>{
                    console.log(response);
                      setErrmsg({...response?.data})
                })
            
            setFormData(formDatas)
    }
    const onChangeInput=(e:ChangeEvent<HTMLInputElement>)=>{
        setFormData((prevstate)=>(
            {...prevstate,[e.target.id]:e.target.value}
        ))
    }
    const onChangeSelect=(e:ChangeEvent<HTMLSelectElement>)=>{
        console.log('select will be ',e.target.selectedOptions[0].value)
        setFormData((prevstate)=>(
            {...prevstate,[e.target.id]:e.target.selectedOptions[0].value}
        ))
    }

        useEffect(()=>{
            setTimeout(()=>{
              setErrmsg(undefined)
            },3000)
        },[errmsg])
        useEffect(()=>{
          // if(token.trim().length >1)navigate(`loading/${id}/menu`)
        },[token])
        useEffect(()=>{
            filterDataChar.map(chars=>{
                setChar(chars[1].char_id)
            })
        },[])
  return (
    <form onSubmit={submit}>
      <video src={datachars[char|| 'ratu']} className="login_video" muted autoPlay loop></video>
      <div className={`backLink-wrapper ${styleCharsPacks[char || 'ratu'].link}`}>
            <NavLink to={`/loading/${id}/login`} className={`backLink`}>
              back
              <Icon icon={'back'} name={' '}/>
            </NavLink>
      </div>
    <div className={`register__container ${styleCharsPacks[char || 'ratu'].card}`}>
        <div className={errmsg?.message != undefined?"err-message":'d-none'}><h3>{errmsg?.message}</h3></div>
        <label htmlFor="email">email</label>
        <input type="text" id='email' placeholder='email' autoComplete='off'  value={email} onChange={onChangeInput}/>
        <div className={errmsg?.errors.email != undefined?"err-message":'d-none'}><h3>{errmsg?.errors.email}</h3></div>
        <label htmlFor="username">username</label>
        <input type="text" placeholder='username' id='username' autoComplete='off'  value={username} onChange={onChangeInput}/>
        <div className={errmsg?.errors.username != undefined?"err-message":'d-none'}><h3>{errmsg?.errors.username}</h3></div>
        <label htmlFor="country">country</label>
        <input type="text" placeholder='country' id='country' autoComplete='off'  value={country} onChange={onChangeInput}/>
        <div className={errmsg?.errors.country != undefined?"err-message":'d-none'}><h3>{errmsg?.errors.country}</h3></div>
        <label htmlFor="password">password</label>
        <input type="password" placeholder='password' id='password'  value={password} onChange={onChangeInput}/>
        <div className={errmsg?.errors.password != undefined?"err-message":'d-none'}><h3>{errmsg?.errors.password}</h3></div>
        <label htmlFor="password_confirm">confirm password</label>
        <input type="password" placeholder='confirm password' id='password_confirm'  value={password_confirm} onChange={onChangeInput}/>
        <div className={errmsg?.errors.password_confirm != undefined?"err-message":'d-none'}><h3>{errmsg?.errors.password_confirm}</h3></div>
        <label htmlFor="gender">gender</label>
        <select onChange={onChangeSelect} id="gender" >
          <option value="select" selected>select</option>
          <option value="male">male</option>
          <option value="female">female</option>
        </select>
        <div className={errmsg?.errors.gender != undefined?"err-message":'d-none'}><h3>{errmsg?.errors.gender}</h3></div>
        <button
          className={`${styleCharsPacks[char || 'ratu'].link}`}
        >register</button>
    </div>
    </form>
  )
}

export {Register}