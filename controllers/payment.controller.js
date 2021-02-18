const Todo = require("../models/payment");

// exports.sendmail = async (req, res) => {
//   let email = req.body.email;
//   const user = new User(req.body);
//   var mailOptions = {
//     from: "johari9292@gmail.com",
//     to: "joharibalti1996@gmail.com",
//     subject: "Sending Email using Node.js",
//     text: "That was easy!" ,
//   };

//   try {
//     transporter.sendMail(mailOptions, function (error, info) {
//       if (error) {
//         console.log(error);
//       } else {
//         console.log("Email sent: " + info.response);
//       }
//     });
//     return res.status(200).json({
//       message: " Email send Sucessfully!",
//     });
//   } catch (err) {
//     return res.status(400).json({
//       error: errorHandler.getErrorMessage(err),
//     });
//   }
// };

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
  Todo.find({ user: "5fe4f540c9f4d800173cd622" }, function (err, todos) {
    res.json(todos);
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
