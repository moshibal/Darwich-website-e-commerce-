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
    this.url = url;
    this.from = `<Grooveandvibes Dance Studio <${process.env.EMIAL_FROM}>`;
  }
  createTransport() {
    if (process.env.NODE_ENV === "production") {
      //sendgrid
      return nodemailer.createTransport({
        service: "SendGrid",
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD,
        },
      });
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
  async send(subject) {
    //define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html: this.message,
      text: convert(this.message),
    };
    //create a tranport and send email
    await this.createTransport().sendMail(mailOptions);
  }
  async sendBooking() {
    await this.send("Booking comfirmation");
  }
  async sendWelcome() {
    await this.send(welcomeTemplete, "Welcome to Darwich Family!");
  }
  async sendForgetPassword() {
    await this.send(basetemplete, "Your password reset, only valid for 10 min");
  }
}

export default Email;
