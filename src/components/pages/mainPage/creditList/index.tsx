import React from 'react'
import { RouterSmooth } from '../../../../services'
import { Title } from '../../../../utils'
import { CreditList  as CreditListOrganism} from '../../../organisms/mainPage/creditList'
//========================================
function CreditList() {
  return(
    <Title title={' credit lists'}>
        <RouterSmooth>
          <CreditListOrganism/>
        </RouterSmooth>
    </Title>
  )
        
}

export {CreditList}