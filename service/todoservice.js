const Todo = require("../model/Todo")

async function addTodo(req,res){
 try
  {
    let todo = new Todo(req.body)
    await todo.save()
  }
  catch(err)
  {
    res.status(500).send(err)
  }
}

async function deleteTodo(req,res){
    try
    {
      let deletedTodo = await Todo.findByIdAndDelete(req.params.id)
      res.send(deletedTodo)
    }
    catch(err)
    {
      res.status(500).send(err)
    }
}

async function getTodos(req,res){
    try
    {
        let todos = await Todo.find()
        res.send(todos)
    }
    catch(err)
    {
        res.status(500).send(err)
    }
    
}
module.exports = {
    addTodo,
    deleteTodo,
    getTodos
}