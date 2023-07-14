const Profile = require("../models/user.model");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
    user: "gaveagro2022@gmail.com",
    pass: "xqksrhtfzdcraxwz",
  },
});

exports.getProfiles = (req, res) => {
  Profile.find()
    .sort({ created: -1 })
    .exec((err, profiles) => {
      if (err) {
        console.log(err);
      } else {
        res.json(profiles);
      }
    });
};

exports.deleteProfile = (req, res) => {
  Profile.remove({ _id: req.params.id }, (err) => {
    if (!err) {
      res.status(200).send({ status: "deleted" });
    } else {
      res.status(500).send({ status: "error" });
    }
  });
};

exports.getProfileById = (req, res) => {
  Profile.findById(req.params.id, (err, profile) => {
    if (err) {
      console.log(err);
    } else {
      res.json(profile);
    }
  });
};

exports.addProfile = (req, res) => {
  const profile = new Profile(req.body);
  profile
    .save()
    .then(() => {
      res.status(200).json({ profile: "Profile added successfully" });
    })
    .catch((err) => {
      res.status(400).send("Adding new profile failed");
    });
};

exports.updateProfile = (req, res) => {
  Profile.findById(req.params.id, (err, profile) => {
    if (!profile) {
      res.status(404).send("Profile data not found");
    } else {
      profile.name = req.body.name;
      profile.email = req.body.email;
      profile.phone_number = req.body.phone_number;
      profile.dateofbirth = req.body.dateofbirth;
      profile.gender = req.body.gender;
      profile.nationality = req.body.nationality;
      profile.namenic = req.body.namenic;
      profile.nic = req.body.nic;
      profile.country = req.body.country;
      profile.state = req.body.state;
      profile.city = req.body.city;
      profile.street = req.body.street;
      profile.postal_code = req.body.postal_code;
      profile.password = req.body.password;
      profile.image = req.body.image;
      profile.cnicfront = req.body.cnicfront;
      profile.cincback = req.body.cincback;

      profile
        .save()
        .then(() => {
          const mailOptions = {
            from: "gaveagro2022@gmail.com",
            to: "hola@gaveagro.com",
            subject: "Profile Data",
            text: `
              Name: ${req.body.name}
              Email: ${req.body.email}
              Phone Number: ${req.body.phone_number}
              NIC: ${req.body.nic}
              Nationality: ${req.body.nationality}
              Country: ${req.body.country}
              State: ${req.body.state}
              City: ${req.body.city}
              Street: ${req.body.street}
              Postal code: ${req.body.postal_code}`,
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          });

          res.json("Profile updated");
        })
        .catch((err) => {
          res.status(400).send("Update not possible");
          console.log(err);
        });
    }
  });
};
