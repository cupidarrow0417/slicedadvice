import nodemailer from "nodemailer";

interface DetailsInterface {
    email: string;
    subject: string;

    // HTML body in a string. Should be created by using one
    // of our email template functions in components/emailTemplates/
    htmlBody: string;

    // Should be the text contained in htmlBody, just without any of the HTML lol
    plainTextBody: string;
}

/**
 * Send an email using the gmail SMTP server
 * @param {any} options - {
 */
const sendEmail = async (details: DetailsInterface) => {
    // --- ETHEREAL TEST STUFF ---
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    // let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    // let transporter = nodemailer.createTransport({
    //     host: "smtp.ethereal.email",
    //     port: 587,
    //     secure: false, // true for 465, false for other ports
    //     auth: {
    //         user: testAccount.user, // generated ethereal user
    //         pass: testAccount.pass, // generated ethereal password
    //     },
    // });

    /* Creating a transporter object that is used to send the email. */
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

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: 'SlicedAdvice ' + process.env.GMAIL_DEFAULT_EMAIL, // sender address
        to: details.email, // list of receivers
        subject: details.subject, // Subject line
        html: details.htmlBody, // html body
        text: details.plainTextBody, // plain text body
    });

    console.log("Message sent: %s", info.messageId);
    // await transporter.sendMail(info);

    // --- ETHEREAL TESTING STUFF ---
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};

export default sendEmail;
