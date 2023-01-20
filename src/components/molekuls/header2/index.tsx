import React from 'react'
import video from '../../../assets/Wave - 73515.mp4'
import './header2.css'
//==========================
export default function Header2() {
  return (
    <div>
      <video id='video-header' src={video} loop muted autoPlay className='header2-video'></video>
    </div>
  )
}