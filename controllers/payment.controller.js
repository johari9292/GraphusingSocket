const Payment = require("../models/payment");

exports.getPayments = (req, res) => {
  Payment.find()
    .sort({ created: -1 })
    .exec((err, payments) => {
      if (err) {
        console.log(err);
      } else {
        res.json(payments);
      }
    });
};

exports.deletePayment = (req, res) => {
  Payment.remove({ _id: req.params.id }, (err) => {
    if (!err) {
      res.status(200).send({ status: "deleted" });
    } else {
      res.status(500).send({ status: "error" });
    }
  });
};

exports.getPaymentsByUser = (req, res) => {
  Payment.find({ user: req.params.id }, (err, payments) => {
    if (err) {
      console.log(err);
    } else {
      res.json(payments);
    }
  });
};

exports.addPayment = (req, res) => {
  const payment = new Payment(req.body);
  payment
    .save()
    .then(() => {
      res.status(200).json({ message: "Payment added successfully" });
    })
    .catch((err) => {
      res.status(400).send("Adding new payment failed");
    });
};

exports.updatePayment = (req, res) => {
  Payment.findById(req.params.id, (err, payment) => {
    if (!payment) {
      res.status(404).send("Data is not found");
    } else {
      payment.payment_description = req.body.payment_description;
      payment.payment_amount = req.body.payment_amount;
      payment.payment_method = req.body.payment_method;

      payment
        .save()
        .then(() => {
          res.json("Payment updated");
        })
        .catch(() => {
          res.status(400).send("Update not possible");
        });
    }
  });
};
