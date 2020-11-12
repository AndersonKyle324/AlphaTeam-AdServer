
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

app.get('/', async (req, res) => {
    // Sample call to the database, this will create a 'users' table with a person named 'alovelace'
    // this is ripped straight from the docs btw
    const docRef = db.collection('users').doc('alovelace')
    await docRef.set({
        first: 'Ada',
        last: 'Lovelace',
        born: 1815
    })
})

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
                impressions.clicked += 1
            }
            impressions.ctr = impressions.clicks !== 0
                ? impressions.seen / impressions.clicks
                : 0
            docRef.update({ impressions })
            res.sendStatus(200)
        }
    } catch (e) {
        res.status(500).send({ error: 'Error retrieving ad info' })
    }
})

app.listen(port, () => {
    console.log(`Example listening on port ${port}`)
})