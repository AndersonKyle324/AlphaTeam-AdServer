const express = require('express')
const bodyParser = require('body-parser')
const admin = require('firebase-admin')

const app = express()
const port = process.env.port || 3000

const swaggerSettings = require('./swaggerSettings.json')
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const specs = swaggerJsdoc(swaggerSettings)
app.use('/docs', swaggerUi.serve)
app.get(
    '/docs',
    swaggerUi.setup(specs, {
        explorer: true,
    })
)

// Load credentials from firebase
const serviceAccount = require('./serviceAccountKey.json')

// Create the firebase connection
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:
        'firebase-adminsdk-1vnku@ifixit-ad-server-edd98.iam.gserviceaccount.com',
})

// Initialize our DB
const db = admin.firestore()

//Get the campaign information
app.get('/campaign', async (req, res) => {
    //We gather the whole campaign collection and return a list of campaign objects
    const campaignRef = db.collection('campaign')
    var campaignData = []
    await campaignRef
        .get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                campaignData.push(doc.data())
            })
        })
        //catching an error if api request fails
        .catch((err) => {
            console.log(err)
        })

    res.json(campaignData)
})

/**
 * Gets information for a specific campaign
 */
app.get('/campaign/:id', async (req, res) => {
    try {
        const campaignId = req.params.id
        const docRef = db.collection('campaign').doc(campaignId)
        const campaignSnapshot = await docRef.get()
        if (!campaignSnapshot.exists) {
            res.status(404).send({
                error: 'campaign does not exist',
                errorCode: 404,
            })
        }
        const campaign = campaignSnapshot.data()
        res.status(200).send(campaign)
    } catch (e) {
        res.status(500).send({
            error: 'Error retriving ad info',
            errorCode: 503,
        })
    }
})

app.get('/ad', async (req, res) => {
    //We gather the whole ads collection and return a list of ad objects
    const adRef = db.collection('ads')
    var adData = []
    await adRef
        .get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                adData.push(doc.data())
            })
        })
        //catching an error if api request fails
        .catch((err) => {
            console.log(err)
        })

    res.json(adData)
})

//Edits data with given resposne data and campaignID
app.put('/campaign/edit', async (req, res) => {
    //We get the campaignID from the request and replace the old data with the new.
    try {
        const campaignDoc = db.collection('campaign').doc(req.body.campaignId)
        const campaignExists = await campaignDoc.get()
        if (!campaignExists.exists) {
            throw new Error('Campaign does not exist')
        }
        await campaignDoc
            .set(req.body.campaignData)
            .then(
                console.log(
                    `Succesfully edited data for ${req.body.campaignId}`
                )
            )
            //Catches error in the case api request fails
            .catch((err) => {
                console.log(err)
            })
        res.status(200).send('Success')
    } catch (e) {
        res.status(500).send({ error: 'Improper data inputs', errorCode: 503 })
    }
})

//Creates data with given resposne data and adId
app.put('/campaign/create', async (req, res) => {
    try {
        const campaignDoc = db.collection('campaign').doc(req.body.campaignId)
        await campaignDoc
            .set(req.body.campaignData)
            .then(
                console.log(
                    `Succesfully edited data for ${req.body.campaignId}`
                )
            )
            .catch((err) => {
                console.log(err)
            })
        res.status(200).send('Success')
    } catch (e) {
        res.status(500).send({ error: 'Improper data inputs', errorCode: 503 })
    }
})

//Creates data with given resposne data and adId
app.put('/ad/create', async (req, res) => {
    try {
        const adDoc = db.collection('ads').doc(req.body.adId)
        await adDoc
            .set(req.body.adData)
            .then(console.log(`Succesfully created data for ${req.body.adId}`))
            //Catches error in the case api request fails
            .catch((err) => {
                console.log(err)
            })
        res.status(200).send('Success')
    } catch (e) {
        res.status(500).send({ error: 'Improper data inputs', errorCode: 503 })
    }
})

//Edits data with given resposne data and adId
app.put('/ad/edit', async (req, res) => {
    //We get the adID from the request and replace the old data with the new.
    try {
        const adDoc = db.collection('ads').doc(req.body.adId)
        const adExists = await adDoc.get()
        if (!adExists.exists) {
            throw new Error('Ad does not exist')
        }
        await adDoc
            .set(req.body.adData)
            .then(console.log(`Succesfully edited data for ${req.body.adId}`))
            //Catches error in the case api request fails
            .catch((err) => {
                console.log(err)
            })
        res.status(200).send('Success')
    } catch (e) {
        res.status(500).send({ error: 'Improper data inputs', errorCode: 503 })
    }
})

app.delete('/ad/delete', async (req, res) => {
    try {
        const adDoc = db.collection('ads').doc(req.body.adId)
        const adExists = await adDoc.get()
        if (!adExists.exists) {
            throw new Error('Ad does not exist')
        }
        await adDoc
            .delete()
            .then(console.log(`Succesfully deleted ${req.body.adId}`))
            //Catches error in the case api request fails
            .catch((err) => {
                console.log(err)
            })
        res.status(200).send('Success')
    } catch (e) {
        res.status(500).send({ error: 'Error retreiving info', errorCode: 503 })
    }
})

app.get('/ad/search', async (req, res) => {
    try {
        const title = req.query.title
        const adRef = db.collection('ads')
        const queryRef = await adRef.where('title', '==', title).get()
        finalData = []
        queryRef.forEach((doc) => {
            finalData.push(doc.data())
        })
        res.status(200).send(finalData)
    } catch (e) {
        console.log(e)
        res.status(500).send({ error: 'Error retrieving search info' })
    }
})

/**
 * Gets information for a specific add. If any flags are added to the URL it may also
 * update the impressions related to a given add.
 */
app.get('/ad/:id', async (req, res) => {
    try {
        const docId = req.params.id
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
            impressions.ctr =
                impressions.clicks !== 0
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
