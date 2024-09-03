const express = require('express')

// controller methods
const {
    getBestScores,
    getGuesses,
    deleteGuesses,
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
router.get('/likely/:id', getBestScores)

// DELETE a guess
router.delete('/:id', deleteGuesses)

// POST a guess
router.post('/', createGuess)


//////////////////////////////////////////////////////////////////

module.exports = router

