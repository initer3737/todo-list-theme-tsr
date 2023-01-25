import React from 'react'
import { RouterSmooth } from '../../../../services'
import { Title } from '../../../../utils'
import { Loading as LoadingOrganism } from '../../../organisms'
//=======================
function Loading() {
  return (
    <Title title='Loading'>
        <RouterSmooth>
          <LoadingOrganism/>
        </RouterSmooth>
    </Title>
  )
}

export {Loading}