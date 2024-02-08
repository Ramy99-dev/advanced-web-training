const express = require('express')
let todos = require('./data')



const app = express()

app.use(express.json())


// Middleware to verify if a todo already exists or not
const verifyExist = (req,res,next)=>{
    let todosTmp = todos.filter((todo)=>{
             return todo.content == req.body.content
        
    })
    if(todosTmp.length > 0)
    {
        res.status(500).send('todo already exist')
    }
    else
    {
        next()
    }
}

app.post('/add-todo',verifyExist,(req,res)=>{
   
    let id =  todos.at(-1).id + 1
    if(req.body.content != null)
    {
        newTodo = {
            "id":id,
            "content":req.body.content,
            "isCompleted":false
        }
    
        todos.push(newTodo)
        res.status(200).send("Inserted successfully")
    }
    else{
        res.status(500).send("Missing content")
    }
})

app.get('/todos',(req,res)=>{
    res.json(todos)
})

app.delete('/todo/:id',(req,res)=>{
    let id = req.params.id

    if(id != null)
    {
       todos = todos.filter((todo)=>{
          return todo.id != id
       })
       res.status(200).send("Deleted successfully")
    }
    else{
       res.status(500).send("Missing id")
    }
})

app.put('/todo',(req,res)=>{
    todos = todos.filter((todo)=>{
        return todo.id != req.body.id
     })
    let updatedTodo = {
        "id":req.body.id,
        "content":req.body.content,
        "isCompleted":false
    }

    todos.push(updatedTodo)
    res.status(200).send("Updated successfully")
})


app.listen(8082,()=>{
    console.log("Listening on port 8082")
})

