import axios from 'axios';
import React ,{ChangeEvent, FormEvent, useEffect,useState} from 'react'
import { Http } from '../../../../services/http'
import Cookies from  'js-cookie'
import { useNavigate } from 'react-router-dom';
import './login.css'
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
 //===================================== 
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
                      navigate('/list')
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
  return (
    <form onSubmit={submit}>
    <div className='login__container'>
        <div className={errmsg.trim().length>1?"err-message":'d-none'}><h3>{errmsg}</h3></div>
        <label htmlFor="username">username</label>
        <input type="text" id='username' autoComplete='off' required value={username} onChange={onChangeInput}/>
        <label htmlFor="password">password</label>
        <input type="password" id='password' required value={password} onChange={onChangeInput}/>
        <button>login</button>
    </div>
    </form>
  )
}

export {Login}