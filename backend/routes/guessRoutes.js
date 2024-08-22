const express = require('express')

// controller methods
const {
    getBestCert,
    getGuesses,
    createGuess
} = require('../controllers/guessControllers')

const router = express.Router()


//////////////////// MIDDLEWARE FOR PROTECTED ROUTES /////////////////////////////

// require authorization for all document modifications
const requireAuth = require('../middleware/requireAuth')
router.use(requireAuth)

////////////////////////// ROUTES ///////////////////////////////

// GET all guesses with filters
router.get('/all', getGuesses)

// GET three best Certitude degree for a photo
router.get('/likely/:id', getBestCert)

// POST a guess
router.post('/', createGuess)


//////////////////////////////////////////////////////////////////

module.exports = router

