import React ,{ReactNode} from 'react'
import '../../../../../index.css'
import './showChar.css'
import { CharsSelect } from '../../../../globalState'
import { useParams ,Outlet} from 'react-router-dom'
import { useMap } from '../../../../utils'
import { useRecoilValue } from 'recoil'
//===========================================
function ShowChar() {
    const recoilCharSelect=useRecoilValue(CharsSelect)
    const {id}=useParams()
  return (
   <>
        {
            useMap(recoilCharSelect).filter((char) => char[1].id == id).map(data=>(
                    <div className="card" key={id}>
                        {/* <p>id : {data[1].id}</p> */}
                        <p>name : {data[1].name}</p>
                        <p className={data[1].mission ??'d-none'}>mission : {data[1].mission}</p>
                        <p>{data[1].jikoushokai}</p>
                        <p>{data[1].description}</p>
                    </div>
            ))
        }
   </>
  )
}

export {
    ShowChar
}
