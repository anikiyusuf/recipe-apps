import Register from "./Register"; 
 function Auth() {
  return (
    <div>

    
    <Register/>

    </div>

  )
}

// const Login = () =>{

//     const [ , setCookies] = useCookies(["access_token"])
    
//     const [username, setUsername] = useState("")
//     const [password , setPassword] = useState("")

//     const navigate = useNavigate()
//     const onSubmit = async ( event) => {
//    event.PreventDefault()
//       try{
//         await axios.post("http://localhost:3001/auth/login" , { username , password})
//            setCookies("access_token" , response.data.token)
//            window.localStorage.setItem("userID" , response.data.userID)
//             navigate("/")
//       }catch(err){
//            console.log(err)
//       }
//     }
//     return(
//         <>
//         <Form 
//          username={username}
//          setUsername={setUsername} 
//          password={password}  
//          setPassword={setPassword} 
//          label="Login"
//             onSubmit={onSubmit}
//          />
//         </>
//     )
// }

// const Register = () =>{
//     const [username, setUsername] = useState("")
//     const [password , setPassword] = useState("")
//     const onSubmit = async (event) => {
//         event.PreventDefault()
//        try{
//            await axios.post("http://localhost:3001/auth/register" , { username , password})
//            alert("Registration completed! Now login.")
//        }catch (err){
//          console.error(err)
//        }

//     }
//     return(
//         <>
//       <Form username={username} setUsername={setUsername} password={password}  setPassword={setPassword} 
//       label="Register" onSubmit={onSubmit}/>
//       </>
//     )
// }

// const Form = ({username , password , setPassword , setUsername , label , onSubmit}) =>{
//     <>
//     <div className="authContainer">
//     <form onSubmit={onSubmit}>
//         <h2>{label}</h2>
//         <div className="form-group">
//         <label htmlFor="username"> Username: </label>
//           <input type="text" id="username"  value={username} onChange={(event) => setUsername(event.target.value)} />
//         </div>
//         <div className="form-group">
//         <label htmlFor="username"> Password: </label>
//           <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} />
//         </div>
//         <button type="submit">{label}</button>
//     </form>
//     </div>
//         </>

// }
export default Auth;