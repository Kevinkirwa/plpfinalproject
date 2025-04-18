const nodemailer = require("nodemailer");

const sendMail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        service: process.env.SMTP_SERVICE,
        auth:{
            user: process.env.SMTP_MAIL_USER,
            pass: process.env.SMTP_MAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.SMTP_MAIL_USER,
        to: options.email,
        subject: options.subject,
        html: options.html || options.message,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendMail;