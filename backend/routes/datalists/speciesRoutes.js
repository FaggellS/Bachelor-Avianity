const express = require('express')

// controller methods
const {
    getSpecies
} = require('../../controllers/datalists/speciesControllers')

const router = express.Router()

////////////////////////// ROUTE ///////////////////////////////

// GET all species
router.get('/', getSpecies)

// GET a single species
//router.get('/:id', getSpeciesID)



module.exports = router