const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const dotenv = require('dotenv')
dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb' }));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
})

function sendEmail({ recipient, confirmation }) {

    return new Promise((resolve, reject) => {
        transportObject = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'ecartxvstore@gmail.com',
                pass: 'ytmschqgaiyncsxn'
            }
        });

        console.log(recipient);
        console.log(confirmation)

        const mailConfig = {
            from: 'ecartxvstore@gmail.com',
            to: recipient,
            subject: 'Expense Tracker',
            text: `Do Not share the OTP \n The Confirmation OTP is : ${confirmation}\n\n\n Thanks for visiting.\nRegards`//Message actually
        };

        transportObject.sendMail(mailConfig, (error, info) => {
            if (error) {
                console.log(error);
                return reject({ message: 'An error has occured' })
            }
            return resolve({ message: 'Successfully Sent' })
        })
    })
}

app.post('/send_email', (req, res) => {
    console.log(req.body)
    sendEmail(req.body).then(res => res.send())
        .catch(e => res.send());
});
app.listen(PORT, () => console.log('listening on PORT:' + PORT))