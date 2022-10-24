import React from "react";
import {Link} from "react-router-dom"
import style from "./RecipeCard.module.css";

export default function RecipeCard({id, name, image, diets}){
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
                if(i===diets.length){
                    if(typeof diet === 'string'){
                        return(
                            `${diet}.`
                        )
                    }else{
                        return(
                            `${diet["name"]}.`
                        )
                    }
                }else{
                    if(typeof diet === 'string'){
                        return(
                            `${diet}, `
                        )
                    }else{
                            return(
                                `${diet["name"]}, `
                                )
                    }
                }
            })
            }
            </p>
            <img src={image} alt="imagen" className={style.imgcard}/>
        </section>
    )
}