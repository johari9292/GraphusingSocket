const Todo = require("../models/modal")
assert = require('assert')
exports.gettodo = (req, res) => {

    let dates = req.params.date

    let newdate = parseInt (new Date(dates).getDate(),10);
    let newmonth =parseInt( new Date(dates).getMonth()+1,10);
    let newyear = parseInt( new Date(dates).getFullYear(),10);
 
    Todo.aggregate([
        {
            "$redact": {
                "$cond": [
                    {"$and": [ 
                        { "$eq": [ { "$month": "$date" },newmonth] },
                        { "$eq": [ { "$year": "$date" }, newyear] },
                        { "$eq": [ { "$dayOfMonth": "$date" }, newdate ] }
                    ]  },
                    "$$KEEP",
                    "$$PRUNE"
                ]
            }},
            {
                '$project': {
                    _id:null,
                    date:1,
                    no_task:1
                              }
            }, 
            {
                '$group': {
                    _id : {date:"$date" },
                    
                    x:{$last:"$date"},
                    y:{$avg:{"$toInt":"$no_task"}},
                   
                 
                }
            }
         
       
    ]).then(resl =>{
        
        res.json(resl)
        
    })
   
};
exports.getbymonth = (req, res) => {

    let months =parseInt( req.params.month,10)
    let years = parseInt( req.params.year,10)
 
    Todo.aggregate([
       
        {
            "$redact": {
                "$cond": [
                    {"$and": [ 
                        { "$eq": [ { "$month": "$date" },months] },
                        { "$eq": [ { "$year": "$date" }, years] }
                    ]  },
                    "$$KEEP",
                    "$$PRUNE"
                ]
            }
        }, {
            '$project': {
                 dates: {'$dateToString': {format: '%Y-%m-%d', date: '$date'}},
                _id:null,
                date:1,
                no_task:1
                          }
        }, 
        {
            '$group': {
                _id : { day: { $dayOfMonth: "$date" },
                        month: { $month: "$date" }, 
                        year: { $year: "$date" } },
               
                x:{$last:"$dates"},
                y:{$avg:{"$toInt":"$no_task"}},
              
             
            }
        }
    ]).then(resl =>{
        res.send(resl)
    
    })
    
}

exports.getbyyear = (req, res) => {

    let years =parseInt( req.params.year)
    
    Todo.aggregate([
       
        {
            "$redact": {
                "$cond": [
                    
                      
                        { "$eq": [ { "$year": "$date" }, years] },
                    
                    "$$KEEP",
                    "$$PRUNE"
                ]
            }
        }, {
            '$project': {
                dates: {'$dateToString': {format: '%Y-%m', date: '$date'}},
                _id:null,
                date:1,
                no_task:1
                          }
        }, 
        {
            '$group': {
                _id : { 
                        month: { $month: "$date" }, 
                        year: { $year: "$date" } },
               
                x:{$last:"$dates"},
                y:{$avg:{"$toInt":"$no_task"}},
                
             
            }
        }
    ]).then(resl =>{
        res.send(resl)
        console.log("reslt",resl)
    })
   

}
exports.deletetodo = (req, res) => {
    Todo.remove({ _id: req.params.id }, function (err) {
        if (!err) {
            res.status(200).send({ 'status': 'deleted' });
        }
        else {
            res.status(500).send({ 'status': 'error' });
        }
    });
}


exports.gettodobyid = (req, res) => {
    let id = req.params.id;
    Todo.findById(id, function (err, todo) {
        res.json(todo);
    })
};


exports.addtodo = (req, res) => {
    let todo = new Todo(req.body);

    todo.save()
        .then(todo => {
            res.status(200).json({ 'todo': 'todo added successfully' });
        })
        .catch(err => {
            res.status(400).send('adding new todo failed');
        });
}

exports.updatetodo = (req, res) => {
    Todo.findById(req.params.id, function (err, todo) {
        if (!todo)
            res.status(404).send('data is not found');
        else
            todo.todo_description = req.body.todo_description;
        todo.todo_responsible = req.body.todo_responsible;
        todo.todo_priority = req.body.todo_priority;
        todo.todo_completed = req.body.todo_completed;

        todo.save().then(todo => {
            res.json('Todo updated');
        })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
};
