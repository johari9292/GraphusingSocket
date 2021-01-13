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
Name:            ${req.params.name}
Email:           ${req.params.email} 
Plant Name:      ${req.params.plant}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
