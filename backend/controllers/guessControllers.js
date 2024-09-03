require('dotenv').config()
const Guess = require('../models/guess')

const getLikelySpecies = require('./algorithms/getLikelySpecies')


///////////////////////////////////////////////////////////////////
////////////////////// METHOD DEFINTIONS //////////////////////////
///////////////////////////////////////////////////////////////////

// getGuesses - GET all guesses 
// (query:maybe, body:none)

const getGuesses = async (req, res) => {
    console.log("Guess: GET all start")
    try {

        const { photo_id, user_id } = req.query
        let query = {}

        if ( photo_id ){
            query.photo_id = photo_id
        }

        if( user_id ){
            query.user_id = user_id  
        }

        response = await Guess.find(query)

        res.status(200).json(response)
        console.log("Guess: GET all stop: successful")

    } catch (error) {
        console.error('Guess: GET all: an error occured: ' + error.message)
        res.status(400).json({ error: error.message })
    }
}

///////////////////////////////////////////////////////////////////

// getBestScore - GET best scores at consensus
// (id:yes, body:none)

const getBestScores = async ( req, res ) => {
    console.log('Guess: GET best scores start')
    try {

        const { id:photo_id } = req.params

        const guesses = await Guess.find({ photo_id: photo_id})

        const response = getLikelySpecies( guesses )

        if (!response) {
            throw Error( 'GET best scores: algorithm did not succeed' )
        }

        // should return 2 lists of corresponding species-confidence pairs with the highest scores
        res.status(200).json( {species: response.species, confidence: response.conf} )  
        console.log('Guess: GET best scores stop: successful')

    } catch (error) {
        console.error('Guess: GET best scores: an error occured: ' + error.message)
        res.status(400).json({ error: error.message })
    }
}

///////////////////////////////////////////////////////////////////

// createGuess - DELETE all guesses for one photo
// (id:yes, body:none)

const deleteGuesses = async (req, res) => {
    console.log("Guess: DELETE photoGuesses start")
    try{

        const { id: photo_id } = req.params

        const response = await Guess.deleteMany({ photo_id: photo_id })


        if (!response) {
            throw Error('deleteGuesses: find query did not succeed')
        }


        res.status(200).json( response )
        console.log('Guess: DELETE photoGuesses stop: successful')

    } catch (error){
        console.error('Guess: DELETE photoGuesses: an error occured: ' + error.message)
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
        const { photo_id, species, certitude, user_id, status } = req.body

        // no field should be missing
        if ( !photo_id || !species || !certitude || !user_id || !status  ) {
            throw Error('No fields should be missing' )

        }

        const ponderation = status === "ordinary" ? 2 : 3.5

        // create the document
        const newGuess = new Guess({
            photo_id,
            species,
            certitude,
            user_id,
            ponderation
        })

        // save the document
        // mongoose save query
        const response = await Guess.create(newGuess)

        if ( !response ) {
            throw Error('createGuess: create query did not succeed')
        }
    
        res.status(200).json( response )
        console.log('Guess: POST one stop: successful')

    } catch (error) {
        console.error('Guess: POST one: an error occured: ' + error.message)
        res.status(400).json({ error: error.message })
    }
}

//////////////////////////////////////////////////////////////////



module.exports = {
    getBestScores,
    getGuesses,
    deleteGuesses,
    createGuess
}