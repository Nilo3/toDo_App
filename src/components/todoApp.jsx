import { useState } from "react"
import Todo from "./todo"
import "./todoApp.css"


export default function TodoApp() {
    const [title, setTitle] = useState("")
    const[todos,setTodos] = useState([])

    //Handleclick toma un evento, que es ese evento? cuando el usuario hace click en el boton
    //Realiza un preventDefault para que la pagina no se actualice
    //y setea el titulo del input en el valor que le damos, en este caso es un str con mi nombre, pero si ponemos el famoso
    //event.target.value toma el valor de lo que ingrese el usuario. 
    /* function handleClick(event){
        event.preventDefault();
        setTitle("Nilo")
    }
    */
    //HandleChange toma un evento, que es ese evento? cuando hay un cambio en el input, o sea , cuando el usuario escribe o borra
    //toma el valor de lo que el usuario esta ingresando y lo guarda en una constante value. el event.target.value === lo que el usuario ingresa por input
    //setea el titulo con el valor del input guardado en la constante. 
    function handleChange(event){
      const value = event.target.value  
      setTitle(value);
    }

    //Handlesubmit toma un evento, que es ese evento? cuando submiteean el formulario que renderizamos en pantalla. 
    //Hace un preventDefault para que la pagina no refresque
    // crea una nueva constante que utiliza el estado que nos trajimos en linea 4
    // crea una copia del estado todos( que es la lista de tareas a hacer y hace un unshift para agregar la tarea nueva que creo el usuario)
    // le dice a la funcion que modifica al estado que a partir de ahora el estado es el que ya estaba mas la constante nueva creada
    //Se renderiza ello en pantalla y tenemos la lista con todas las tareas agregadas antes y la nueva que creo el usuario al escribir en el input y enviarla
    function handleSubmit(event) {
        event.preventDefault();

        const newTodo = {
            id: crypto.randomUUID(),
            title: title,
            completed: false
        }


        const temp = [...todos] ;
        temp.unshift(newTodo)

        setTodos(temp)

        setTitle("")
    }


    function handleUpdate (id,value){
        const temp = [...todos] ;
        const item = temp.find(item => item.id === id);
        item.title = value ;
        setTodos(temp) ;
    }

    function handleDelete(id){
        const temp = todos.filter(item => item.id !== id); 
        setTodos(temp)
    }

    return (
        <div className="todoContainer">
            <h1>To Do App</h1>
           <form className="todoCreateForm" onSubmit={handleSubmit}>
            <input  onChange={handleChange} className="todoInput" value={title} />
            <input onClick={handleSubmit} type="submit" value="Create todo" className="buttonCreate" />

            
            </form> 
            <div className="todosContainer">
                {
                    todos.map(item => (   //recorro cada uno de los participantes de mi array todos, en linea 5 lo estamos definiendo como el estado, y como lo defini como array le puedo hacer el map que es un metodo de arrays que devuelve un array nuevo
                       <Todo key={item.id} item={item} onUpdate={handleUpdate} onDelete={handleDelete}/>
                    ))
                }

            </div>
        </div>
    )
}