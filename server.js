const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors('*'))

const PORT = 5000

mongoose.connect("mongodb://127.0.0.1/test")
app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`)
})


let todoSchema = new mongoose.Schema(
{
    content : {type:String , required : true},
    isCompleted : {type:Boolean , required : true}
}) 

let Todo = mongoose.model('todo',todoSchema);


app.get('/todos',async(req,res)=>{
    const result = await Todo.find()
    res.send(result)
})

app.get('/todo/:id',async(req,res)=>{
    try
    {
        const result = await Todo.findById(req.params.id)
         res.send(result)
    }
    catch(err)
    {
        res.status(500).send("Error : " + err);
    }
    
})

app.post('/add-todo',async(req,res)=>{
    try 
    {
        let newTodo = {
            "content":req.body.content,
            "isCompleted":false
        }  
        let todo = new Todo(newTodo)
        
        newTodo = await todo.save()
        res.send(newTodo)
    }
    catch(err)
    {
        res.status(500).send("Error : " + err);
    }
    
 
})

app.delete('/delete-todo/:id',async(req,res)=>{
    try
    {
        const result = await Todo.findOneAndDelete(req.params.id)
        res.send(result)
    }
    catch(err)
    {
        res.status(500).send("Error : "+err)
    }
})

app.put('/update-todo',async(req,res)=>{
    try
    {
        const result = await Todo.findByIdAndUpdate(req.body.id,req.body)
        res.send(result)
    }
    catch(err)
    {
        res.status(500).send("Error : " + err);
    }
   
})







