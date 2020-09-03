const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');


admin.initializeApp();


let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'yashbhange888@gmail.com',
        pass: 'siddharth'
    }

});




exports.email = functions.database.ref('/')
    .onUpdate((snapshot, context) => {

        const After1 = snapshot.after.val();
        var Before = snapshot.before.val().user1.level;
        var After = After1.user1.level;






        var message1 = {

            to: After1.profile.email,
            from: 'yashbhange888@gmail.com',
            sender: 'Team Auto-Life',
            subject: "  ALERT !!! ",
            html: '<span> Hello </span>' +
                After1.profile.name + '<span>,<span>' + '<br/><br/><br/>' + '<hr>' + '<br/>' +
                '<span>Moisture Level : </span>' + After1.user1.moisture + '<br/><br/>' +
                '<span>Status &emsp; &emsp; &emsp;: </span>' + After1.user1.status + '<br/><br/>' +
                '<span>Mode &emsp; &emsp; &ensp; &emsp;: </span>' + After1.user1.mode + '<br/><br/>' + '<hr>' +
                '<br/><br/><br/><br/><br/>' + '<p align="right"> <b>From</b> &ensp; &ensp; &ensp;</p>' + '<p align="right"> <b>Team Auto-Life</b></p>'







        };

        if (Before !== After) {
            return transporter.sendMail(message1, function(erro, info) {
                if (erro) {
                    console.log(erro);
                } else {
                    console.log("email sent successfully" + info.response);
                }

            });

        } else {
            return console.log("email else part  executed");
        }





    });




exports.notification = functions.database.ref('/user1')
    .onUpdate((snapshot, context) => {
        var After1 = snapshot.after.val();
        const temptoken = After1.token;

        var Before = snapshot.before.val().level;
        var After = After1.level;
        var msgbody = "Moisture Level " + After + " Threshold";

        var message = {
            notification: {
                title: '   AlERT !!!  ',
                body: msgbody
            },
            token: temptoken
        };

        if (Before !== After) {

            admin.messaging().send(message).then((response) => {
                    console.log("Message sent successfully:", response);
                    return response;
                })
                .catch((error) => {
                    console.log("Error sending message: ", error);
                });

        } else {
            return console.log("Notification else part");
        }


    });


exports.addMessage = functions.https.onRequest(async(req, res) => {
    // Grab the text parameter.
    //const original = req.query.text;
    // Push the new message into Cloud Firestore using the Firebase Admin SDK.
    //const writeResult = await admin.firestore().collection('messages').add({ original: original });
    // Send back a message that we've succesfully written the message
    // res.json({ result: `Message with ID: ${writeResult.id} added.` });
    console.log("3rd fucntion call");
    res.end();
});