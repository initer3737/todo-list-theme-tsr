import React from 'react'
import { RouterSmooth } from '../../../../services'
import {
   Title 
} from '../../../../utils'
import { 
  Header 
} from '../../../molekuls'
import {Reset as ResetOrganism} from '../../../organisms/'
//===============
export default function Reset() {
  return (
    <Title title='reset user akun'>
      <RouterSmooth>
        {/* <Header/> */}
        <ResetOrganism/>
      </RouterSmooth>
    </Title>
  )
}
