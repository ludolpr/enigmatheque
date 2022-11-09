require("dotenv").config();
const transporter = require("../utils/nodeMailer");
const { MAIL_USER } = process.env;
// ----------------------------------------------------------------------- //
// ---------------------------NODEMAILER VISITEUR------------------------- //
// ----------------------------------------------------------------------- //

(mailVisiteur = async (req, res) => {
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
        zz;
        callback(null, info);
      }
      transporter.close();
    }
  );

  res.render("home", { flash: "E-mail envoyé" });
}),
  // ----------------------------------------------------------------------- //
  // ------------------------NODEMAILER REPLY------------------------------- //
  // ----------------------------------------------------------------------- //

  (mailReply = async (req, res) => {
    const { content, sujet, email } = req.body;
    console.log("mail envoyé", req.body);
    // le transporte serf a se connec er a notre boite mail
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
    );
    // res.render("back", { flash: "E-mail envoyé" }); // mon res.render me renvoie dans une page admin bizarre
    res.redirect("/admin");
  });

// ----------------------------------------------------------------------- //
// -----------------------------EXPORTS MODULE---------------------------- //
// ----------------------------------------------------------------------- //
module.exports = { mailReply, mailVisiteur };
