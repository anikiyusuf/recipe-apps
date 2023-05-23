import  { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"
import { useCookies } from "react-cookie";
// import { useNavigate } from "react-router-dom";
import "./Register.scss"
import { useNavigate} from "react-router-dom"


export default function Register() {
     const navigate = useNavigate()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    // eslint-disable-next-line no-unused-vars
    const[_,  setCookies] = useCookies(["access_token"]);
    // const navigate = useNavigate();
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        await axios.post("https://recipeapp-server.onrender.com/auth/register" , { 
         username,
          password,
        });
        alert("Registration Completed! Now login.");
        navigate("/Login")
      } catch (error) {
        console.log(error); // Use console.error() instead of console.log() to indicate an error
        // Handle the error in an appropriate way, such as displaying an error message to the user
        alert("Registration failed. Please try again.");
      
      }
    };
  
  return (
    <div className="registerForm">
     <form onSubmit={handleSubmit} className="register">
        <h2>Register</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label><br/>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label><br/>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit" className="registerBtn">Register</button><br/><br/>
        <Link to="/Login" style={{ textDecoration:"none" , paddingRight:"1rem" , color:"black" , fontSize:"1rem", }}>Login</Link>
      </form>
     </div>
  )
}
