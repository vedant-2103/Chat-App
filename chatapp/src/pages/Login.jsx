import React,{useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const [err, setErr] = useState(false);
  // const [loading, setLoading] = useState(false);

  // UseNavigate function is used to goto Homepage after successful operation
  const navigate = useNavigate();

  // form handler so that the register page donot refresh upon clicking signup
  // and stores its current data
  const formHandler = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/login");
    } catch (err) {
      setErr(true);
      // setLoading(false);
    }
  };

  return (
    <div className="form">
      <div className="box">
        <span className="app">Chatapp</span>
        <span className="title"> Login </span>
        <form onSubmit={formHandler}>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button>Sign In</button>
          {err && <span>Something went wrong!</span>}
        </form>
        <p>
          If you don't have an account.
          <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
