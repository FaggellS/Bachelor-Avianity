require('dotenv').config()

const express = require('express')

const app = express()

const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')

// ROUTE IMPORTS
const photoRoutes = require('./routes/photoRoutes')
const guessRoutes = require('./routes/guessRoutes')
const userRoutes = require('./routes/userRoutes')
const speciesRoutes = require('./routes/datalists/speciesRoutes')
const communeRoutes = require('./routes/datalists/communeRoutes')


// MIDDLEWARE

app.use( cors() )
app.use( express.json() )
app.use( (req, res, next) => {
    console.log('\nrequest PATH: ' + req.path + '\nrequest METHOD: ' + req.method)
    res.set('Access-Control-Allow-Origin', 'https://avianity.onrender.com')
    next()
})
app.use(express.static(path.join(__dirname, "build")))
app.use('/api/images', express.static(path.join(__dirname, 'images')))


// ROUTE HANDLERS
app.use('/api/photo', photoRoutes)
app.use('/api/guess', guessRoutes)
app.use('/api/user', userRoutes)
app.use('/api/species', speciesRoutes)
app.use('/api/commune', communeRoutes)


// DB CONNECTION AND LISTENING FOR REQUESTS
console.log("Server starting...")
mongoose.connect( process.env.MONGO_URI, { dbName: 'tb_mern' })
    .then( () => {

        app.listen( portNumber = process.env.PORT || 4000, () => {
            console.log('\nconnected to the database and listening on port ' + portNumber + "\n waiting for requests...\n\n")
        })

    })
    .catch( (err) => { console.log(err) })

