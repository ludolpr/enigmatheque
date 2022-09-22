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
        
        <h1>  Pour reset votre mot de passe : </h1>
        <br> 
        <a href="${process.env.DOMAIN}/resetpassword" style="display:inline-block;background-color:#000000;color:white;font-family:Helvetica Neue,sans-serif;font-size:16px;font-weight:700;line-height:120%;text-decoration:none;text-transform:none;border-radius:100px;box-sizing:border-box;margin:0;padding:10px 32px" rel="noreferrer" target="_blank" data-saferedirecturl="https://www.google.com/url?q=http://clicks.sorare.com/f/a/1ZPsQjLVf4lJx2fw2sZs4Q~~/AAAHagA~/RgRlC89QP0QhaHR0cHM6Ly9zb3JhcmUuY29tL2xvYmJ5L3VwY29taW5nVwVzcGNldUIKYyNQSiljS19Y7lIVZW9ndWFyZGlhbnNAZ21haWwuY29tWAQAAAFC&amp;source=gmail&amp;ust=1663915558713000&amp;usg=AOvVaw3HlTEOfUlHVkQ94gx8Xa54"> Cliquez-ici </a>
            
        `
    });
    transporter.close();
    // console.log('infoMail', infoMail)
    // On stock le mail dans la session visiteur
    req.session.email = email 
    // console.log(req.session);

    res.render('home', {
        flashResetPass: `Un mail vous a été envoyer à ${email}`
    })
}
// Action du formulaire de page resetPassword (password, confirmPassword)
exports.PutResetPassword = async (req, res) => {
    console.log('PutResetPassword', req.body)
    const { password, confirmPassword } = req.body
    // On récupère le mail dans la session
    const email = req.session.email

    if (!password || !confirmPassword) return res.redirect("/")
    if (password !== confirmPassword) return res.redirect("/")

    // On récupère les info user grace au mail
    const [user] = await db.query(
        `SELECT * FROM membres WHERE email="${email}"`)
    // On set notre mot de passe

    await db.query(`UPDATE membres SET password="${await bcrypt.hash(password, bcrypt_salt)}" WHERE email="${email}"`)

    res.render('home', {
        flash: `mot de passe modifier avec succes`
    })

}