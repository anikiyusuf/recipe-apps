
import  { useEffect, useState  , useMemo} from "react";
import { userGetUserId } from "../hook/userGetHook";
import Pagination from "../Pagination";
import axios from "axios";
import "./home.scss"

let PageSize = 6
 const Home = () => {
     const  [currentPage , setCurrentPage] = useState(1)
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);


const currentTableData = useMemo(() => {
  const firstPageIndex = (currentPage - 1) * PageSize;
  const lastPageIndex = firstPageIndex + PageSize
  return recipes.slice(firstPageIndex , lastPageIndex)
} , [currentPage, recipes])


  const userID = userGetUserId();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("https://recipeapp-server.onrender.com/recipes");
        setRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `https://recipeapp-server.onrender.com/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipes();
    fetchSavedRecipes();
  }, []);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put("https://recipeapp-server.onrender.com/recipes", {
        recipeID,
        userID,
      });
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
    <div className="home">
      <h1 className="titleRecipe">Recipes</h1>
      <ul className="listItem">
        {currentTableData.map((recipe) => (
          // eslint-disable-next-line react/jsx-key
          <div className="container">
          <li key={recipe._id}>
        
            <div>
              <h2>{recipe.name}</h2>
              <button
                onClick={() => saveRecipe(recipe._id)}
                disabled={isRecipeSaved(recipe._id)}
                className="saveBtn"
              >
                {isRecipeSaved(recipe._id) ? "Saved" : "Save" }
              </button>
            </div>
            <div className="instructions">
              <p>{recipe.instructions}</p>
            </div>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <p>Cooking Time: {recipe.cookingTime} minutes</p>
          </li>
          </div>
        ))}
      </ul>
      <Pagination 
      className="Pages"
      currentPage={currentPage}
      totalCount = { recipes.length}
      pageSize = { PageSize}
      onPageChange = {page => setCurrentPage(page)}/>
    </div>
  );
};

export default Home
