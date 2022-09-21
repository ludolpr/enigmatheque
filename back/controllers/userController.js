require("dotenv").config();
const bcrypt = require('bcrypt');
const bcrypt_salt = 10;
const transporter = require("../utils/nodeMailer")
const jwt = require('jsonwebtoken');



/*
 * Reset Password
 * ************** */
// Page Formulaire resetPassword (lien du mail)
exports.GetResetPassword = (req, res) => {
    console.log('GetResetPassword', req.body)
    res.render('resetPassword')
}
// Action du formulaire de la page connexion (email)
exports.PostResetPassword = async (req, res) => {
    console.log('PostResetPassword', req.body)
    const { email } = req.body;

    // Envoie du mail
    const infoMail = await transporter.sendMail({
        from: `Enigmatheque e-mail : ${process.env.MAIL_USER}`,
        to: email,
        subject: 'Reset de votre mot de passe',
        html: `
            <h2>Cliquer sur le lien pour accèder au reset password</h2>
            <a href='${process.env.DOMAIN}/resetpassword'> > Clikez ici < </a>
        `
    });
    transporter.close();
    console.log('infoMail', infoMail)
    
    // On stock le mail dans la session visiteur
    
    req.session.user = { email }

    res.render('home', {
        flashResetPass: `Un mail vous a été envoyer à ${email}`
    })
}
// Action du formulaire de page resetPassword (password, confirmPassword)
exports.PutResetPassword = async (req, res) => {
    console.log('PutResetPassword', req.body)
    const { password, confirmPassword } = req.body
    // On récupère le mail dans la session
    const { email } = req.session.user

    if (!password || !confirmPassword) return res.redirect("/")
    if (password !== confirmPassword) return res.redirect("/")

    // On récupère les info user grace au mail
    const [ user ] = await db.query(
        `SELECT * FROM membres WHERE email="${email}"`)
    // On set notre mot de passe

    await db.query(`UPDATE membres SET password="${await bcrypt.hash(password, bcrypt_salt)}" WHERE email="${email}"`)

    res.render('home', {
        flash: `success`
    })

}