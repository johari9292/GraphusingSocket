const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Todo = new Schema({
    no_task:{
        type:Number
    },
   date:{
        type:Date,
        default: Date.now
        
    }
})
// let Todo = new Schema({
//     todo_description:{
//         type:String
//     },
//     todo_responsible:{
//         type:String
//     }, 
//     todo_priority:{
//         type:String
//     },
//      todo_completed:{
//         type:String
//     },todo_date:{
//         type:Date,
//         default: Date.now
        
//     }
// })

module.exports = mongoose.model('Todo', Todo);