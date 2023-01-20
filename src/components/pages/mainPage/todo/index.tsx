import React from 'react'
import { Title } from '../../../../utils'
import { Todo as TodoOrganism } from '../../../organisms'
//=======================
function Todo() {
  return (
    <Title title='todo'>
        <TodoOrganism/>
    </Title>
  )
}

export {Todo}