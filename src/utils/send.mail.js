const nodemailer = require("nodemailer");

const sendEmail = async (mailOptions) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp-mail.outlook.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const info = await transporter.sendMail(mailOptions);
        console.log("Mail sent successfully:", info.response);
        return true;
    } catch (error) {
        console.log("Mail send error:", error);
        return false;
    }
};

module.exports = sendEmail;
