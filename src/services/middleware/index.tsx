import React, { useEffect,useState } from 'react'
import { Outlet,Navigate ,useParams} from 'react-router-dom'
import Cookies from 'js-cookie'
//=================
    type propsUseAuth={token:typeof Cookies}
const useAutToken=({token}:propsUseAuth)=>{
        const {id}=useParams();
    // const token=useRecoilValue(TokenSelect)
    // const token=Cookies.get('token')??''
    return token.trim().length >1?<Outlet/>: <Navigate to={`/login/${id}`}/>
}
 function Middleware() {
    let [token,setToken]=useState<typeof Cookies>(Cookies.get('token')??'') 
     useEffect(()=>{

     },[token])
    // console.log(useAutToken())
  return useAutToken({token:token})
}

export{
    Middleware
}