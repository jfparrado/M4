import React from "react";
import{ useState, useEffect }from "react";
import {useHistory} from "react-router-dom"
import { postRecipe, getAllDiets} from "../../actions";
import {useDispatch, useSelector} from "react-redux";


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
        dishTypes:"Se requiere dishtypes",
        diets:"Se requiere diets",
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
        console.log("el input es:", input);
        let errors={}
        for(let propiedad in input){
            console.log("la propiedad es:", propiedad);
            if (!input[propiedad]){
                errors[propiedad]=`Se requiere ${propiedad}`;
            }
        }
        console.log("los erroes son:", errors);
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
        console.log(input);
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
        <form onSubmit={(event)=>handleSubmit(event)}>
            <h1>Create a new recipe</h1>
            <div>
            <label htmlFor="name">Name</label>
            <input type='text' name='name' id="name"  value={input.name} onChange={(event)=>handleChange(event)}/>
            {errors.name&&(
            <p className="errors">{errors.name}</p>
            )}
            </div>

            <div>
            <label htmlFor="summary">Summary</label>
            <input type='text' name='summary' id="summary" value={input.summary} onChange={(event)=>handleChange(event)}/>
            {errors.summary&&(
            <p className="errors">{errors.summary}</p>
            )}
            </div>

            <div>
            <label htmlFor="healthScore">Health score</label>
            <input type='text' name='healthScore' id="healthScore" value={input.healthScore} onChange={(event)=>handleChange(event)} />
            {errors.healthScore&&(
            <p className="errors">{errors.healthScore}</p>
            )}
            </div>

            <div>
            <label htmlFor="steps">Step by step</label>
            <input type='text' name='steps' id="steps" value={input.steps} onChange={(event)=>handleChange(event)}/>
            {errors.steps&&(
            <p className="errors">{errors.steps}</p>
            )}
            </div>

            <div>
            <label htmlFor="image">Image</label>
            <input type='text' name='image' id="image" value={input.image} onChange={(event)=>handleChange(event)}/>
            {errors.image&&(
            <p className="errors">{errors.image}</p>
            )}
            </div>

            <label> Dishes</label>
            <div>
                {allDishes?.map((dish)=>(
                <label><input type="checkbox" name="dishTypes" value={dish} onChange={(event)=>handleCheck(event)} />{dish}</label>
                ))}
                
            </div>

            <label htmlFor="diets">Diets</label>
            <div>
                {diets?.map((diet)=>(
                    <label><input type="checkbox" name="diets" value={diet.name} onChange={(event)=>handleCheck(event)} />{diet.name}</label>
                ))}
                
            </div>

            <div>
                <button type="submit" >Add recipe</button>
            </div>
        </form>
    )
}