import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {getRecipesById} from "../../actions/index"
import { useEffect }from "react";
import { useParams } from 'react-router-dom';

export default function DetailRecipe(){
    const { id } = useParams();
    const dispatch =useDispatch()
    useEffect(()=>{//esta funcion es que quiero hacer cuando el componenete se monta o actualiza
        dispatch(getRecipesById(id)) 
    },[dispatch])
    const oneRecipe =  useSelector((state)=>state?.recipeDetail)
    

    return(
        <div>
            {oneRecipe.length>0? //esto es pa que cuando no haya nada se muestre un loading
            <div>
                <h1>{oneRecipe[0].name}</h1>
                <img src={oneRecipe[0].image} alt="imageof the recipe"/>
                <p><b>Dishes:</b> {oneRecipe[0].dishTypes}</p>
                <p><b>Diets:</b> {
                typeof oneRecipe[0].diets[0]==='string'?
                oneRecipe[0].diets+" ":
                oneRecipe[0].diets.map(diet=>diet.name+(" "))
                }</p>
                <p><b>Summary:</b> {oneRecipe[0].summary}</p>
                <p><b>Health Score:</b> {oneRecipe[0].healthScore}</p>
                <p><b>Steps:</b> {oneRecipe[0].steps}</p>
            </div>
            : <p>Loading...</p>
                }
        </div>
    )
}