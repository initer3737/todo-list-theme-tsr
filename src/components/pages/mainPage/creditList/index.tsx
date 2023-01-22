import React from 'react'
import { Title } from '../../../../utils'
import { CreditList  as CreditListOrganism} from '../../../organisms/mainPage/creditList'
//========================================
function CreditList() {
  return(
    <Title title={' credit lists'}>
        <CreditListOrganism/>
    </Title>
  )
        
}

export {CreditList}