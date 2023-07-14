const Balance = require("../models/balance.model");

exports.getBalance = (req, res) => {
  Balance.findOne({ user: req.params.id }, function (err, balance) {
    if (err) {
      console.log(err);
    } else {
      res.json(balance);
    }
  });
};

exports.getUserBalance = (req, res) => {
  Balance.find({ user: req.params.id }, function (err, balances) {
    res.json(balances);
  });
};

exports.deleteBalance = (req, res) => {
  Balance.remove({ _id: req.params.id }, function (err) {
    if (!err) {
      res.status(200).send({ status: "deleted" });
    } else {
      res.status(500).send({ status: "error" });
    }
  });
};

exports.getBalanceById = (req, res) => {
  Balance.find(function (err, balances) {
    if (err) {
      console.log(err);
    } else {
      res.json(balances);
    }
  }).sort({ created: -1 });
};

exports.addBalance = (req, res) => {
  let balance = new Balance(req.body);
  balance
    .save()
    .then(() => {
      res.status(200).json({ message: "Balance added successfully" });
    })
    .catch((err) => {
      res.status(400).send("Adding new balance failed", err);
    });
};

exports.updateBalance = (req, res) => {
  Balance.findById(req.params.id, function (err, balance) {
    if (!balance) res.status(404).send("Data is not found");
    else {
      balance.balance_description = req.body.balance_description;
      balance.balance_responsible = req.body.balance_responsible;
      balance.balance_priority = req.body.balance_priority;
      balance.balance_completed = req.body.balance_completed;

      balance
        .save()
        .then(() => {
          res.json("Balance updated");
        })
        .catch((err) => {
          res.status(400).send("Update not possible");
        });
    }
  });
};
