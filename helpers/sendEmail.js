const nodemailer = require("nodemailer");
require("dotenv").config();

const {META_PASSWORD} = process.env;

const nodemailerConfig = {
    host: "smtp.meta.ua",
    port: 465,
    secure: true,
    auth: {
        user: "lukyianenko.a.a@meta.ua",
        pass: META_PASSWORD
    }
}

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
    const email = { ...data, from: "lukyianenko.a.a@meta.ua"};
    await transport.sendMail(email)
    return true;
}

module.exports = sendEmail;
