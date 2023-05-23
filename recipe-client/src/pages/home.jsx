
import  { useEffect, useState  , useMemo} from "react";
import PropTypes from 'prop-types';
import { userGetUserId } from "../hook/userGetHook";
import Pagination from "../Pagination";
import axios from "axios";
import "./home.scss"
import { BASE_API_URL } from "../constants";

const Recipe = ({ recipe, onSave, disabled }) => {
  return (
    <div className="container">
      <li>
        <div>
          <h2>{recipe.name}</h2>
          <button
            onClick={() => onSave(recipe._id)}
            disabled={disabled}
            className="saveBtn"
          >
            {disabled ? "Saved" : "Save"}
          </button>
        </div>
        <div className="instructions">
          <p>{recipe.instructions}</p>
        </div>
        <img src={recipe.image} alt={recipe.name} />
        <p>Cooking Time: {recipe.cookingTime} minutes</p>
      </li>
    </div>
  )
}

Recipe.propTypes = {
  recipe: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    ingredients: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    cookingTime: PropTypes.number.isRequired,
    instructions: PropTypes.string.isRequired,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

const Home = () => {
  let PageSize = 6
  const  [currentPage , setCurrentPage] = useState(1)
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);


  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize
    return recipes.slice(firstPageIndex , lastPageIndex)
  } , [currentPage, recipes, PageSize])

  const userID = userGetUserId();

  const fetchRecipes = async () => {
    try {
      const response = await axios.get(`${BASE_API_URL}/recipes`);
      setRecipes(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchSavedRecipes = async () => {
    try {
      const response = await axios.get(
        `${BASE_API_URL}/recipes/savedRecipes/ids/${userID}`
      );
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRecipes();
    fetchSavedRecipes();
  }, []);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put(`${BASE_API_URL}/recipes`, {
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
          <Recipe
            key={recipe._id}
            recipe={recipe}
            onSave={saveRecipe}
            disabled={isRecipeSaved(recipe._id)}
          />
        ))}
      </ul>
      <Pagination 
        className="Pages"
        currentPage={currentPage}
        totalCount={recipes.length}
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page)}
      />
    </div>
  );
};

export default Home
