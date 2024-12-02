import nodemailer from "nodemailer";

let transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "kevinqt4you@gmail.com",
    pass: "ngirjfllkniufchq",
  },
}); //transporter object will going to be an email sending object

export default transporter;
