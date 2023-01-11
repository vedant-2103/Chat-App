import React from 'react'
import Img from "../images/img.jpg";

const Login = () => {
  return (
    <div className='form'>
        <div className='box'>
            <span className="app">Chatapp</span>
            <span className="title"> Login </span>
            <form>
                <input type="email" placeholder='Email'/>
                <input type="password" placeholder='Password'/>
                <button>Sign In</button>
            </form>
            <p>If you don't have an account.<a href="./pages/Register.jsx">Register</a>
            </p>
        </div>
    </div>
  )
}

export default Login 