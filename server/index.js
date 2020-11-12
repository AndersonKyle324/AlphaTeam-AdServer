
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

//Get ads associated with ad campaign
app.get('/campaign', async (req, res) => {
    //front end sends a campaignID and we will return a json object
    const docRef = db.collection('campaign').doc(req.body.campaignId);
    res.json(docRef);
})

//Get ad information
app.get('/ad', async (req, res) => {
    //front end sends adID and we will return a json object
    const docRef = db.collection('ads').doc(req.body.adId);
    res.json(docRef);
})

app.post('/ad/create', async (req, res) => {
    const docRef = db.collection('ads')
})

app.listen(port, () => {
    console.log(`Example listening on port ${port}`)
})