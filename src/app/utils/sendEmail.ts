
import nodemailer from "nodemailer" ;
import config from "../config";

export const sendEmail = async (to : string , html : string) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: config.nodeEnv === "production", // true for port 465, false for other ports
        auth: {
          user: "kazirihatul@gmail.com",
          pass: "ygxv iwhk gkyo rugb",
        },
    });

    await transporter.sendMail({
        from: 'kazirihatul@gmail.com', // sender address
        to, // list of receivers
        subject: "Reset your password within 10 mins !", // Subject line
        text: "", // plain text body
        html, // html body
    });
}
