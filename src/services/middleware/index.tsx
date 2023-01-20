import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'
//=================

const useAutToken=()=>{
    // const token=useRecoilValue(TokenSelect)
    const token=Cookies.get('token')??''
    return token.trim().length >1?<Outlet/>: <Navigate to={'/login'}/>
}
 function Middleware() {
    // console.log(useAutToken())
  return useAutToken()
}

export{
    Middleware
}