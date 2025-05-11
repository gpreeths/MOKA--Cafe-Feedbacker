import React from 'react'
import {Menu1} from '../Components/menu1'
import salad from '../Images/salad.jpg'
import cake from '../Images/cake.jpg'
import coffe from '../Images/coffe.png'
import logo from '../Images/logo.png'
import Footer from '../Components/Footer'

function Home() {
  return (
    <div>
      <Menu1 />

      <div className='images'>
        <img src={salad} alt="salad" className='pic1' />
        <h1 className='thenew'>The new MOKA is live </h1>
        <img src={coffe} alt="coffe" className='pic2' />
        
        <h1 className='at'>In</h1>
        <h1 className='kochi'>Kochi</h1>
        <img src={cake} alt="cake" className='pic3' />
        {/* <img src={logo} alt="" className='logooncoffee' /> */}
      </div>
      <Footer/>
      
    </div>
  )
}

export default Home
