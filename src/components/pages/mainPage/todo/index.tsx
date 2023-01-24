import React from 'react'
import { RouterSmooth } from '../../../../services'
import { Title } from '../../../../utils'
import { Todo as TodoOrganism } from '../../../organisms'
//=======================
function Todo() {
  return (
    <Title title='todo'>
        <RouterSmooth>
          <TodoOrganism/>
        </RouterSmooth>
    </Title>
  )
}

export {Todo}