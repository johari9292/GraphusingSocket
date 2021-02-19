const Todo = require("../models/balance.model");

exports.gettodo = (req, res) => {
  // Todo.findOne({})
  Todo.findOne({ user: req.params.id }, function (err, todos) {
    if (err) {
      console.log(err);
    } else {
      res.json(todos);
    }
  });
};
exports.getuserBalance = (req, res) => {
  Todo.find({ user: req.params.id }, function (err, todos) {
    res.json(todos);
  });
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
  Todo.find(function (err, todos) {
    if (err) {
      console.log(err);
    } else {
      res.json(todos);
    }
  }).sort({ created: -1 });
};

exports.addtodo = (req, res) => {
  let todo = new Todo(req.body);
  todo
    .save()
    .then((todo) => {
      res.status(200).json({ todo: "todo added successfully" });
    })
    .catch((err) => {
      res.status(400).send("adding new todo failed", err);
    });
};

exports.addtodo = async (req, res) => {
  const todo = new Todo(req.body);
  try {
    await todo.save();
    return res.status(200).json({
      message: "Successfully signed up!",
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

exports.updatetodo = (req, res) => {
  Todo.findById(req.params.id, function (err, todo) {
    if (!todo) res.status(404).send("data is not found");
    else todo.todo_description = req.body.todo_description;
    todo.todo_responsible = req.body.todo_responsible;
    todo.todo_priority = req.body.todo_priority;
    todo.todo_completed = req.body.todo_completed;

    todo
      .save()
      .then((todo) => {
        res.json("Todo updated");
      })
      .catch((err) => {
        res.status(400).send("Update not possible");
      });
  });
};
