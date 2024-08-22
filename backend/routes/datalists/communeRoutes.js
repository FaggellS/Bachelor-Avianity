const express = require('express')

// controller methods
const {
    getCommunes
} = require('../../controllers/datalists/communeController')

const router = express.Router()

////////////////////////// ROUTE ///////////////////////////////

// GET all communes
router.get('/', getCommunes)





module.exports = router