const nodemailer = require("nodemailer");

module.exports.sendEmail = async (email, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.PASSWORD_USER,
      },
    });

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: subject,
      html: html,
    };

    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error("Send mail error: ", error);
  }
};
