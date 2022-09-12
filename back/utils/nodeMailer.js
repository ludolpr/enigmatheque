require('dotenv').config()
const nodemailer = require("nodemailer");
const { MAIL_SERVICE, MAIL_USER, MAIL_PASSWORD } = process.env;
const transporter = nodemailer.createTransport({
    service: MAIL_SERVICE,
    auth: {
        user: MAIL_USER,
        pass: MAIL_PASSWORD
    },
    
});

module.exports = transporter
