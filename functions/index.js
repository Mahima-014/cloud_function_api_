// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

exports.getFeedbacks = functions.https.onRequest((req, res) => {
    var feedbacks = [];
    var db = admin.firestore();
    db.collection("feedbacks").get().then(snapshot => {
        snapshot.forEach(doc => {
            var element = {
                "id": doc.id,
                "name": doc.data().name,
                "email": doc.data().email,
                "feedback": doc.data().feedback
            }
            feedbacks = feedbacks.concat(element);
        });
        res.send(feedbacks)
        return "";
    }).catch(reason => {
        res.send(reason)
    })
});
