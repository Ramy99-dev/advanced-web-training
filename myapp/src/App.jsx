import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [todos, setTodos ] = useState([])
  let content = ""

  const fetchData = async () => {
     let response = await fetch('http://localhost:5000/todos');
     let data = await response.json()
     if(response.status != 500)
     {
        setTodos([...data])
     }
   
  }


  const addTodo = async (content)=>{
    let response = await fetch('http://localhost:5000/add-todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({content})
    })
    if(response.status != 500)
    {
      let newTodo = await response.json()
      console.log(newTodo)
      setTodos([...todos,newTodo])
    }
    
  }

  const deleteTodo = async(id)=>{
    console.log(id)
     let response = await fetch(`http://localhost:5000/delete-todo/${id}`, {
       method: 'DELETE'
     })
    let newTodos = todos.filter((todo)=>{
        return todo._id != id
    })
    if(response.status != 500)
    {
      setTodos(newTodos)
    }
  }

  useEffect(()=>{
   fetchData()
  },[])


  return (
    <div className="container">
       <span>Logout</span>
       <div className="todo">
        <input type="text" onChange={(e)=>{
           content = e.target.value
        }} name="" id="" />
        <input type="button" value="Add" onClick={(e)=>{addTodo(content)}} />
        <ul>
          {todos.length > 0 && todos.map((todo)=>{
            
            return(<div  key={todo._id} className='item'>
               <li>{todo.content}</li>
               <button  onClick={()=>{
                      deleteTodo(todo._id)
               }}>Delete</button>
            </div>)
          })}
        </ul>
       </div>
    </div>
  )
}

export default App
