import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import Img from "../images/img.jpg";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);

  // UseNavigate function is used to goto Homepage after successful operation
  const navigate = useNavigate();

  // form handler so that the register page donot refresh upon clicking signup
  // and stores its current data
  const formHandler = async (e) => {
    e.preventDefault();
    const username = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const storageRef = ref(storage, username);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        (error) => {
          setErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            
            // Updates the profile
            await updateProfile(response.user, {
              username,
              photoURL: downloadURL,
            });

            // It is used to store user data on Firebase datastore
            await setDoc(doc(db, "users", response.user.uid), {
              uid: response.user.uid,
              username,
              email,
              photoURL: downloadURL,
            });

            //Stores chats of a particular user
            await setDoc(doc(db, "userchats", response.user.uid), {});
            navigate("/");
          });
        }
      );
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <div className="form">
      <div className="box">
        {/* App Name called Chatapp */}
        <span className="app">Chatapp</span>

        {/* Page Name */}
        <span className="title">Register</span>
        <form onSubmit={formHandler}>
          <input type="text" placeholder="Username" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <input style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src={Img} alt="" />
            <span>Pick a picture</span>
          </label>
          <button>Sign up</button>
          {err && <span>Something went wrong!</span>}
        </form>
        <p>
          If you have an account.<Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
