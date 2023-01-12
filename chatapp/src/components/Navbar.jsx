import React,{useContext} from 'react'
import {signOut} from "firebase/auth"
import { auth } from '../firebase'
import Profile from "../images/Uni.jpg"
import { AuthContext } from '../context/AuthenticationContext'


const Navbar = () => {

  const {currentUser} = useContext(AuthContext)
  return (
    <div className='navbar'>
      <span className="app">Chatapp</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.username}</span>
        <button onClick={()=>signOut(auth)}>Logout</button>
      </div>
    </div>
  )
}

export default Navbar