import React from "react";
import {useState} from "react";
import {useDispatch} from "react-redux"; 
import { getRecipesByName } from "../../actions";
import style from "./SearchBar.module.css"
import {useHistory} from "react-router-dom"

export default function SearchBar(){
    const dispatch =useDispatch()
    const history=useHistory();
    const [name,setName]=useState("")

    function handleInputChange(event){
        event.preventDefault()
        setName(event.target.value)
    }
    function handleClick(event){
        event.preventDefault();
        history.push("/home")
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