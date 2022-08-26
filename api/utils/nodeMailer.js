exports.mailSend = function (emailFrom, emailSend, sujet, content, callback) {
    const nodemailer = require("nodemailer");
    const { MAIL_SERVICE, MAIL_USER, MAIL_PASSWORD } = process.env;

    var transporter = nodemailer.createTransport({
        service: MAIL_SERVICE,
        auth: {
            user: MAIL_USER,
            pass: MAIL_PASSWORD
        },
        
    });

    var mailOptions = {
        from: emailFrom,
        to: emailSend,
        subject: sujet,
        html: content
    };

    transporter.sendMail(mailOptions, function (err, info) {
        transporter.close();
        if (err) {
            callback(err, info);
        }
        else {
            callback(null, info);
        }
    });
}
