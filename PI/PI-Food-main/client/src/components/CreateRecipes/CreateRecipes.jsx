import React from "react";
import{ useState, useEffect }from "react";
import {useHistory} from "react-router-dom"
import { postRecipe, getAllDiets} from "../../actions";
import {useDispatch, useSelector} from "react-redux";
import style from "./CreateRecipes.module.css";

export default function CreateRecipe(){
    const dispatch=useDispatch();
    const history=useHistory();
    const allDishes = ['breakfast', 'brunch', 'dinner', 'lunch', 'main course', 'main dish', 'morning meal', 'salad', 'side dish', 'soup']

    const diets=useSelector((state)=>state.diets)
    const [errors,setErrors]=useState({
        name:`Se requiere name`,
        summary:"Se requiere summary ",
        healthScore:"Se requiere healthScore",
        steps:"Se requiere steps",
        image:"Se requiere image",
        dishTypes:"",
        diets:"",
    }) //aca se crean los posibles errores
    const [input,setInput]=useState({
        name:"",
        summary:"",
        healthScore:null,
        steps:"",
        image:"",
        dishTypes:[],
        diets:[]
    })
    useEffect(()=>{
        dispatch(getAllDiets())
    },[dispatch])

    function validate(input){ //aca entra todo el estado input
        let errors={}
        for(let propiedad in input){
            if (!input[propiedad]){
                errors[propiedad]=`Se requiere ${propiedad}`;
            }
        }
        return errors
    }

    function handleChange(event){
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
        setErrors(
            validate({
            ...input,
            [event.target.name]: event.target.value
            })
        )
    }

    function handleCheck(event){
        if(event.target.checked){
            setInput({
                ...input,
                [event.target.name]: [...input[event.target.name], event.target.value]
            })
        }
        if(!event.target.checked){//para que al deseleccionar del estado se quiten las cosas
            setInput({
                ...input,
                [event.target.name]: input[event.target.name].filter(seleccion=>seleccion!==event.target.value)
            })
        }
    }
    
    function handleSubmit(event){
        event.preventDefault();
        try {
            dispatch(postRecipe(input))
        alert("personaje creado")
        setInput({
            name:"",
            summary:"",
            healthScore:0,
            steps:"",
            image:"",
            dishTypes:"",
            diets:[]
        })
        history.push("/home") //asi es como se rediriges
        } catch (error) {
            console.log("el error es:", error)
        }
        
    }
    return(
        <form className={style.mainContainer} onSubmit={(event)=>handleSubmit(event)}>
            <h3>Create a new recipe</h3>
            <div className={style.container}>
                <label htmlFor="name" className={style.titleInput}>Name*: </label>
                <input className={style.input} type='text' placeholder="Pepito Perez" name='name' id="name"  value={input.name} onChange={(event)=>handleChange(event)} required/>
                {errors.name&&(
                <p className={style.errors}>{errors.name}</p>
                )}
            </div>

            <div className={style.container}>
                <label htmlFor="summary" className={style.titleInput}>Summary*: </label>
                <input className={style.input} type='text' placeholder="A salad with tomatos" name='summary' id="summary" value={input.summary} onChange={(event)=>handleChange(event)} required/>
                {errors.summary&&(
                <p className={style.errors}>{errors.summary}</p>
                )}
            </div>

            <div className={style.container}>
                <label htmlFor="healthScore" className={style.titleInput}>Health score*: </label>
                <input className={style.input} type='number' name='healthScore' placeholder="1"id="healthScore" min="0" max="100" value={input.healthScore} onChange={(event)=>handleChange(event)} required/>
                {errors.healthScore&&(
                <p className={style.errors}>{errors.healthScore}</p>
                )}
            </div>

            <div className={style.container}>
                <label htmlFor="steps" className={style.titleInput}>Step by step*: </label>
                <input className={style.input} type='text' name='steps' placeholder="Step 1: Put the" id="steps" value={input.steps} onChange={(event)=>handleChange(event)} required/>
                {errors.steps&&(
                <p className={style.errors}>{errors.steps}</p>
                )}
            </div>

            <div className={style.container}>
                <label htmlFor="image" className={style.titleInput}>Image*: </label>
                <input className={style.input} type="url" placeholder="https://example.com/example.jpg" pattern="https://.*" name='image' id="image" value={input.image} onChange={(event)=>handleChange(event)} required/>
                {errors.image&&(
                <p className={style.errors}>{errors.image}</p>
                )}
            </div>

            <div className={style.title}> <h4 >Dishes</h4> </div>
            <div className={style.arrays}>
                {allDishes?.map((dish)=>(
                <label className={style.inputArray}><input type="radio" name="dishTypes" value={dish} onChange={(event)=>handleCheck(event)} />{dish}</label>
                ))}
                
            </div>

            <div className={style.title}> <h4>Diets</h4> </div>
            <div className={style.arrays}>
                {diets?.map((diet)=>(
                    <label className={style.inputArray}><input type="radio" name="diets" value={diet.name} onChange={(event)=>handleCheck(event)} />{diet.name}</label>
                ))}
                
            </div>

            <div>
                {Object.keys(errors).length!==0 ? 
                <button type="submit" disabled >Add recipe</button>:
                <button type="submit" >Add recipe</button>
                }
            </div>
        </form>
    )
}