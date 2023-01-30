import React from 'react'
import { RouterSmooth } from '../../../../services'
import { Title } from '../../../../utils'
import { Setting as SettingOrganism } from '../../../organisms'
//=======================
function Setting() {
  return (
    <Title title='settings'>
        <RouterSmooth>
          <SettingOrganism/>
        </RouterSmooth>
    </Title>
  )
}

export {Setting}