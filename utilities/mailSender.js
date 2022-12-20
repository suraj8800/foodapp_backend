const nodemailer = require("nodemailer");
const secrets = require("../secrets");
async function mailSender(email, token) {
    // input through which mechanism send your email
    //  -> port, facilitator (technical details) 
    let transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        secure: true,
        auth: {
            user: secrets.APP_EMAIL,
            pass: secrets.APP_PASSWORD
        }
    });
    // let token= "shsjhshskkhd";
    let dataObj = {
        from: '"cult fit clone 👻" <foo@example.com>', // sender address
        to: email, // list of receivers
        subject: "Hello ✔ reset token" , // Subject line
        html: `<b> your reset is token ${token}?</b>`,
    }
    // send mail with defined transporter object
    let info = await transporter.sendMail(dataObj);
}
// mailSender(email, token)
//     .then(function () {
//         console.log("mail send successfully")
//     })
//     .catch(console.error);

module.exports = mailSender