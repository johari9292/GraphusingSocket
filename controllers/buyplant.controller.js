const BuyPlant = require("../models/tobuy.modal");

exports.getBuyPlants = (req, res) => {
  BuyPlant.find()
    .sort({ created: -1 })
    .exec((err, buyPlants) => {
      if (err) {
        console.log(err);
      } else {
        res.json(buyPlants);
      }
    });
};

exports.deleteBuyPlant = (req, res) => {
  BuyPlant.remove({ _id: req.params.id }, (err) => {
    if (!err) {
      res.status(200).send({ status: "deleted" });
    } else {
      res.status(500).send({ status: "error" });
    }
  });
};

exports.getBuyPlantById = (req, res) => {
  const id = req.params.id;
  BuyPlant.findById(id, (err, buyPlant) => {
    if (err) {
      console.log(err);
    } else {
      res.json(buyPlant);
    }
  });
};

exports.addBuyPlant = (req, res) => {
  const buyPlant = new BuyPlant(req.body);
  buyPlant
    .save()
    .then(() => {
      res.status(200).json({ message: "Buy plant added successfully" });
    })
    .catch((err) => {
      res.status(400).send("Adding new buy plant failed");
    });
};

exports.updateBuyPlant = (req, res) => {
  BuyPlant.findById(req.params.id, (err, buyPlant) => {
    if (!buyPlant) {
      res.status(404).send("Data is not found");
    } else {
      buyPlant.plant_description = req.body.plant_description;
      buyPlant.plant_quantity = req.body.plant_quantity;
      buyPlant.plant_price = req.body.plant_price;

      buyPlant
        .save()
        .then(() => {
          res.json("Buy plant updated");
        })
        .catch(() => {
          res.status(400).send("Update not possible");
        });
    }
  });
};
