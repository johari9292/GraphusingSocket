const User = require("../models/user.model");
const extend = require("lodash/extend");
const errorHandler = require("./../helpers/dbErrorHandler");
var nodemailer = require("nodemailer");
// meojnnvcdbcxyzni;
const { randomInt } = require("crypto");
var transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
    user: "gaveagro2022@gmail.com",
    pass: "xqksrhtfzdcraxwz",
  },
});
exports.create = async (req, res) => {
  let email = req.body.email;
  let name = req.body.name;
  const user = new User(req.body);
  var mailOptions = {
    from: "gaveagro2022@gmail.com",
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
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    const otp = randomInt(100000, 999999);
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000; // otp expires in 10 minutes
    await user.save();

    const mailOptions = {
      from: "gaveagro2022@gmail.com",
      to: email,
      subject: "GaveAgro Password reset OTP",
      text: `Your one-time password (OTP) for password reset is: ${otp}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(500).json({
          error: "Failed to send OTP. Please try again later.",
        });
      } else {
        console.log("OTP sent: " + info.response);
        return res.status(200).json({
          message: "OTP sent successfully.",
        });
      }
    });
  } catch (err) {
    return res.status(500).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

exports.verifyOtpAndUpdatePassword = async (req, res) => {
  const { email, otp, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    if (user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(401).json({
        error: "Invalid or expired OTP",
      });
    }

    user.password = password;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    const mailOptions = {
      from: "gaveagro2022@gmail.com",
      to: email,
      subject: "GaveAgro Password reset successful",
      text: `Your password is ${password} & it has been successfully reset. If you did not initiate this request, please contact our support team immediately.`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    return res.status(200).json({
      message: "Password reset successfully.",
    });
  } catch (err) {
    return res.status(500).json({
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
