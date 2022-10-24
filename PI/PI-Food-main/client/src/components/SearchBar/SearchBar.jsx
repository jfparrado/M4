import React from "react";
import {useState} from "react";
import {useDispatch} from "react-redux"; 
import { getRecipesByName } from "../../actions";
import style from "./SearchBar.module.css"

export default function SearchBar(){
    const dispatch =useDispatch()
    console.log(dispatch)
    const [name,setName]=useState("")

    function handleInputChange(event){
        event.preventDefault()
        setName(event.target.value)
    }
    function handleClick(event){
        event.preventDefault();
        dispatch(getRecipesByName(name))
        setName("")
    }
    
    return(
        <div className={style.container}>
            <input type="text" placeholder="Recipe" className={style.searchbox} value={name} onChange={(event)=>handleInputChange(event)} />
            <button type="submit" onClick={(event)=>{handleClick(event)}}>Search</button>
        </div>
    )
}