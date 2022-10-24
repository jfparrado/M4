import React from "react";
import style from "./Paginado.module.css"

export default function Paginado({recipesPerPage,numberOfRecipes, paginado}){
    const pageNumbers=[];
    for(let i=1;i<=Math.ceil(numberOfRecipes/recipesPerPage);i++)//desde i hasta la cantidad de paginas
    {
        pageNumbers.push(i)
    }
    return(
        <nav>
            <ul className={style.allpages}>
                {pageNumbers&&pageNumbers.map(number=>( // para cado uno de los numeros de pagina
                <li className={style.pagenumber} key={number}>
                    <a className={style.numpage} onClick={()=>paginado(number)}>{number}</a>
                </li>
                ))}
            </ul>

        </nav>
    )
}