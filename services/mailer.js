const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});
const sendMail = async ({ email, subject, htmlmsg }) => {
  const { messageId } = await transporter.sendMail({
    from: '"Achyut Adhikari" <raghavendra9816@email.com>', // sender address
    to: email, // list of receivers
    subject: subject, // Subject line
    html: htmlmsg, // html body
  });
  return messageId;
};
module.exports = { sendMail };
