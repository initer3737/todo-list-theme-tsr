import React, { useEffect,useState } from 'react'
import { Navigate, NavLink, useNavigate, useParams } from 'react-router-dom'
import Cookies from 'js-cookie'
import { AxiosResponse } from 'axios'
import { Http } from '../../../../services'
import RatuBackend from '../../../../assets/ratuBackend.mp4'
import RajaFrontend from '../../../../assets/rajaFrontend.mp4'
import PadukaFullstek from '../../../../assets/padukaFullstek.mp4'
import { useRecoilValue } from 'recoil'
import'./loading.css'
import { CharsSelect } from '../../../../globalState'
import { useMap } from '../../../../utils'
import loadingSvg from '../../../../assets/loading.svg'
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
function Loading() {
  const [user,setUser]=useState<ILists>() 
  const token= Cookies.get('token')??''
  const [char,setChar]=useState()
  let [dot,setDot]=useState<string>('.')
  const chars=useRecoilValue(CharsSelect)
  const {id,url}=useParams()
  const filterDataChar=useMap(chars).filter(char=>char[1].id == id)
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

    filterDataChar.map(char=>{
      setChar(char[1].char_id)
    })

      const navigateUrlInterval=setTimeout(()=>{
        if(url?.indexOf('&') == -1){ //single url example /menu/ has been found!!
          const urlSingular=`/${url}/${id}`
            navigate(urlSingular);
           return
        }else{
              // !single url example /menu&charId&magicAtt has been found!!
            const urlPlurals= `/${url?.replace('&',`/`)}/${id}`
            navigate(urlPlurals);
        }
      },9000) //navigateUrlInterval
    
        const loadingInterval=setInterval(()=>{
              setDot(prevValue=>prevValue+'.')
        },3000);//loading interval must be every 3 seconds because navigateUrlInterval is 9 seconds;
        //unmounted lifecycle
          ()=>{
            clearInterval(loadingInterval)
            clearTimeout(navigateUrlInterval)
          }
     
  },[])
  
      // useEffect(()=>{
      //   try {
      //     const getDataUser=async()=>{
      //      await Http.get<ILists>('/lists')
      //         .then((res: AxiosResponse<ILists>)=>{
      //             setUser({...res.data}) 
      //             if(res.status === 401)navigate('/login')
      //             //memasukkan object dengan property data ke dalam state
      //         })
      //     }
      //     getDataUser()
          
      //   } catch (err) {
      //     console.log('err',err);
      //   }
      // },[])
      // useEffect(()=>{
      //   if(token.trim().length<1)navigate('/login')
      // },[token])
 //=====================================    
 //============char style
 const styleCharsPacks={
      raja:{
          card:'RajaFrontendCard',
          link:'RajaFrontendLinkMenu'
      },
      ratu:{
          card:'RatuBackendCard',
          link:'RatuBackendLinkMenu'
      },
      paduka:{
          card:'PadukaFullstekCardLoading',
          link:'PadukaFullstekLinkMenu'
      } 
    }
 //============char style 
 //===========video chars
 const datachars={
  raja:RajaFrontend,
  ratu:RatuBackend,
  paduka:PadukaFullstek,
}
 //===========video chars
  
  return (
        <div>
          <video src={datachars[char || 'ratu']} autoPlay loop className='menu-video'></video>
          <div className={`menu-container-loading ${styleCharsPacks[char || 'ratu'].card}`}>
            <div className={`link-wrapper ${styleCharsPacks[char || 'ratu'].link}`}>
              <NavLink to={''} className={''}>
                 loading{dot}
              </NavLink>
            </div>
          </div>
        </div>
  )
}

export {Loading}