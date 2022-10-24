import React from "react";
import {Link} from "react-router-dom"
import SearchBar from "../SearchBar/SearchBar"
import style from "./NavBar.module.css";

export default function Home(){
    return(
        <header className={style.sticky}>
            <ul className={style.links}>
                <li >
            <Link className={style.text} to="/home">Home</Link>
                </li>
                <li>
            <Link className={style.text} to="/create_recipes">Create Recipe</Link> 
                </li>
            </ul>
            <h2 className={style.text}>Juan`s Recipes</h2>
            <SearchBar/>
        </header>
    )
}