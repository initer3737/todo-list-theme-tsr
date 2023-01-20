import axios from "axios";
import Cookies from 'js-cookie'
import { useEffect } from "react";
//============================ 
    const token=async()=>{
        return await Cookies.get('token')
    } 
const Http=axios.create({
    baseURL:'http://127.0.0.1:8000/api/v1/',
    // withCredentials: true,
    headers:{
        'Content-type': 'application/json',
        Accept: 'application/json',
        'Authorization':`Bearer ${ Cookies.get('token')??''}`        
    }
})
export {
    Http
}