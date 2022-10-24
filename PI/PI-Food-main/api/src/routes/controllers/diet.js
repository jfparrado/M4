const axios = require("axios");
const { Recipe, Diet } = require("../../db");
const { API_KEY } = process.env;
const numberRecipes = 100;

const getInfoApi = async () => {
  let i = 0;
  try {
    const infoApi = await axios.get(
      // `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=${numberRecipes}&addRecipeInformation=true` // esto es lo que se debe usar
      "https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5"
    );
    const data = infoApi.data.results;
    const recipeDiets = data?.map((recipe) => {
      return recipe.diets;
    });
    // console.log(recipeDiets);
    let allDiets = [];
    recipeDiets?.forEach((recipe) => {
      recipe?.forEach((diet) => {
        if (allDiets.indexOf(diet) === -1) {
          allDiets.push(diet);
        }
      });
    });
    // console.log("estamos aca:", allDiets);
    return allDiets; //este es un array con todas las recetas
  } catch (error) {
    throw new Error("El error es:", error);
  }
};
const getInfoDB = async () => {
  //check
  try {
    const dbInfo = await Diet.findAll();
    const resultDiets = dbInfo.map((diet) => diet.dataValues);
    if (resultDiets.length === 0) {
      const initialDiets = [
        { name: "gluten free" },
        { name: "ketogenic" },
        { name: "Vegetarian" },
        { name: "Lacto-Vegetarian" },
        { name: "Ovo-Vegetarian" },
        { name: "vegan" },
        { name: "pescatarian" },
        { name: "paleolithic" },
        { name: "primal" },
        { name: "Low FODMAP" },
        { name: "whole 30" },
      ];
      await Diet.bulkCreate(initialDiets);
      return await Diet.findAll();
    }
    return resultDiets;
  } catch (error) {
    throw new Error("El error es:", error.message);
  }
};
const getAllDiets = async () => {
  try {
    //aca la idea es traerse ambos como array. luego hacer un merge asegurando que no se repita ninguno y nimalmente pasarlo a objeto con ids unicos a cada diet
    const infoApi = await getInfoApi();
    const infoDB = await getInfoDB();
    const objetosDB = infoDB.map((diet) => diet.dataValues); // la bd se transforma obj
    let sizeDB = infoDB.length;
    const arrayDB = infoDB.map((diet) => diet.name);
    const dietsNotIncludedInDB = infoApi.filter(
      //dietas unicas
      (diet) => !arrayDB.includes(diet)
    );
    const unicas = dietsNotIncludedInDB.map((dieta) => {
      //aca transformamos el array con strings a un array con objetos dentro
      return { name: dieta };
    });
    await Diet.bulkCreate(unicas); //aca metemos las que aun no estan en la bd a la bd
    const todas = await Diet.findAll(); // aca unimos las que trae la bd con aquellas que vienen del api y no estan en la bd
    return todas;
  } catch (error) {
    console.log("El error es:", error);
  }
};
module.exports = { getInfoApi, getInfoDB, getAllDiets };
// como hago pa crear dietas autimaticamente? osea sin meterle yo manualmente el id
