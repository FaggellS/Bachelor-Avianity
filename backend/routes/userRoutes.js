// imports
const express = require('express')

const router = express.Router()

//controller functions
const { 
    loginUser, 
    signupUser, 
    confirmUser ,
    getUser,
    sendReset,
    confirmReset,
    requestStatus
} = require('../controllers/userControllers')

////////////////////////// ROUTES ///////////////////////////////

router.get('/:id', getUser)

router.post('/reset', sendReset)

router.post('/reset/confirm', confirmReset)

router.post('/request-status/:id', requestStatus)

// log in route
router.post('/login', loginUser)

// sign up routes
router.post('/signup', signupUser)
router.post('/confirmation', confirmUser)

/////////////////////////////////////////////////////////////////

module.exports = router
