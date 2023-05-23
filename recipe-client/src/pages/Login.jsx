import { useState } from "react"
import axios from "axios"
import { useCookies} from "react-cookie"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"
import "./Login.scss"
import { BASE_API_URL } from "../constants";

export default function Login() {

    // eslint-disable-next-line no-unused-vars
    const [_ , setCookies ] = useCookies(["access_token"]);

    const [username, setUsername] = useState("")
    const [password , setPassword] = useState("")

    const navigate = useNavigate()

    const handleSubmit = async (event) =>{
        event.preventDefault();
        try{
         const result = await axios.post(`${BASE_API_URL}/auth/login` , {
        username,
        password,
    });
    
       setCookies("access_token" , (result.data.token));
       window.localStorage.setItem("userID" , result.data.userID)
       navigate("/")
        }catch(error){
         console.log(error)
        }
    }

  return (
    <div className="loginForm">
    <form onSubmit={handleSubmit} className="login">
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit"  className="loginBtn">Login</button><br/><br/>
        <Link to="/Register" style={{ textDecoration:"none" , paddingRight:"1rem" , color:"black" , fontSize:"1rem", }}>Register</Link>
      </form>
     
    </div>
  )
}
