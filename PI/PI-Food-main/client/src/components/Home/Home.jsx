import React from "react";
import{ useState, useEffect }from "react";
import {useDispatch, useSelector} from "react-redux"; //esto permite conectarse con la DB
//el use slector es el map state to props
//el  use dispatch permite hacer ddispatch directamente
import { getAllRecipes,
    getAllDiets,
    getRecipesByDiet,
    getRecipesOrderedByName
    } from "../../actions";
import Paginado from "../Paginado/Paginado"
import RecipeCard from "../RecipeCard/RecipeCard"
import "./Home.css"

export default function Home(){//props recibe la info que le llegue y se usa props.info
    const dispatch =useDispatch()
    const allRecipes =  useSelector((state)=>state?.recipes)//en la const va a venir todo lo que esta en estado de recipes
    const allDiets= useSelector((state)=>state?.diets)
    useEffect(()=>{//esta funcion es que quiero hacer cuando el componenete se monta o actualiza
        dispatch(getAllRecipes()) // el dispatch permite usar las funciones y en este caso se va a traer todas las recipies
        dispatch(getAllDiets())
    },[dispatch])// el array de dependencias. cuando lo que este aca dentro se modifique es use effect se va a volver a actualizar
    const [currentPage, setCurrentPage]=useState(1) //la pagina inicial va a ser uno
    // const [recipesPerPage,setRecipesPerPage]=useState(9) //quuero que vengan 9 por pagina
    const [order,setOrder]=useState("")//sirve para que haya un estado que cambie y todo se re renderice
    const recipesPerPage=9; //quuero que vengan 9 por pagina
    const indexLastRecipe=currentPage*recipesPerPage;
    const indexFirstRecipe=indexLastRecipe-recipesPerPage;
    const currentRecipies=allRecipes.slice(indexFirstRecipe,indexLastRecipe)
    let arrDiets=allDiets?.map((diet)=>{
        return(diet.name)
    })
    arrDiets.sort((a, b) => b.localeCompare(a, 'es', {sensitivity: 'base'})) //organiza alpabeticamente en reversa
    //toco asi porque hay mayusculas y minusculas
    arrDiets.reverse()//aca enderezamos

    const funcPaginado=(pageNumber)=>{
        setCurrentPage(pageNumber)
    }

    function handleFilter(event){
        dispatch(getRecipesByDiet(event.target.value))
    }
    function handleOrderer(event){
        event.preventDefault();
        dispatch(getRecipesOrderedByName(event.target.value))//aca ordena las recipes
        setCurrentPage(1)//aca me lleva la pag 1 luego de haber ordenado
        setOrder(`Ordenado ${event.target.value}`)
    }
    return(
        <div>
            <Paginado recipesPerPage={recipesPerPage} numberOfRecipes={allRecipes.length} paginado={funcPaginado}/>
            <select  onChange={(event)=>handleOrderer(event)}>
                <option value="asc">Ascendent</option>
                <option value="desc">Descendent</option>
                <option value="health">Health Score</option>
            </select>
            <select onChange={(event)=>handleFilter(event)}>
                <option value="All">All</option>
                {arrDiets?.map((diet)=>{ //que muestre unicamente las recetas dentro de esta pagina
                    return (
                        <option value={diet}>{diet}</option>
                    )})
                }
            </select>
                <article>
                {currentRecipies?.map((recipe)=>{ //que muestre unicamente las recetas dentro de esta pagina
                    return (
                        <div className="card">
                            <RecipeCard
                            key={recipe.id}
                            id={recipe.id}
                            name={recipe.name}
                            image={recipe.image?recipe.image:"https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png"}//si hay imagen que la mande, sino que mande una imagen por default
                            diets={recipe.diets}
                            />
                        </div>
                    )
                })}
                </article>
                <Paginado recipesPerPage={recipesPerPage} numberOfRecipes={allRecipes.length} paginado={funcPaginado}/>
        </div>
    )
}