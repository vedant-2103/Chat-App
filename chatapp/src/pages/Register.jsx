import React,{useState} from 'react'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth,storage} from "../firebase";
import Img from "../images/img.jpg";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Register = () => 
{
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();

  // form handler so that the register page donot refresh upon clicking signup
  // and stores its current data
  const formHandler = async (e) =>
  {
    e.preventDefault();
    const username =e.target[0].value;
    const email =e.target[1].value;
    const password =e.target[2].value;
    const file =e.target[3].files[0];

    try {
      const response = await createUserWithEmailAndPassword(auth, email, password)

      const storageRef = ref(storage, username);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          setErr(true);
        }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) =>
          {
            await updateProfile(response.user,{
              username,
              photoURL:downloadURL
            })
          });
        }
      );
    }
    catch(err){
      setErr(true);
      setLoading(false);
    }
  }

  return (
    <div className='form'>
        <div className='box'>
            {/* App Name called Chatapp */}
            <span className="app">Chatapp</span>

            {/* Page Name */}
            <span className="title">Register</span>
            <form onSubmit={formHandler}>
                <input type="text" placeholder='Username' />
                <input type="email" placeholder='Email'/>
                <input type="password" placeholder='Password'/>
                <input style={{display:"none"}}type="file" id='file'/>
                <label htmlFor='file'>
                    <img src={Img} alt=""/>
                    <span>Pick a picture</span>
                </label>
                <button>Sign up</button>
                {err && <span>Something went wrong!</span>}
            </form>
            <p>If you have an account.<a href="./pages/Login.jsx">Login</a>
            </p>
        </div>
    </div>
  )
}

export default Register