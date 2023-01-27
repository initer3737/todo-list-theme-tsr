import React from 'react'
import { RouterSmooth } from '../../../../services'
import { Title } from '../../../../utils'
import { Game as GameOrganism } from '../../../organisms'
//=======================
function Game() {
  return (
    <Title title='game'>
        <RouterSmooth>
          <GameOrganism/>
        </RouterSmooth>
    </Title>
  )
}

export {Game}