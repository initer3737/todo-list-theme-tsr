import React from 'react'
import { RouterSmooth } from '../../../../services'
import { Title } from '../../../../utils'
import { UserInfo as UserInfoOrganism } from '../../../organisms'
//=======================
function UserInfo() {
  return (
    <Title title='info user'>
        <RouterSmooth>
          <UserInfoOrganism/>
        </RouterSmooth>
    </Title>
  )
}

export {UserInfo}