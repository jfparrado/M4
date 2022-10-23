const axios = require("axios");
const { Router } = require("express");
const { Recipe, Diet } = require("../../db");
const router = Router();
const { getAllInfo, getById } = require("../controllers/recipe");

router.get("/:idReceta", async (req, res) => {
  const { idReceta } = req.params;

  try {
    const receta = await getById(idReceta);
    // console.log("a la ruta llego:", receta);
    if (!receta) {
      return res.status(204).send("that id does not exist in the database");
    } else {
      return res.status(200).send(receta);
    }
  } catch (error) {
    res.status(401).send(error.message);
  }
});

router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    let todasRecetas = await getAllInfo();

    if (name) {
      let recetasFiltradas = todasRecetas.filter(
        (
          receta //cada receta
        ) => receta.name.toLowerCase().includes(name.toLowerCase()) //va a buscar si es un su campo nombre(en minuscula) se encuentra la palabra del query (tambien en minuscula)
      );
      if (recetasFiltradas.length !== 0) {
        return res.status(200).send(recetasFiltradas);
      } else {
        return res
          .status(204)
          .send("there is no recipe with that word on its name");
      }
    } else {
      res.status(200).send(todasRecetas);
    }
  } catch (error) {
    res.status(error.number).send(error.message);
  }
});
router.post("/", async (req, res) => {
  try {
    console.log("estamos en api");
    const { id, name, summary, healthScore, steps, image, dishTypes, diets } =
      req.body;
    const cuerpo = { id, name, summary, healthScore, steps, image, dishTypes };
    if (!name || !summary || !healthScore || !steps) {
      return res.status(404).send("Falta enviar datos obligatorios");
    }
    const dietInfo = await Diet.findAll({
      where: { name: diets }, //busca todas las dietas donde el nombre coincida con lo traido por el body
    });
    const newRecipe = await Recipe.create(cuerpo);
    newRecipe.addDiet(dietInfo);
    const result = await Recipe.findAll();
    console.log(result);
    res.status(201).json(result); //201 es que fue creado
  } catch (error) {
    res.status(401).send(error.message);
  }
});
module.exports = router;
