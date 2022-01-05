const User = require("../models/user.model");
const extend = require("lodash/extend");
const errorHandler = require("./../helpers/dbErrorHandler");
var nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
    user: "gaveagro2022@gmail.com",
    pass: "ishaq119821885",
  },
});
exports.create = async (req, res) => {
  let email = req.body.email;
  let name = req.body.name;
  const user = new User(req.body);
  var mailOptions = {
    from: "gaveagro1996@gmail.com",
    to: "hola@gaveagro.com",
    subject: "New User Registration",
    text: `
New user with name ${name}  and  ${email}  has registered
User Details
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

  try {
    await user.save();
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    return res.status(200).json({
      message: "Successfully signed up!",
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

/**
 * Load user and append to req.
 */
exports.userByID = async (req, res, next, id) => {
  try {
    let user = await User.findById(id);
    if (!user)
      return res.status("400").json({
        error: "User not found",
      });
    req.profile = user;
    next();
  } catch (err) {
    return res.status("400").json({
      error: "Could not retrieve user",
    });
  }
};

exports.read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

exports.list = async (req, res) => {
  try {
    let users = await User.find().select("name email updated created");
    res.json(users);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

exports.update = async (req, res) => {
  try {
    let user = req.profile;
    user = extend(user, req.body);
    user.updated = Date.now();
    await user.save();
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json(user);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

exports.remove = async (req, res) => {
  try {
    let user = req.profile;
    let deletedUser = await user.remove();
    deletedUser.hashed_password = undefined;
    deletedUser.salt = undefined;
    res.json(deletedUser);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};
