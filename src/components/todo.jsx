import { useState } from "react"


export default function Todo({item , onUpdate, onDelete}){ //De las props me traigo item con destructuring, es lo unico que voy a usar

    const[isEdit,setIsEdit] =useState(false);

    function FormEdit(){

        const [newValue, setNewValue] = useState(item.title)

        function handleSubmit(event){
            event.preventDefault();
        }

        function handleChange(event) {
            const value = event.target.value
            setNewValue(value)
        }

        function handleClickUpdateTodo(event){
            onUpdate(item.id, newValue);
            setIsEdit(false)
        }

        return(
            <form className="todoUpdateForm" onSubmit={handleSubmit}>
                <input type="text" className="todoInput" onChange={handleChange} value={newValue}/>
                <button className="button" onClick={handleClickUpdateTodo}>Update</button>
            </form>
        )
    }

    function TodoElement(){
        return(
            <div className="todoInfo">
                <span className="todoTitle"> {item.title}</span>
                <button className="button" onClick={()=>setIsEdit(true)}>Edit</button>
                <button className="buttonDelete" onClick={(event)=> onDelete(item.id)}>Delete</button>
            </div>
        )
    }

    return(

        <div className="todo">
            {isEdit ? <FormEdit /> : <TodoElement />}    
        </div>


    )
}


//       {isEdit ? <FormEdit /> : <TodoElement />}     linea 29
//evalua el edit, si el estado es true, muestra formEdit, si es false, muestra TodoElement