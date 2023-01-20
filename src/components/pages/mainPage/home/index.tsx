import React from 'react'
import { Home as HomeOrganism } from '../../../organisms'
import { NavLink } from 'react-router-dom'
import {
  Title
} from '../../../../utils'
import { 
  Header2 
} from '../../../molekuls'
import './home.css'
//=======================
export default function Home() {
    // const recoilCharSelect=useRecoilValue(CharsSelect)
  return (
    <div>
      <Header2/>
      <div className="home__container">
      <Title title='home'>
            <HomeOrganism/>
        </Title>
      </div>
    </div>
  )
}