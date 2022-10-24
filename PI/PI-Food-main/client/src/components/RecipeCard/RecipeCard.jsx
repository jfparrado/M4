import React from "react";
import {Link} from "react-router-dom"
import style from "./RecipeCard.module.css";

export default function RecipeCard({id, name, image, diets,createdInDb}){
    let i=0;
    return(
        <section>
            <h3 className={style.titlecard}>
                <Link className={style.title} to={`/home/${id}` }> 
                {name} 
                </Link>
            </h3>
            <b>Diets:</b> 
            <p className={style.dietas}>
            {diets?.map(diet => {
                i++;
                return i===diets.length?//esto es solo para que el ultimo valor no sea , sino .
                createdInDb === true? `${diet["name"]}.`:`${diet}.`:
                createdInDb === true? `${diet["name"]}, `:`${diet}, `
            })
            }
            </p>
            <img src={image} alt="imagen" className={style.imgcard}/>
        </section>
    )
}