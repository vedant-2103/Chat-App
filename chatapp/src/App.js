import Register from './pages/Register';
import "./Application.css";
import Login from './pages/Login';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthenticationContext";

function App(){

  const { currentUser } = useContext(AuthContext);

  // Basically a navigation route that checks if there is no current user
  // return to login page
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children
  };

  return(
    <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route index element={<ProtectedRoute>
          <Home/>
          </ProtectedRoute>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="register" element={<Register/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App;
