const admin = require('firebase-admin');
const Notification = require('../models/notification');
const app = (global.firebaseApp !== undefined) ? global.firebaseApp : admin.initializeApp({
        credential: admin.credential.cert({
            "type": "service_account",
            "project_id": "studentsync624",
            "private_key_id": "7cc8cbf2b8723e353f9444d616ea3a69dfba3b29",
            "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDBR7evjke03zEn\nKvk//dOGAdTHo2yb7K3cggkblAUwYS/4IBrPeOqNMhnpj/wqAIEAAeQ+BRFXn2ws\nvTPpBsM0ZdLdQZSSbZTqUtk6biWqxo7ntkNEwJPA3/gdfWe3F/sbDB4Y4xgvC++n\nlSEtR41sHjLIum5iP1rXduiAmtBsVsSQ/ooswG+NW9rMn2aFVo9jpbcnGcJs48It\nP8MYaqeM5fc1vRt457ZZdphfX9Jmbn9t4dFZR3s6SGCtdZuWDunROceqJk76j4C9\nz55QEo/OI/rChunklQXwnUjuKe1lRWGJXR6/EJoZ+IvcHcpHOvzTvdcQa8wKg3+o\n2fQSPLe9AgMBAAECggEAEzQceIli74IjgJhA9o4yJ4TkDsfagS2FYrzayc4tq85k\nNTt/XnDNoSTCtVWUgNnW91i4xD69p96ToWhVEYiV+Y1KY6hh6iCQJK4BnlAWVv7u\ncPBHg7u8knPOU6PDm8n6rYfJL8DUhMwjThu/lZ+f2gewFQiM8h8IWBMc67Y2EiVq\nXoAj9FtLauVDpRNy53+CdGsc9JR4Vs21XYIXurrPE49NGFgnaQ8+RQrW+wW7SoWM\ndHBeAibrjARk6WYsL4mtZBOtaloEL9JyAWNUpQOi2oNWgq5K2ySNFr4Mmgqz/8mm\nsMKtKczlQMNJD+KcjcJT7NutwtiIIl/iS8me7H8UUQKBgQD4acjk0KvtSYzqwIu2\nIJrdYkiaDIOHbUJoTFustfvSZlX7roanck42i4zY+oShgN9YI0eyEmCxnMhUV6ta\nChg0j76WyGLiIlDbiJyr5fv7N/UEF2JpxCv8BNh/L0xWHyfVuechAA/EaABPfaAY\nk3nDRDBJkbJJ5LGzt6fwz0sMhQKBgQDHLuAoOFAyrwh0Ow4CP+DyvYrmqiEJE8wK\nZQLIfRtQviB1k3ged8MP3PdooYzh+z9saGPjnZgSLHO5yBhkMdbdmkqO+zj5xqBZ\nnIuKyTg4Os7HQPriUYnCaj1kpLB+s8xrnWX+Mvr5hk8M47QHq2y1uuTJw5fV+JtC\njIhNDR8f2QKBgC3hG8Fm6NoCY4xX03Xnv7JznIUXGpPAkitBLw1O7xuE2wyIx0XV\nzqw0SecpHaXWb2mP2oYA7ure0gEB0BvpEV9jzQd8Kwco31YsfQMijs9vHkmLKBnw\nqU76diHHUon1Zx4KH63wnPjhXG1R/meLlUmDJofv6MXM/yT6HoJTRsEhAoGBALYw\n0GS5rdHOfKMkaVnxaCdg7K60q2cMLrTLVFJi7Rtb7YDelR75WPknmz6flqgWExts\nGQJYYoMtGeWze2waknk86joC3UjLQFz3bkRSbhQw5ncnntRo1ON6HhHy+mXKvI8q\n9+Iea6bWDXSyyzfAu7026JMNT9MuhYXH2dzwxalxAoGBAIX67+deFBIyoG8aYnA4\nwoL2dEWGP3B/6OWPAB0r03urKe/qx63xtJ8Gg+DlWaQEEXxg/iu12Ldag8onuhJa\n2PPC23sH6Eg0CmGc45+TnGGqUU3jRHIPsts5s/hfOogwtk8y8X35/4OouWcKIvee\nPEtscT7uOqwWzWXc5VA1S7ed\n-----END PRIVATE KEY-----\n",
            "client_email": "firebase-adminsdk-q20t7@studentsync624.iam.gserviceaccount.com",
            "client_id": "112795756440218309423",
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
            "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-q20t7%40studentsync624.iam.gserviceaccount.com",
            "universe_domain": "googleapis.com"
        }
        )
    });
global.firebaseApp = app;

// POST /noti
exports.createNoti = async (req, res) => {
    try {
        const dataFromReqBody = req.body;
        const newNoti = new Notification(dataFromReqBody);
        await newNoti.save();
        res.status(201).send(newNoti);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).send('Invalid format. Check your request Id value. ');
        }
        res.status(400).send(error);
    }
};

// POST /noti/userid
exports.getNotiByUser = async (req, res) => {

    try {
        const userid = req.params.userid;

        const notifications = await Notification.find({ userId : userid});

        if (notifications.length === 0) {
            return res.status(404).json({ message: "No notification found for this user." });
        }

        res.status(200).json(notifications);

    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).send('Invalid format. Check your request Id value. ');
        }
        res.status(500).send(error);
    }
}

//POST /notify
exports.notify = async (req, res) => {
    admin.messaging().send(req.body)
        .then((response) => {
            res.status(200);
            res.json({ "message": "sent notification" });
        })
        .catch((error) => {

            console.log(error);
            res.status(500);
            res.json({ error });
        });
}