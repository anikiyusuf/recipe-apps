// import { useState} from "react"
// import axios from "axios" 
// import { userGetUserId } from "../hook/userGetHook"
// import { useNavigate } from "react-router-dom"
// import   { useCookies } from "react-cookie"

//  import "./create.scss"

// export default function CreateRecipe() {
//     // Updating the image input 
//     const [selectedImage , setSelectedImage] = useState(null)
//     const userID = userGetUserId()
//     // eslint-disable-next-line no-unused-vars
//     const [ cookies , _ ] = useCookies(["access_token"]);
    

 
//     const [recipe, setRecipe]  = useState({
//            name:"",
//            ingredients:"",
//            instructions:"",
//            imageUrl:"",
//            cookingTime:0,
//            userOwner: userID,
//     })
//     const navigate = useNavigate()

//     const handleChange = (event) =>{
//         const {name , value} = event.target;
//         setRecipe({ ...recipe , [name]:value})
//         setSelectedImage(event.target.files[0])

//     }

//     const handleSubmit =  async (event) =>{
//         event.preventDefault();
//         // Image update 
//         const formData = new FormData();
//         formData.append("image", selectedImage);
    

//         try{
//                await axios.post(
//                 "http://localhost:3001/recipes",
//                  { ...recipe},
//                  {
//                     headers: { authorization: cookies.access_token },
//                  }
//                  )
//                alert("Recipe created!")
//                navigate("/")
//         }catch(error){
//             console.error(error)
//         }
//     }
//    return (
//     <div className="createRecipe">
//         <h2> Create Recipe</h2>
//         <form   onSubmit={handleSubmit} className="createForm">
//             <label htmlFor="name">Name</label><br/>
//             <input
//              type="text"
//               id="name"
//                name="name"
//                  value={recipe.name}
//                   onChange={handleChange} /><br/>


//             <label htmlFor="ingredients">Ingredients</label>
//             <input  type="text" name="ingredients" value={recipe.ingredients}  onChange={handleChange} /> 
//             <label htmlFor="instruction">Instruction</label><br/>
//             <input type="text" id="instructions" name="instructions"  value={recipe.instructions}  onChange={handleChange} /><br/>

//             <label htmlFor="imageUrl">image Url</label><br/>
//             <input type="file" id="imageUrl" name="imageUrl"    value={recipe.imageUrl} onChange={handleChange}/><br/>

//             <label htmlFor="cookingTime">Cooking Time</label><br/>
//             <input type="text" id="cookingTime" name= "cookingTime"     value={recipe.cookingTime}  onChange={handleChange} /><br/>
//             <button type="submit" className="createBtn">Create Recipe</button>
//         </form>
//     </div>
//   )
// }

import  { useState } from "react";
import axios from "axios";
import { userGetUserId } from "../hook/userGetHook";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import "./create.scss";


export default function CreateRecipe() {
  const [selectedImage, setSelectedImage] = useState(null);
  const userID = userGetUserId();
  // eslint-disable-next-line no-unused-vars
  const [cookies, _] = useCookies(["access_token"]);

  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: "",
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe , [name]:value})
    // setSelectedImage(event.target.files[0])
    const img = {
        preview:URL.createObjectURL(event.target.files[0]),
      data: event.target.files[0]
    }
    setSelectedImage(img)
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let formData = new FormData();
    formData.append('image', selectedImage);
    for (const key in recipe) {
      formData.append(key, recipe[key]);
    }

    try {
      await axios.post("https://recipeapp-server.onrender.com/recipes", formData, {
        headers: { authorization: cookies.access_token },
      });
      alert("Recipe created!");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="createRecipe">
      <h2>Create Recipe</h2>
      <form onSubmit={handleSubmit} className="createForm">
        <label htmlFor="name">Name</label>
        <br />
        <input
          type="text"
          id="name"
          name="name"
          value={recipe.name}
          onChange={handleChange}
        />
        <br />

        <label htmlFor="ingredients">Ingredients</label>
        <input
          type="text"
          name="ingredients"
          value={recipe.ingredients}
          onChange={handleChange}
        />
        <label htmlFor="instructions">Instruction</label>
        <br />
        <input
          type="text"
          id="instructions"
          name="instructions"
          value={recipe.instructions}
          onChange={handleChange}
        />
        <br />

        <label htmlFor="imageUrl">Image Upload</label>
        <br />
        <input
          type="file"
          id="imageUrl"
          name="imageUrl"
          value={recipe.imageUrl}
          onChange={handleChange}
          className="image"
         
        />
     
        <br />

        <label htmlFor="cookingTime">Cooking Time</label>
        <br />
        <input
          type="text"
          id="cookingTime"
          name="cookingTime"
          value={recipe.cookingTime}
          onChange={handleChange}
        />
        <br />
        <button type="submit" className="createBtn">
          Create Recipe
        </button>
      </form>
    </div>
  );
}
