const axios = require("axios");
const { Router } = require("express");
const { Recipe, Diet } = require("../../db");
const router = Router();
const { getAllInfo, getById } = require("../controllers/recipe");

router.get("/:idReceta", async (req, res) => {
  const { idReceta } = req.params;

  try {
    const receta = await getById(idReceta);
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
  try {
    const { name } = req.query;
    let todasRecetas = await getAllInfo();
    if (name) {
      if (todasRecetas.length === 0) todasRecetas = empty;

      //en caso de que se busque por la searchbar
      let recetasFiltradas = todasRecetas.filter(
        (receta) => receta.name.toLowerCase().includes(name.toLowerCase()) //va a buscar si es un su campo nombre(en minuscula) se encuentra la palabra del query (tambien en minuscula)
      );
      if (recetasFiltradas.length !== 0) {
        return res.status(200).send(recetasFiltradas);
      } else {
        recetasFiltradas = empty;
        return res.status(204).send(recetasFiltradas);
      }
    } else {
      //cuando no hay nada en el searchbar que mande todo
      res.status(200).send(todasRecetas);
    }
  } catch (error) {
    res.status(error.number).send(error.message);
  }
});
router.post("/", async (req, res) => {
  try {
    const { name, summary, healthScore, steps, image, dishTypes, diets } =
      req.body;
    const cuerpo = { name, summary, healthScore, steps, image, dishTypes };
    if (!name || !summary || !healthScore || !steps) {
      return res.status(404).send("Falta enviar datos obligatorios");
    }
    const dietInfo = await Diet.findAll({
      where: { name: diets }, //busca todas las dietas donde el nombre coincida con lo traido por el body
    });
    const newRecipe = await Recipe.create(cuerpo);
    newRecipe.addDiet(dietInfo);
    const result = await Recipe.findAll();
    res.status(201).json(result); //201 es que fue creado
  } catch (error) {
    res.status(401).send(error.message);
  }
});

// router.put("/:id", async function (req, res) {
//   //modifica el nombre de una receta
//   try {
//     const { id } = req.params;
//     const objRecipe = req.body;
//     const putValue = await Recipe.findByPk(id);
//     await putValue.set(objRecipe);
//     await putValue.save();
//     res.status(200).send(putValue);
//   } catch (error) {
//     res.status(404).send(error);
//   }
// });

// router.delete("/:id", async function (req, res) {
//   const { id } = req.params;
//   let todasRecetas = await getAllInfo();
//   let index = todasRecetas.findIndex((arr) => arr.id === parseFloat(id));
//   if (index === -1) {
//     const obj = {
//       error: "Mensaje de error",
//     };
//     return res.status(400).json(obj);
//   }
//   todasRecetas.splice(index, 1);
//   return res.status(200).json({ success: true });
// });

module.exports = router;
