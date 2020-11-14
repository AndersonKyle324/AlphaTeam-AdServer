
const express = require('express')
const admin = require('firebase-admin')

const app = express()
const port = process.env.port || 3000

// Load credentials from firebase
const serviceAccount = require('./serviceAccountKey.json')

// Create the firebase connection
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'firebase-adminsdk-1vnku@ifixit-ad-server-edd98.iam.gserviceaccount.com'
})

// Initialize our DB
const db = admin.firestore()

//Get the campaign information
app.get('/campaign', async (req, res) => {
    //We gather the whole campaign collection and return a list of campaign objects
    const campaignRef = db.collection('campaign');
    var campaignData = [];
    await campaignRef.get()
        .then(snapshot => {snapshot.forEach (doc => {
            campaignData.push(doc.data());
        })})
        //catching an error if api request fails
        .catch(err => {
            console.log(err);
        });

    res.json(campaignData);
})

//Get ad information
app.get('/ad', async (req, res) => {
    //We gather the whole ads collection and return a list of ad objects
    const adRef = db.collection('ads');
    var adData = [];
    await adRef.get()
        .then(snapshot => {snapshot.forEach (doc => {
            adData.push(doc.data());
        })})
        //catching an error if api request fails
        .catch(err => {
            console.log(err);
        });

    res.json(adData);
});

//Edits data with given resposne data and campaignID
app.put('/campaign/edit', async (req, res) => {
    //We get the campaignID from the request and replace the old data with the new.
    const campaignDoc = db.collection('campaign').doc(req.body.campaignId);
    await campaignDoc.set(req.body.campaignData)
               .then(console.log(`Succesfully edited data for ${req.body.campaignId}`))
               //Catches error in the case api request fails
               .catch(err => {
                   console.log(err);
               });
});

//Edits data with given resposne data and adId
app.put('/ad/edit', async (req, res) => {
    //We get the adID from the request and replace the old data with the new.
    const adDoc = db.collection('ad').doc(req.body.adId);
    await adDoc.set(req.body.adData)
               .then(console.log(`Succesfully edited data for ${req.body.adId}`))
               //Catches error in the case api request fails
               .catch(err => {
                   console.log(err);
               });
});

app.listen(port, () => {
    console.log(`Example listening on port ${port}`)
})