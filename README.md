## Model-View-Controller (MVC) pattern
Previously, we were coding in the same file, `server.js`, which is considered a bad practice.<br/>
Our code should be as modular as possible. Therefore, in this session, we will organize our project into folders like this:

### Model:
- In the Model folder, we'll define the structure and behavior of our data entities. These entities typically represent the data stored in our database or used within our application.
- Each entity class or file within the Model folder will correspond to a specific type of data object, such as User, Product, Order, etc.
- These entities will typically include attributes (fields or properties) and methods that define how the data can be manipulated and interacted with throughout the application.
- For example, if we're building an e-commerce application, we might have models such as User, Product, Order, CartItem, etc.

### Controller:
- The Controller folder will contain the logic for handling incoming HTTP requests and generating appropriate responses.
- Each controller class or file within this folder will correspond to a specific set of related API endpoints or routes.
- Controllers act as an intermediary between the incoming requests from clients (e.g., web browsers, mobile apps) and the business logic of the application.
- They will typically parse request data, invoke appropriate methods from the Service layer, and construct responses to send back to the client.
- For example, if we have an API for managing user accounts, we might have a UserController that handles endpoints for user registration, login, profile updates, etc.

### Service:
- The Service folder will contain the business logic of our application.
- This layer is responsible for implementing the core functionality and operations of our application, such as data validation, manipulation, and interaction with the database.
- Services encapsulate the application's business rules and ensure that they are applied consistently across different parts of the application.
- Controllers will typically delegate tasks to the appropriate service methods to perform the necessary operations.
- For example, in an e-commerce application, we might have services such as UserService for managing user-related operations, ProductService for managing product-related operations, etc.


First, we will begin by creating our model. We'll create a folder called `model`. Inside this folder, we will create a file named `Todo.js`. This file will contain the schema and model definition for our 'todo' entity. We will refactor the relevant code from `server.js` and place it inside the `Todo.js` file : 

```javascript
    const mongoose = require('mongoose')

    let schema = new mongoose.Schema({
        content:{type:String , require:true},
        isCompleted:{type:Boolean , require:true}
    })

    let Todo = mongoose.model('todo',schema)

    module.exports = Todo
```

`module.exports` is a special object in Node.js that allows a module to expose functionality to other modules or files in a Node.js application.


After creating our model, we will proceed to create our services. We'll start by creating a folder called `service`. Inside this folder, we will create a file named `TodoService.js`. This file will contain functions representing the business logic of our application. These functions will handle operations related to managing todos, such as creating, updating, deleting, and fetching todos from the database :

```javascript
    const Todo = require("../model/Todo")

    async function addTodo(req,res)
    {
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

    async function deleteTodo(req,res)
    {
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

    async function getTodos(req,res)
    {
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
```
This line imports the Todo model from the ../model/Todo file. 
```javascript
const Todo = require("../model/Todo")
```
The `try-catch` block is a fundamental error-handling mechanism in JavaScript, used to gracefully handle potential errors that may occur within a specific block of code.

Lastly, we create our controller, which will contain our API endpoints and correspond each request with the appropriate service. As previously, we create a folder named controller, which contains a file named todoController.js. This file will handle the routing and mapping of HTTP requests to the corresponding service functions : 

```javascript
    const service = require('../service/todoservice')
    const express = require('express')
    const router = express.Router()

    router.get('/todos',service.getTodos)

    router.post('/add-todo',service.addTodo)

    router.delete('/todo/:id',service.deleteTodo)

    module.exports = router
```
This code sets up an Express `router` to handle different HTTP routes related to a todo application.<br/>
`const router = express.Router()`: This line creates an instance of an Express router, which is a middleware that helps in defining route handlers.

In the service.js file, we are now left only with this code. 
```javascript
    const express = require('express')
    const mongoose = require('mongoose')
    const app = express()

    app.use(express.json())
    const uri = "mongodb://localhost:27017/tododb";
    mongoose.connect(uri)

    app.listen(5000,()=>{
        console.log("Listening on port 5000")
    })
```



However, how do we call our routes?
To call our routes, we use middlewares. First, we import our route : 
```javascript
    const todoRoute = require('./controller/todoController')
```
then we add our middleware
```javascript
    app.use(todoRoute)
```
`app.use(todoRoute)` tells Express to use `todoRoute` as middleware for handling incoming HTTP requests, effectively routing them based on the defined instructions in todoRoute.
