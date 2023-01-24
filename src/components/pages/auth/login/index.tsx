import React from 'react'
import { RouterSmooth } from '../../../../services'
import {
   Title 
} from '../../../../utils'
import { 
  Header 
} from '../../../molekuls'
import {Login as LoginOrganism} from '../../../organisms/'
//===============
export default function Login() {
  return (
    <Title title='login'>
      <RouterSmooth>
        {/* <Header/> */}
        <LoginOrganism/>
      </RouterSmooth>
    </Title>
  )
}
