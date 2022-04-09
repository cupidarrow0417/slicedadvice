import nodemailer from "nodemailer";

/**
 * Send an email using the gmail SMTP server
 * @param {any} options - {
 */
const sendEmail = async (options: any) => {
    /* Creating a transporter object that will be used to send emails. */
    let transporter = nodemailer.createTransport({
        service: "Gmail",
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: process.env.GMAIL_DEFAULT_EMAIL,
            clientId: process.env.OAUTH2_CLIENT_ID,
            clientSecret: process.env.OAUTH2_CLIENT_SECRET,
            refreshToken: process.env.OAUTH2_REFRESH_TOKEN
        },
    });

    const mailOptions = {
        from: process.env.GMAIL_DEFAULT_EMAIL, // sender address
        to: options.email, // list of receivers
        subject: options.subject, // Subject line
        html: options.message, // plain text body
    };

    await transporter.sendMail(mailOptions);
};

export default sendEmail;
