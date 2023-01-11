import nodemailer from "nodemailer";

import { convert } from "html-to-text";

const welcomeTemplete = `<h1>Darwich Meats and Co.</h1>\n
<p>Thank you for signing up and becoming the member of darwich family.
We promise that, we will be there to provide good quality meats all the time.</p>\n<span><a href="http://localhost:3000/products">sign in and do shoping</a></span>`;
const basetemplete = `<h1>Darwich Meats and Co.</h1>\n
<p>Thank you for signing up and becoming the member of darwich family.
We promise that, we will be there to provide good quality meats all the time.</p>`;

class Email {
  constructor(user, url, message) {
    this.message = message;
    this.to = user.email;
    this.firstName = user.name;
    this.url = url;
    this.from = `<Darwich Meats & Co <${process.env.EMIAL_FROM}>`;
  }
  createTransport() {
    if (process.env.NODE_ENV === "production") {
      //sendgrid
    }
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }
  async send(templete, subject) {
    let combinetemplete = "";
    if (this.message) {
      combinetemplete = basetemplete + this.message;
    }
    //define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html: combinetemplete.length > 0 ? combinetemplete : templete,
      text: convert(combinetemplete.length > 0 ? combinetemplete : templete),
    };
    //create a tranport and send email
    await this.createTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send(welcomeTemplete, "Welcome to Darwich Family!");
  }
  async sendForgetPassword() {
    await this.send(basetemplete, "Your password reset, only valid for 10 min");
  }
}

export default Email;
