const express = require('express')
const bodyParser = require('body-parser')
const admin = require('firebase-admin')
const newman = require('newman')

const app = express()
const port = process.env.port || 3001

const swaggerSettings = require('./swaggerSettings.json')
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const specs = swaggerJsdoc(swaggerSettings)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(
    '/docs',
    swaggerUi.serve,
    swaggerUi.setup(specs, {
        explorer: true,
    })
)
app.get('/docs')

// Load credentials from firebase
const serviceAccount = require('./serviceAccountKey.json')
const { query } = require('express')

// Create the firebase connection
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:
        'firebase-adminsdk-1vnku@ifixit-ad-server-edd98.iam.gserviceaccount.com',
})

const missingDataError = (item) => {
    return {
        error: `${item} does not exist`,
        errorCode: 404
    }
}

const serverError = {
    error: `Internal Server Error`,
    errorCode: 503
}


// Initialize our DB
const db = admin.firestore()

//Get the campaign information
app.get('/campaign', async (req, res) => {
    try {
        //We gather the whole campaign collection and return a list of campaign objects
        const campaignRef = db.collection('campaign')
        if (req.query.title) {
            const title = req.query.title
            const queryRef = await campaignRef.where('title', '==', title).get()
            matches = []
            queryRef.forEach((doc) => {
                matches.push(doc.data())
            })
            res.status(200).send(matches)
            return
        }

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
    } catch (e) {
        console.error(e)
        res.status(503).send({ error: 'Internal server error', errorCode: 503 })
    }
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
            res.status(404).send(missingDataError('campaign'))
        }
        const campaign = campaignSnapshot.data()
        res.status(200).send(campaign)
    } catch (e) {
        res.status(500).send(serverError)
    }
})

app.get('/ad', async (req, res) => {
    try {
        //We gather the whole ads collection and return a list of ad objects
        const adRef = db.collection('ads')
        if (req.query.title) {
            const title = req.query.title
            const queryRef = await adRef.where('title', '==', title).get()
            const matches = []
            queryRef.forEach((doc) => {
                matches.push(doc.data())
            })
            res.status(200).send(matches)
            return
        }
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

        res.status(200).send(adData)
    } catch (e) {
        console.error(e)
        res.status(503).send({ error: 'Internal server error', errorCode: 503 })
    }
})

