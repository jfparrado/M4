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

// router.put("/:id", async function (req, res) {
//   //modifica el nombre de una receta
//   const { id } = req.params;
//   const { name } = req.body;
//   if (!id || !name) {
//     const obj = {
//       error:
//         "No se recibieron los parámetros necesarios para modificar el Post",
//     };
//     return res.status(201).json(obj);
//   }
//   let todasRecetas = await getAllInfo();
//   let matchs = todasRecetas.filter((arr) => arr.id === parseFloat(id));
//   let index = todasRecetas.findIndex((arr) => arr.id === parseFloat(id));
//   console.log("index es: ", index);
//   if (matchs.length === 0) {
//     const obj = {
//       error: "No se recibieron id que concuerde con ninguno de las recipes",
//     };
//     return res.status(400).json(obj);
//   }

//   matchs[0].name = name;
//   todasRecetas[index] = matchs[0];
//   return res.status(200).json(todasRecetas[0]);
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
