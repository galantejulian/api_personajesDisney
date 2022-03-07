const { createTransport } = require("nodemailer");

var transport = createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,

    }
});

module.exports = { transport };