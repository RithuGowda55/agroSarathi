import React from "react"
// import AboutCard from "./about/AboutCard"
import Hero from "./Hero"
import Testimonal from "./Testimonal"
import "../css/about.css"
// import Back from "../common/back/Back"
import Heading from "./Heading"
import { homeAbout } from "../dummydata"

const Home = () => {
  return (
    <>
      <Hero />
      <section className='aboutHome'>
        <div className='container flexSB'>
          <div className='left row'>
            <img src='./images/b7.jpg' alt='' />
          </div>
          <div className='right row'>
          <Heading subtitle='Enhance Your Farming Practices' title='AI-Powered Features for Smarter Agriculture' />
          <div className='items'>
              {homeAbout.map((val) => {
                return (
                  <div className='item flexSB'>
                    <div className='img'>
                      <img src={val.cover} alt='' />
                    </div>
                    <div className='text'>
                      <h2>{val.title}</h2>
                      <p>{val.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
      {/* <HAbout /> */}
      <Testimonal />
      {/* <Hblog /> */}
      {/* <Hprice /> */}
    </>
  )
}

export default Home
