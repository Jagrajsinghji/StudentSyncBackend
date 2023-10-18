const nodemailer = require('nodemailer');

// GET /email/send
exports.sendEmail = async (req, res) => {
    const { toEmail, subject, body } = req.body;

    // const transporter = nodemailer.createTransport({
    //     service: 'Gmail',
    //     auth: {
    //         user: 'yinthuaye.ca@gmail.com',
    //         pass: 'P@ssw0rd_ca',
    //     },
    // });
    const transporter = nodemailer.createTransport({
        service: 'Yahoo',
        auth: {
            user: 'yinthuaye.ca@yahoo.com',
            pass: 'idonottknow',
        },
    });

    const mailOptions = {
        from: 'yinthuaye.ca@yahoo.com',
        to: toEmail,
        subject: subject || 'Email Subject',
        text: body || 'Email Body',
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully');
        }
    });
};



