import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {getRecipesById} from "../../actions/index"
import { useEffect }from "react";
import { useParams } from 'react-router-dom';
import style from "./DetailRecipe.module.css"

export default function DetailRecipe(){
    const { id } = useParams();
    const dispatch =useDispatch()
    useEffect(()=>{//esta funcion es que quiero hacer cuando el componenete se monta o actualiza
        dispatch(getRecipesById(id)) 
    },[dispatch])
    const oneRecipe =  useSelector((state)=>state?.recipeDetail)
    const loadingImg="https://zonavalue.com/wp-content/themes/kauplus/img/loading.gif";

    return(
        <div className={style.mainContainer}>
            {oneRecipe.length>0? //esto es pa que cuando no haya nada se muestre un loading
            <div >
                <h3>{oneRecipe[0].name}</h3>
                <img className={style.mainImage} src={oneRecipe[0].image} alt="imageof the recipe"/>
                <div className={style.allInfo}>
                <div className={style.information}><b>Dishes:</b> <p className={style.content}>{oneRecipe[0].dishTypes+(", ")}</p></div>
                <div className={style.information}><b>Diets:</b> {
                typeof oneRecipe[0].diets[0]==='string'?
                <p className={style.content}>{oneRecipe[0].diets+(", ")}</p>:
                <p className={style.content}>{oneRecipe[0].diets.map(diet=>diet.name+(", "))}</p>
                }</div>
                <div className={style.information}><b>Summary:</b> <p className={style.content}>{oneRecipe[0].summary}</p></div>
                <div className={style.information}><b>Health Score:</b> <p className={style.content}>{oneRecipe[0].healthScore}</p></div>
                <div className={style.information}><b>Steps:</b> <p className={style.content}>{oneRecipe[0].steps}</p></div>
                </div>
            </div>
                :<div className={style.containerImg}>
                    <img src={loadingImg} alt="loading image" className={style.loading}/>
                </div> 
                }
        </div>
    )
}