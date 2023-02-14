import axios, { AxiosResponse } from 'axios';
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
type TEror={
  password:Array<string>,
  username:Array<string>
}
// interface IErrors{
//     errors:TEror
// }
interface IError{
  errors:TEror,
  message:string
}
//=========credeintial when user send wrong credential and throw 403 
type Tcredentials={
  message:string,
  status:number
}
interface Icredentials{
  data:Tcredentials
}
function Login() {
  let formDatas={
    username:'',
    password:''
  }
  const [formData,setFormData]=useState(formDatas);
  const {username,password}=formData
  let [wrongCredentials,setWrongCredentials]=useState<Icredentials>()
  const [errmsg,setErrmsg]=useState<IError>()
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
                .then((data:AxiosResponse)=>{
                    // console.log(data.data.message)
                    // console.log('res 403 ',data)
                    if(data.data.status == 403){
                                          //satu field saja 
                      // setWrongCredentials(data.data.message)
                                    //object data{status,message,...etc}
                      setWrongCredentials({...data}) //property akan ditimpa jadi harus cocok 
                    }
                      const getResToken=data.data.token;
                    if(getResToken.length > 1){
                      Cookies.set('token',getResToken)
                      navigate(`/menu/${id}`)
                    }
                })
                .catch((er)=>{
                      console.log(`data`,er.response.data)
                          //peoperti yang terdapat di er adalah errors:{username,password},message:string, maka di dalam interface dibuatkan data berupa peoperty errors:Teror[menyimpan 2 field bertype array<string>],dan message:string
                  if(er.response.status == 422)setErrmsg({...er.response.data})
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
              setWrongCredentials(undefined)
              setErrmsg(undefined)
            },3000)
        },[wrongCredentials,errmsg])
        useEffect(()=>{
          if(token.trim().length >1 && !null)navigate(`/menu/${id}`)
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
        <div className={`${wrongCredentials?.data.message==undefined?'d-none':"err-message"}`}><h3>{wrongCredentials?.data.message}</h3></div>
        <div className={errmsg?.message?"err-message":'d-none'}><h3>{errmsg?.message}</h3></div>
        <label htmlFor="username">username</label>
        <input type="text" id='username' autoComplete='off'  value={username} onChange={onChangeInput}/>
        <div className={errmsg?.errors.username?"err-message":'d-none'}><h3>{errmsg?.errors.username[0]}</h3></div>
        <label htmlFor="password">password</label>
        <input type="password" id='password'  value={password} onChange={onChangeInput}/>
        <div className={errmsg?.errors.password?"err-message":'d-none'}><h3>{errmsg?.errors.password}</h3></div>
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
    {/* <NavLink to={`/menu/${id}`} className='menujumenugame'>
       menuju menu game!!!!
    </NavLink> */}
    </form>
  )
}

export {Login}