import React from 'react'
import kembang from '../../../assets/winter-7676253.jpg'
import video from '../../../assets/Grass - 66810.mp4'
import './header.css'
export default function Header() {
  return (
    <header className='bg-1'>
      <section className="content-header-container">
          <div className="header-lingkaran-container">
              <div className="header-lingkaran"></div>
              <div className="header-lingkaran"></div>
              {/* <div className="header-lingkaran"></div>
              <div className="header-lingkaran"></div>
              <div className="header-lingkaran"></div>
              <div className="header-lingkaran"></div> */}
            </div>
        <img src={kembang} alt="kembang" className='header-image' />
        <video src={video} className='header-video' autoPlay muted loop></video>
      </section>
        <section className="text-container">
          <h5>running into the night</h5>
          <section className="text-style-flex">
            <h4>Raja Front end</h4>
            <h4>Ratu Back end</h4>
            <h4>paduka fullstek</h4>
            <div className="header-lingkaran-container center-center-y">
              <div className="header-lingkaran"></div>
              <div className="header-lingkaran"></div>
              <div className="header-lingkaran"></div>
            </div>
            <img src={kembang} alt="kembang" className='header-image' />
            <img src={kembang} alt="kembang" className='header-image' />
          </section>
        </section>
    </header>
  )
}
