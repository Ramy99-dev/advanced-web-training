const service = require('../service/todoservice')
const express = require('express')
const router = express.Router()

router.get('/todos',service.getTodos)

router.post('/add-todo',service.addTodo)

router.delete('/todo/:id',service.deleteTodo)

module.exports = router