const Todo = require("../models/user.model");

exports.gettodo = (req, res) => {
  Todo.find(function (err, todos) {
    if (err) {
      console.log(err);
    } else {
      res.json(todos);
    }
  }).sort({ created: -1 });
};

exports.deletetodo = (req, res) => {
  Todo.remove({ _id: req.params.id }, function (err) {
    if (!err) {
      res.status(200).send({ status: "deleted" });
    } else {
      res.status(500).send({ status: "error" });
    }
  });
};

exports.gettodobyid = (req, res) => {
  let id = req.params.id;
  Todo.findById(id, function (err, todo) {
    res.json(todo);
  });
};

exports.addtodo = (req, res) => {
  let todo = new Todo(req.body);
  todo
    .save()
    .then((todo) => {
      res.status(200).json({ todo: "todo added successfully" });
    })
    .catch((err) => {
      res.status(400).send("adding new todo failed");
    });
};

exports.updatetodo = (req, res) =>
  Todo.findById(req.params.id, function (err, todo) {
    if (!todo) {
      res.status(404).send("data is not found");
    } else {
      todo.name = req.body.name;
      todo.email = req.body.email;
      todo.phone_number = req.body.phone_number;
      todo.dateofbirth = req.body.dateofbirth;
      todo.gender = req.body.gender;
      todo.nationality = req.body.nationality;
      todo.namenic = req.body.namenic;
      todo.nic = req.body.nic;
      todo.country = req.body.country;
      todo.state = req.body.state;
      todo.city = req.body.city;
      todo.street = req.body.street;
      todo.postal_code = req.body.postal_code;
      todo.password = req.body.password;
      todo
        .save()
        .then((todo) => {
          res.json("Todo updated");
        })
        .catch((err) => {
          res.status(400).send("Update not possible");
        });
    }
  });
