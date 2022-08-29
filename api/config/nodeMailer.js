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

// exports.mailSend = function (emailFrom, email, sujet, content, callback) {
//     const { MAIL_SERVICE, MAIL_USER, MAIL_PASSWORD } = process.env;

//     var transporter = nodemailer.createTransport({
//         service: MAIL_SERVICE,
//         auth: {
//             user: MAIL_USER,
//             pass: MAIL_PASSWORD
//         },
        
//     });

//     var mailOptions = {
//         from: emailFrom,
//         to: MAIL_USER,
//         subject: sujet,
//         html:
//         `<h1> Le mail du destinataire: ${email}</h1>
//         <h3> son message : ${content}</h3>`
//     };

//     transporter.sendMail(mailOptions, function (err, info) {
//         transporter.close();
//         if (err) {
//             callback(err, info);
//         }
//         else {
//             callback(null, info);
//         }
//     });
// }
