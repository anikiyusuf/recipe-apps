import  { useEffect, useState , useMemo } from "react";
import {userGetUserId } from "../hook/userGetHook";

import Pagination from "../Pagination";
import axios from "axios";
import "./saveRecipe.scss"

let PageSize = 6
 const SavedRecipes = () => {
  const  [currentPage , setCurrentPage] = useState(1)
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = userGetUserId();


  const currentTable = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize
    return savedRecipes.slice(firstPageIndex , lastPageIndex)
  } , [currentPage, savedRecipes])
  
  
  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `https://recipeapp-server.onrender.com/recipes/savedRecipes/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedRecipes();
  }, []);
  return (
    <div className="saved">
      <h1>Saved Recipes</h1>
      <ul className="savedItem">
        {currentTable.map((recipe) => (
          // eslint-disable-next-line react/jsx-key
          <div className="containerSave">
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
            </div>
            <p>{recipe.description}</p>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <p>Cooking Time: {recipe.cookingTime} minutes</p>
          </li>
          </div>
        ))}
      </ul>
   <Pagination 
      className="Pages"
      currentPage={currentPage}
      totalCount = { savedRecipes.length}
      pageSize = { PageSize}
      onPageChange = {page => setCurrentPage(page)}/>
    </div>
  );
};

export default SavedRecipes
