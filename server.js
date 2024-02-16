const express = require('express')
const mongoose = require('mongoose')
const app = express()

app.use(express.json())
const uri = "mongodb://localhost:27017";
mongoose.connect(uri)

let schema = new mongoose.Schema({
    content:{type:String , require:true},
    isCompleted:{type:Boolean , require:true}
})

let Todo = mongoose.model('todo',schema)

const verify = (req,res,next)=>{
    next()
}


app.get('/todos',async (req,res)=>{
    let todos = await Todo.find()
    res.send(todos)
})

app.post('/add-todo',verify,async (req,res)=>{
  let todo = new Todo(req.body)
  await todo.save()
})

app.delete('/todo/:id',async (req,res)=>{
  let deletedTodo = await Todo.findByIdAndDelete(req.params.id)
  res.send(deletedTodo)
    
})

app.listen(5000,()=>{
    console.log("Listening on port 5000")
})






