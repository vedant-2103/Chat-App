import React from 'react'
import {signOut} from "firebase/auth"
import { auth } from '../firebase'
import Profile from "../images/Uni.jpg";


const Navbar = () => {
  return (
    <div className='navbar'>
      <span className="app">Chatapp</span>
      <div className="user">
        <img src={Profile} alt="" />
        <span>John</span>
        <button onClick={()=>signOut(auth)}>Logout</button>
      </div>
    </div>
  )
}

export default Navbar