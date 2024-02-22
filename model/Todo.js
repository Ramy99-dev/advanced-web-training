const mongoose = require('mongoose')

let schema = new mongoose.Schema({
    content:{type:String , require:true},
    isCompleted:{type:Boolean , require:true}
})

let Todo = mongoose.model('todo',schema)

module.exports = Todo