// const BuyEmail = require("../models/buyemail.modal");
var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
    user: "joharibalti1996@gmail.com",
    pass: "ishaq119821885",
  },
});
exports.buyemail = (req, res) => {
  var mailOptions = {
    from: "johari9292@gmail.com",
    to: "admin@gaveagro.com",
    // to:'joharibalti1996@gmail.com',
    subject: "Plant Purchase Request from Customer",
    text: `
Hi! Good News for you following customer is interested to buy Plant,
Name:            ${req.body.name}
Email:           ${req.body.email} 
Plant Name:      ${req.body.plant}`,
  };
  try {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    return res.status(200).json({
      message: "Mailed successfully!",
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error !",
    });
  }
};
