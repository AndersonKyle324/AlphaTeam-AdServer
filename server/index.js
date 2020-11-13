
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

/**
 * Gets information for a specific add. If any flags are added to the URL it may also
 * update the impressions related to a given add.
 */
app.get('/ad/:id', async (req, res) => {
    try {
        const docId = req.params.id;
        const docRef = db.collection('ads').doc(docId)
        const adSnapshot = await docRef.get()
        if (!adSnapshot.exists) {
            throw new Error('BROKEN')
        }
        const ad = adSnapshot.data()
        if (req.query.impression || req.query.clicked) {
            const impressions = ad.impressions
            if (req.query.impression) {
                impressions.seen += 1
            }
            if (req.query.clicked) {
                impressions.clicks += 1
            }
            impressions.ctr = impressions.clicks !== 0
                ? impressions.clicks / impressions.seen
                : 0
            docRef.update({ impressions })
        }
        res.status(200).send(ad)
    } catch (e) {
        res.status(500).send({ error: 'Error retrieving ad info' })
    }
})

app.listen(port, () => {
    console.log(`Example listening on port ${port}`)
})