const axios = require("axios");
const { Recipe, Diet } = require("../../db");
const { API_KEY } = process.env;
const numberRecipes = 100;

const getInfoApi = async () => {
  try {
    const infoApi = await axios.get(
      // `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=${numberRecipes}&addRecipeInformation=true` // esto es lo que se debe usar
      "https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5"
    );
    const data = infoApi.data.results;
    const infoRecipes = data?.map((recipe) => {
      let allSteps = "";
      recipe.analyzedInstructions[0]?.steps.forEach((stp) => {
        //cada receta trae un campo analizedinst que es un array que dentro contiene un solo objeto con las propiedades name y steps, steps es un array con todos los pasos . cada paso contiene un objeto con number, step, ingredients y equipment
        allSteps += `Step ${stp.number}: ${stp.step}`; //aca estamos agrupando todos los pasos
      });
      return {
        //aca devuelve un obj que contiene la info de cada receta
        id: recipe.id,
        name: recipe.title,
        summary: recipe.summary.replace(/<[^>]+>/g, ""), // esto es pa que quito los []
        healthScore: recipe.healthScore,
        dishTypes: recipe.dishTypes,
        diets: recipe.diets,
        image: recipe.image,
        steps: allSteps,
      };
    });
    return infoRecipes; //este es un array con todas las recetas
  } catch (error) {
    throw new Error("El error es:", error);
  }
};
const getInfoDB = async () => {
  try {
    const dbInfo = await Recipe.findAll({
      //busca todas las recetas
      include: {
        //incluye el modelo dieta y el nombre todas las dietas
        model: Diet,
        attributes: ["name"],
        through: {
          attributes: [], //que lo traiga a travez de los atributos
        },
      },
    });
    return dbInfo;
  } catch (error) {
    throw new Error("El error es:", error);
  }
};
const getAllInfo = async () => {
  try {
    const infoApi = await getInfoApi();
    const infoDB = await getInfoDB();
    const allInfo = [...infoApi, ...infoDB];
    return allInfo;
  } catch (error) {
    console.log("El error es:", error);
  }
};
const getById = async (idReceta) => {
  try {
    const allInfo = await getAllInfo({
      include: { model: Diet },
    });
    const result = allInfo.filter(
      (receta) => receta.id.toString() === idReceta.toString()
    );
    return result;
  } catch (error) {
    console.log("El error es:", error);
  }
};

module.exports = { getInfoApi, getInfoDB, getAllInfo, getById };
