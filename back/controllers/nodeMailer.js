require("dotenv").config()
const transporter = require("../utils/nodeMailer"),
{ MAIL_USER } = process.env
// ----------------------------------------------------------------------- //
// ---------------------------NODEMAILER---------------------------------- //
// ----------------------------------------------------------------------- //
const mail = async (req, res) => {
    const { content, sujet, email } = req.body;
    console.log("mail envoyé", req.body);

    transporter.sendMail(
        {
            from: MAIL_USER,
            to: MAIL_USER,
            subject: sujet,
            html: `
            <h1> Le mail du destinataire: ${email}</h1>
            <h3> son message : ${content}</h3>
        `,
        },
        (err, info) => {
            if (err) {
                callback(err, info);
            } else {
                callback(null, info);
            }
            transporter.close();
        }
    );

}
// ----------------------------------------------------------------------- //
// ------------------------NODEMAILER REPLY------------------------------- //
// ----------------------------------------------------------------------- //

const mailReply = async (req, res) => {
    const { content, sujet, email } = req.body;
    console.log("mail envoyé", req.body);

    transporter.sendMail(
        {
            from: MAIL_USER,
            to: email,
            subject: `Enigmatheque + ${sujet}`,
            html: `
            <h2> Réponse de l'administrateur : ${content}</h2>
        `,
        },
        (err, info) => {
            if (err) {
                callback(err, info);
            } else {
                callback(null, info);
                // db.query(`DELETE FROM messages WHERE id=${id}`)
            }
            transporter.close();
        }
    )
    res.redirect("/");

};

// ----------------------------------------------------------------------- //
// -----------------------------EXPORTS MODULE---------------------------- //
// ----------------------------------------------------------------------- //
module.exports = { mail, mailReply}