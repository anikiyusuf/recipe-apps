import { Link } from "react-router-dom"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom";
import "./navbar.scss"


export default function   Navbar() {
  const [cookies , setCookies] = useCookies(["access_token"])
  const navigate = useNavigate()
  
  const logout = () =>{
    setCookies("access_token", " ");
    window.localStorage.clear()
    navigate("/auth")
  }
  return (
    <div className="navbarItem">
      <div className="logo">
         <Link to="/" style={{ textDecoration:"none" ,color:"black" , fontSize:"1rem", fontWeight:"900" }}>Town Recipe</Link>
      </div>
      <div className="navigation">
        <Link to="/" style={{ textDecoration:"none" , paddingRight:"1rem" , color:"black" , fontSize:"1rem", }}>Home</Link>
        <Link to="/create-recipe" style={{ textDecoration:"none" , paddingRight:"1rem", color:"black" , fontSize:"1rem", }}>Create Recipe</Link>
        <Link to="/saved-recipes" style={{ textDecoration:"none" , paddingRight:"1rem" , color:"black" , fontSize:"1rem", }}>Saved Recipe</Link>
        {/* <Link to="/contact" style={{ textDecoration:"none" , paddingRight:"1rem" , color:"black" , fontSize:"1rem", }}>Contact</Link> */}

        {!cookies.access_token ? (
        <Link to="/auth" style={{ textDecoration:"none" , paddingRight:"1rem"  , color:"black" , fontSize:"1rem",}}>Login/Register</Link>
      ) : (
        <button onClick={logout} className="navBtn"> Logout </button>
      )}
      </div>
    </div>
  )
}
