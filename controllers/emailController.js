const nodemailer = require('nodemailer');
const Userdetails = require('../models/userdetails');
const crypto = require('crypto');

require('dotenv').config()


const secretKey = process.env.SECRETE_KEY;


exports.sendEmailGrid = async (req, res) => {

  // Get the base URL dynamically
  const baseUrl = `${req.protocol}://${req.get('host')}`;

  const { email } = req.body;

  try{
    const existingUser = await Userdetails.findOne({ $or: [{ email }] });
    if(!existingUser){
      return res.status(404).send('Username not found');
    }

    const encryptedEmail = encryptEmail(email);
  
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
          host: "smtp.sendgrid.net",
          port: 587,
          auth: {
            user: 'apikey',
            pass: process.env.SENDGRID_API_KEY,
          },
        });
       

      const confirmationEmailHTML = `
          Please confirm your email address by clicking the button below.
          Thank you for registering, and it is important that we have an accurate email address.
          <br><br>
          <a href="${baseUrl}/email/verify/${encryptedEmail}" style="background-color: #008CBA; color: #ffffff; padding: 10px 20px; text-decoration: none; display: inline-block; border-radius: 5px;">
          Confirm Email Address</a>

          <br><br><br><br>
          — The StudentSync
      `;

        // send mail with defined transport object
        let info = await transporter.sendMail({
          from: 'yin.thu.aye0@gmail.com',
          to: email,
          subject: 'StudentSync Verification Email ',
          html: confirmationEmailHTML,
        });

        res.status(299).send("Message sent successfully!",);
      }catch (error) {

          res.status(500).send(error);
      }

}
exports.verifyEmail = async (req, res) => {
    try {
        const encryptedEmail = req.params.encryptedEmail;
        const decryptedEmail = decryptEmail(encryptedEmail);

        const user = await Userdetails.findOne({ email: decryptedEmail });

          if (user) {
            // User found 
  
            if (user.user_status) {
              //user status is false
              user.user_status="1";
              user.save();
              res.status(200).send("Verified Successfully");
            }
            else if(user.user_status) {
              //user status is true
                res.status(200).send("You have already verified.");
            }
          } else {
            // User not found
            res.status(404).send('Username not found');
          }

      } catch (error) {
        res.status(500).send(error);
      }

}

function encryptEmail(email) {
  const cipher = crypto.createCipher('aes-256-cbc', secretKey);
  let encrypted = cipher.update(email, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

function decryptEmail(encryptedEmail) {
  const decipher = crypto.createDecipher('aes-256-cbc', secretKey);
  let decrypted = decipher.update(encryptedEmail, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

