import React from 'react'
import Img from "../images/img.jpg";

const Register = () => {
  return (
    <div className='form'>
        <div className='box'>
            <span className="app">Chatapp</span>
            <span className="title">Register</span>
            <form>
                <input type="text" placeholder='Username' />
                <input type="email" placeholder='Email'/>
                <input type="password" placeholder='Password'/>
                <input style={{display:"none"}}type="file" id='file'/>
                <label htmlFor='file'>
                    <img src={Img} alt=""/>
                    <span>Pick a picture</span>
                </label>
                <button>Sign up</button>
            </form>
            <p>If you have an account.<a href="./pages/Login.jsx">Login</a>
            </p>
        </div>
    </div>
  )
}

export default Register