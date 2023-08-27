import nodemailer from "nodemailer";
import { convert } from "html-to-text";

class Email {
  constructor(user, message, isAdmin = false) {
    this.isAdmin = isAdmin;
    this.message = message;
    this.to = user.email;
    this.from = process.env.EMIAL_FROM;
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
      to: this.isAdmin ? this.from : this.to,
      subject,
      html: this.message,
      text: convert(this.message),
    };
    //create a tranport and send email
    await this.createTransport().sendMail(mailOptions);
  }

  async sendBooking() {
    await this.send("Booking Confirmation");
  }
  async sendRegistration() {
    await this.send("Registration Confirmation");
  }
  async sendClassUpdate() {
    await this.send("Class Update");
  }
}

export default Email;
