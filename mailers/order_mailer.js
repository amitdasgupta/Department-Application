const nodeMailer = require("../config/nodemailer");

// this is another way of exporting a method
exports.newOrderItem = (data) => {
  let htmlString = nodeMailer.renderTemplate({ data }, "/order_mailer.ejs");

  nodeMailer.transporter.sendMail(
    {
      from: process.env.username,
      to: process.env.vendor_email,
      subject: "Component out of stock",
      html: htmlString,
      cc: data.user.email,
    },
    (err, info) => {
      if (err) {
        console.log(`Error in sending email ${err}`);
        return;
      }
      console.log("Message sent", info);
      return;
    }
  );
};
