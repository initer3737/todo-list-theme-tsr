import React from 'react'
import { RouterSmooth } from '../../../../services'
import { Title } from '../../../../utils'
import { Lobby as LobbyOrganism } from '../../../organisms'
//=======================
function Lobby() {
  return (
    <Title title='lobby'>
        <RouterSmooth>
          <LobbyOrganism/>
        </RouterSmooth>
    </Title>
  )
}

export {Lobby}