//Edits data with given resposne data and campaignID
app.put('/campaign/:id', async (req, res) => {
    //We get the campaignID from the request and replace the old data with the new.
    try {
        const campaignDoc = db.collection('campaign').doc(req.params.id)
        const campaignExists = await campaignDoc.get()
        if (!campaignExists.exists) {
            res.status(404).send({
                error: 'Campaign does not exist',
                errorCode: 404,
            })
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
        res.status(503).send({ error: 'Improper data inputs', errorCode: 503 })
    }
})

//Creates data with given resposne data and adId
app.post('/campaign', async (req, res) => {
    try {
        const campaignDoc = db.collection('campaign')
        if (!req.body.campaignData) {
            res.status(400).send({ error: 'Body is missing field: campaignData', errorCode: 400 })
            return
        }
        const doc = await campaignDoc
            .add(req.body.campaignData)
            .then((campaign) => {
                console.log(
                    `Succesfully created campaign ${campaign.id}`
                )
                return campaign
            })
            .catch((err) => {
                console.log(err)
            })
        res.status(200).send({id: doc.id})
    } catch (e) {
        console.log(e)
        res.status(500).send({ error: 'Improper data inputs', errorCode: 503 })
    }
})

//Edits data with given resposne data and adId
app.put('/ad/:id', async (req, res) => {
    try {
        const adDoc = db.collection('ads').doc(req.params.id)
        const ad = await adDoc.get()
        if (!ad.exists) {
            res.status(404).send(missingDataError('Ad'))
            return
        }
        if (req.body.impression || req.body.clicked) {
            let impressions = ad.impressions
            if (!impressions) {
                impressions = {
                    seen: 0,
                    clicks: 0,
                    ctr: 0
                }
            }
            if (req.body.impression) {
                impressions.seen += 1
            }
            if (req.body.clicked) {
                impressions.clicks += 1
            }
            impressions.ctr =
                impressions.clicks !== 0
                    ? impressions.clicks / impressions.seen
                    : 0
            req.body.adData = {...req.body.adData, ...impressions}
        }
        await adDoc
            .set(req.body.adData)
            .then(console.log(`Succesfully modified ad ${req.body.adId}`))
            //Catches error in the case api request fails
            .catch((err) => {
                console.log(err)
            })
        res.status(200).send('Success')
    } catch (e) {
        console.log(e)
        res.status(503).send({ error: 'Return this', errorCode: 503 })
    }
})

//Creates data with given resposne data and adId
app.post('/ad', async (req, res) => {
    try {
        if (!req.body.adData) {
            res.status(400).send({ error: 'Body is missing field: adData', errorCode: 400 })
            return
        }
        const adDoc = db.collection('ads')
        const doc = await adDoc
            .add(req.body.adData)
            .then((ad) => {
                    console.log(`Succesfully created ad ${ad.id}`)
                    return ad
                }
            )
            //Catches error in the case api request fails
            .catch((err) => {
                console.log(err)
            })
        res.status(200).send({id: doc.id})
    } catch (e) {
        console.error(e)
        res.status(503).send({ error: 'Internal Server Error', errorCode: 503 })
    }
})

/**
 * Deletes an ad with a specified ID
 */
app.delete('/ad/:id', async (req, res) => {
    try {
        const docId = req.params.id
        const adDoc = db.collection('ads').doc(docId)
        const adExists = await adDoc.get()
        if (!adExists.exists) {
            res.status(404).send({ error: 'Ad does not exist', errorCode: 404 })
        }
        await adDoc
            .delete()
            .then(console.log(`Succesfully deleted ${docId}`))
            //Catches error in the case api request fails
            .catch((err) => {
                console.log(err)
            })
        res.status(200).send('Success')
    } catch (e) {
        res.status(500).send({ error: 'Error retreiving info', errorCode: 503 })
    }
})

app.delete('/campaign/:id', async (req, res) => {
    try {
        const docId = req.params.id
        const adDoc = db.collection('campaign').doc(docId)
        const adExists = await adDoc.get()
        if (!adExists.exists) {
            res.status(404).send({error: `campaign with id ${docId} does not exist`, errorCode: 404 })
            return
        }
        await adDoc
            .delete()
            .then(console.log(`Succesfully deleted ${docId}`))
            //Catches error in the case api request fails
            .catch((err) => {
                console.log(err)
            })
        res.status(200).send('Success')
    } catch (e) {
        res.status(500).send({ error: 'Error retreiving info', errorCode: 503 })
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
            res.status(404).send({error: ''})
        }
        const ad = adSnapshot.data()
        res.status(200).send(ad)
    } catch (e) {
        res.status(500).send({ error: 'Error retrieving ad info' })
    }
})

app.post('/user/create', async (req, res) => {
    admin
        .auth()
        .createUser(req.body)
        .then(function (userRecord) {
            // See the UserRecord reference doc for the contents of userRecord.
            console.log('Successfully created new user:', userRecord.uid)
            res.status(200).send(userRecord)
        })
        .catch(function (error) {
            res.status(500).send({
                error: 'Cannot create user',
                errorCode: 503,
            })
            console.log('Error creating new user:', error)
        })
})

//Automated postman test, runs everystime when server start
newman.run(
    {
        collection: require('./postman.json'),
        reporters: 'cli',
    },
    function (err) {
        if (err) {
            throw err
        }
        console.log('collection run complete!')
    }
)

app.listen(port, () => {
    console.log(`Alpha Team Ad Server listening on port ${port}`)
})
