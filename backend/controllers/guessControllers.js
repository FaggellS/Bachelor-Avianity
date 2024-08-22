require('dotenv').config()

const Guess = require('../models/guess')

const mongoose = require('mongoose')
const getLikelySpecies = require('./algorithms/getLikelySpecies')


///////////////////////////////////////////////////////////////////
////////////////////// METHOD DEFINTIONS //////////////////////////
///////////////////////////////////////////////////////////////////

const getGuesses = async (req, res) => {
    try {
        console.log("getstart")
        const { photo_id, user_id } = req.query
        let query = {}

        if ( photo_id ){
            query.photo_id = photo_id
        }

        if( user_id ){
            query.user_id = user_id  
        }

        response = await Guess.find(query)
        console.log("getend")
        res.status(200).json(response)



    } catch (error) {
        console.error('Guess: GET all: an error occured: ' + error.message)
        res.status(400).json({ error: error.message })
    }
}


// getBestCert - GET all guesses 
// (id:none, body:none)

const getBestCert = async (req, res ) => {

    console.log('Guess: GET best start')
    try {

        const { id:photo_id } = req.params
        const guesses = await Guess.find({ photo_id: photo_id})
        const response = getLikelySpecies( guesses )
        

        if (!response) {
            res.status(404).json({ error: 'getGuesses: find query did not succeed' })
        }


        // operations should've been a success
        console.log('Guess: GET best stop: successful')

        // should return a list of all guess documents
        res.status(200).json( {species: response.species, cert: response.cert} )

    } catch (error) {
        console.error('Guess: GET best: an error occured: ' + error.message)
        res.status(400).json({ error: error.message })
    }
}

///////////////////////////////////////////////////////////////////

// createGuess - POST a guess
// (id:none, body:yes)

const createGuess = async (req, res ) => {
    console.log('Guess: POST one start')
    try {

        // fetch all properties to create a guess
        const { photo_id, species, confidence, user_id, status } = req.body

        // no field should be missing
        if ( !photo_id || !species || !confidence || !user_id || !status  ) {
            throw Error('No fields should be missing' )

        }

        const ponderation = status === "ordinary" ? 2 : 3.5

        // create the document
        const newGuess = new Guess({
            photo_id,
            species,
            confidence,
            user_id,
            ponderation
        })

        // save the document
        // mongoose save query
        const response = await Guess.create(newGuess)

        if ( !response ) {
            throw Error('createGuess: create query did not succeed')
        }

        // operations should've been a success
        console.log('Guess: POST one stop: successful')
    
        // should return the new document
        res.status(200).json( response )

    } catch (error) {
        console.error('Guess: POST one: an error occured: ' + error.message)
        res.status(400).json({ error: error.message })
    }
}

//////////////////////////////////////////////////////////////////



module.exports = {
    getBestCert,
    getGuesses,
    createGuess
}