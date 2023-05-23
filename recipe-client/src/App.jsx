import { BrowserRouter as  Router , Route , Routes } from 'react-router-dom'
import './App.scss'
import  Home  from "./pages/home"
import  Auth  from "./pages/auth"
import CreateRecipe  from "./pages/create-recipe"
import  SavedRecipes  from "./pages/SaveRecipes"
import NavBar from "./component/navbar"
// import Contact from "./pages/Contact"
import Login from "./pages/Login"
import Register from './pages/Register'
function App() {
  

  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/auth" element={<Auth/>}/>
          <Route path="/create-recipe" element={<CreateRecipe/>}/>
          <Route path="/saved-recipes" element={<SavedRecipes/>}/>
          {/* <Route path="/Contact" element={<Contact/>}/> */}
          <Route path="/Login" element={<Login/>}/>
          <Route path="/Register" element={<Register/>}/>
        </Routes>
      </Router>

    </>
  )
}

export default App
