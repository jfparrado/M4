import React from "react";
import {Link} from "react-router-dom"
import "./RecipeCard.css";

export default function RecipeCard({id, name, image, diets}){
    let i=0;
    return(
        <section>
            <h2 className="titlecard">
                <Link  to={`/home/${id}` }> 
                {name} 
                </Link>
            </h2>
            <b>Diets:</b> 
            <p className="dietas">
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
            <img src={image} alt="imagen" className="imgcard"/>
        </section>
    )
}