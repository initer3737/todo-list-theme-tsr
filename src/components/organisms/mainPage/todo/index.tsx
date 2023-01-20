import React, { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { AxiosResponse } from 'axios'
import { Http } from '../../../../services'
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
  const navigate=useNavigate()
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
        try {
          const getDataUser=async()=>{
           await Http.get<ILists>('/lists')
              .then((res: AxiosResponse<ILists>)=>{
                  setUser({...res.data}) 
                  if(res.status === 401)navigate('/login')
                  //memasukkan object dengan property data ke dalam state
              })
          }
          getDataUser()
          
        } catch (err) {
          console.log('err',err);
        }
      },[])
      useEffect(()=>{
        if(token.trim().length<1)navigate('/login')
      },[token])
 //=====================================     
  return (
        <div>
          your token must be : {token}
          <button onClick={logout}>logout</button>
          <p>
            user_id : {user?.data.id}
          </p>
          <p>
            username : {user?.data.username}
          </p>
          <p>
            email : {user?.data.email}
          </p>
        </div>
  )
}

export {Todo}