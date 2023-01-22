import React from 'react'
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
      {/* <Header/> */}
      <LoginOrganism/>
    </Title>
  )
}
