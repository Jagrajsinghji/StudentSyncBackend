const nodemailer = require('nodemailer');
const Userdetails = require('../models/userdetails');

exports.sendEmail = async (req, res) => {

    // Get the base URL dynamically
    const baseUrl = `${req.protocol}://${req.get('host')}`;

    const userdetails = await Userdetails.findById(req.params.id);
    console.log(userdetails);
    const userId = userdetails.id;
    console.log(userId);

    try{
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.mailgun.org",
            port: 587,
            auth: {
              user: "postmaster@sandboxb1e1d44671304f88b610a76dca3f042f.mailgun.org",
              pass: "40de706419f68e3000e2b015cc49465d-8c9e82ec-8509fcc7",
            },
          });
         

        const confirmationEmailHTML = `
            Please confirm your email address by clicking the button below.
            We may need to send you critical information about our service, and it is important that we have an accurate email address.
            <br><br>
            <a href="${baseUrl}/email/verify/${userId}" style="background-color: #008CBA; color: #ffffff; padding: 10px 20px; text-decoration: none; display: inline-block; border-radius: 5px;">Confirm Email Address</a><br><br>

            <br><br><br><br>
            — The StudentSync
        `;

          // send mail with defined transport object
          let info = await transporter.sendMail({
            from: 'foo@sandboxb1e1d44671304f88b610a76dca3f042f.mailgun.org',
            to: "aprily.ca2022@gmail.com",
            subject: 'StudentSync Verification Email : Action Required',
            html: confirmationEmailHTML,
          });
         
          console.log("Message sent: %s", info.messageId);
          res.status(299).send("Message sent successfully!",);
        }catch (error) {
            console.log("Error:", error);
            res.status(500).send(error);
        }

}

exports.verifyEmail = async (req, res) => {
    try {
        const userdetails = await Userdetails.findById(req.params.id);
        if (userdetails && !userdetails.user_status) {
            userdetails.user_status="1";
            await userdetails.save();
            res.status(200).send("Verified Successfully");
        }
        else if(userdetails && userdetails.user_status) {
            res.status(200).send("You have already verified.");
        }

      } catch (error) {
        res.status(500).send(error);
      }

}