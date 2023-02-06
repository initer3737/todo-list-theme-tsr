import React from 'react'
import { RouterSmooth } from '../../../../services'
import {
   Title 
} from '../../../../utils'
import { 
  Header 
} from '../../../molekuls'
import {Register as RegisterOrganism} from '../../../organisms/'
//===============
export default function Register() {
  return (
    <Title title='register'>
      <RouterSmooth>
        {/* <Header/> */}
        <RegisterOrganism/>
      </RouterSmooth>
    </Title>
  )
}
