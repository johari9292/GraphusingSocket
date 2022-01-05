const Todo = require("../models/user.model");
var nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
    user: "gaveagro2022@gmail.com",
    pass: "ishaq119821885",
  },
});

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
      todo.dateofbirt = req.body.dateofbirt;
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
      todo.image = req.body.image;
      todo.cnicfront = req.body.cnicfront;
      todo.cincback = req.body.cincback;
      todo
        .save()
        .then((todo) => {
          var mailOptions = {
            from: "gaveagro2022@gmail.com",
            to: "hola@gaveagro.com",
            subject: "User Data",
            text: `
Name:            ${req.body.name}
Email:           ${req.body.email}
Phone Number:    ${req.body.phone_number}
NIC:             ${req.body.nic}
Nationality:     ${req.body.nationality}
Country:         ${req.body.country} 
State:           ${req.body.state}
City:            ${req.body.city}
Street:          ${req.body.street}
Postal code:     ${req.body.postal_code}`,
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          });
          res.json("Todo updated");
        })
        .catch((err) => {
          res.status(400).send("Update not possible");
          console.log("err");
        });
    }
  });
