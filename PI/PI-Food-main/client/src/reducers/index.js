//aca no puede haber nada asincrono
import {
  GET_ALL_RECIPES,
  GET_RECIPES_BY_ID,
  GET_DIETS_BY_NAME,
  GET_RECIPES_BY_DIET,
  RECIPES_ORDER_BY_NAME,
  GET_RECIPES_BY_NAME,
  // POST_DIET,
  POST_RECIPE,
  GET_ALL_DIETS,
} from "../actions";
const initialState = {
  allRecipes: [], //esto es para que al filtrar no se hagan filtros sobre los filtros. siempre sobre todas las recetas
  recipes: [],
  recipeDetail: [],
  diets: [],
};
const empty = [
  {
    name: "No recipe found",
    summary: "No summary",
    healthScore: 0,
    steps: "No steps",
    image:
      "https://neilpatel.com/wp-content/uploads/2019/05/ilustracao-sobre-o-error-404-not-found.jpeg",
  },
];
export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_RECIPES:
      return {
        ...state, //retorno una copia del estado
        recipes: action.payload, // modificar la propiedad recipes metiendole todos las recipes del payload
        allRecipes: action.payload,
      };

    case GET_RECIPES_BY_ID:
      return {
        ...state,
        recipeDetail: action.payload,
      };

    case RECIPES_ORDER_BY_NAME:
      let orderedArray = [];
      switch (action.payload) {
        case "asc":
          orderedArray = state.recipes.sort((recipeA, recipeB) => {
            const nameA = recipeA.name.toUpperCase(); // ignore upper and lowercase
            const nameB = recipeB.name.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
            // names must be equal
          });
          break;

        case "desc":
          orderedArray = state.recipes.sort((recipeA, recipeB) => {
            const nameA = recipeA.name.toUpperCase(); // ignore upper and lowercase
            const nameB = recipeB.name.toUpperCase(); // ignore upper and lowercase
            if (nameA > nameB) {
              return -1;
            }
            if (nameA < nameB) {
              return 1;
            }
            return 0;
            // names must be equal
          });
          break;

        case "health":
          orderedArray = state.recipes.sort((recipeA, recipeB) => {
            const healthScoreA = recipeA.healthScore;
            const healthScoreB = recipeB.healthScore;
            if (healthScoreA > healthScoreB) {
              return -1;
            }
            if (healthScoreA < healthScoreB) {
              return 1;
            }
            return 0;
            // names must be equal
          });
          break;
        default:
          orderedArray = action.payload;
          break;
      }
      return {
        ...state,
        recipes: orderedArray,
      };

    case GET_DIETS_BY_NAME:
      return {
        ...state,
        diets: action.payload,
      };

    case GET_RECIPES_BY_DIET:
      const allRecipes = state.allRecipes;
      let recipesByDiet =
        action.payload === "All" //si se ecogen todas
          ? allRecipes //traetelas todas
          : allRecipes.filter(
              (
                recipe //sino solo lo que se escoja
              ) => recipe.diets.includes(action.payload)
            );
      if (recipesByDiet.length === 0) recipesByDiet = empty;
      return {
        ...state,
        recipes: recipesByDiet,
      };

    case GET_RECIPES_BY_NAME:
      return {
        ...state,
        recipes: action.payload,
      };

    case POST_RECIPE:
      return {
        ...state,
      };
    case GET_ALL_DIETS:
      return {
        ...state,
        diets: action.payload,
      };
    default:
      return { ...state };
  }
}
