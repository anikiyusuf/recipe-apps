import  { useEffect, useState , useMemo } from "react";
import { userGetUserId } from "../hook/userGetHook";
import PropTypes from 'prop-types';
import Pagination from "../Pagination";
import axios from "axios";
import "./saveRecipe.scss"
import { BASE_API_URL } from "../constants";

const SavedRecipe = ({ recipe }) => {
  const  {
    name, ingredients, image, cookingTime,
  } = recipe;
  return (
  <div className="containerSave">
    <li>
      <div>
        <h2>{name}</h2>
      </div>
      <p>{ingredients}</p>
      <img src={image} alt={name} />
      <p>Cooking Time: {cookingTime} minutes</p>
    </li>
    </div>
  )
}

const SavedRecipes = () => {
  const  [currentPage , setCurrentPage] = useState(1)
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = userGetUserId();

  const PageSize = 6
  const currentTable = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize
    return savedRecipes.slice(firstPageIndex , lastPageIndex)
  } , [currentPage, savedRecipes])

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `${BASE_API_URL}/recipes/savedRecipes/${userID}`
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
        {currentTable.map((recipe, idx) => (<SavedRecipe key={idx} recipe={recipe} />))}
      </ul>
   <Pagination
      className="Pages"
      currentPage={currentPage}
      totalCount = { savedRecipes.length}
      pageSize = {PageSize}
      onPageChange = {page => setCurrentPage(page)}/>
    </div>
  );
};

SavedRecipe.propTypes = {
  recipe: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    ingredients: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    cookingTime: PropTypes.number.isRequired,
    instructions: PropTypes.string.isRequired,
  }).isRequired
};
export default SavedRecipes
