import nodemailer from "nodemailer";
import dotenv from 'dotenv';

dotenv.config();
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass:process.env.EMAILPASS,
    },
  });
  function mailOptions(Email,link){
    return {
      from: process.env.EMAIL,
      to: Email,
      subject: 'Verification Code for Signup',
      text: `Your verification code is: ${link}`,
    }

  }


export{transporter,mailOptions};