
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

app.post('/ad/create', async (req, res) => {
    const docRef = db.collection('ads')
})

app.listen(port, () => {
    console.log(`Example listening on port ${port}`)
})