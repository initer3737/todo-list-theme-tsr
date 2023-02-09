import React from 'react'
import { ChangeChar as ChangeCharOrganism } from '../../../organisms'
import { NavLink } from 'react-router-dom'
import {
  Title
} from '../../../../utils'
import { 
  Header2 
} from '../../../molekuls'
import './changeChar.css'
import { RouterSmooth } from '../../../../services'
//=======================
export default function ChangeChar() {
    // const recoilCharSelect=useRecoilValue(CharsSelect)
  return (
    <div>
      {/* <Header2/> */}
      <div className="home__container">
      <Title title='change character'>
           <RouterSmooth>
              <ChangeCharOrganism/>
           </RouterSmooth>
        </Title>
      </div>
    </div>
  )
}