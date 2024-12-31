import React, { useRef, useState } from "react"

import Back from "./Back"
import { price } from "../dummydata"
import { faq } from "../dummydata"
import Heading from "./Heading"
// import PriceCard from "./PriceCard"
import "../css/price.css"
// import Faq from "./Faq"



const Pricing = () => {
  const [click, setClick] = useState(false)
  
    const toggle = (index) => {
      if (click === index) {
        return setClick(null)
      }
      setClick(index)
    }
  return (
    <>
      <Back title='Choose The Right Plan' />
      <section className='price padding'>
        <div className='container grid'>
          {price.map((val) => (
                  <div className='items shadow'>
                    <h4>{val.name}</h4>
                    <h1>
                      <span>$</span>
                      {val.price}
                    </h1>
                    <p>{val.desc}</p>
                    <button className='outline-btn'>GET STARTED</button>
                  </div>
                ))}
        </div>
      </section>
      <Heading subtitle='FAQS' title='Frequesntly Ask Question' />
      <section className='faq'>
        <div className='container'>
          {faq.map((val, index) => (
            <div className='box'>
              <button className='accordion' onClick={() => toggle(index)} key={index}>
                <h2>{val.title}</h2>
                <span>{click === index ? <i className='fa fa-chevron-down'></i> : <i className='fa fa-chevron-right'></i>}</span>
              </button>
              {click === index ? (
                <div className='text'>
                  <p>{val.desc}</p>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default Pricing
