// imports
require('dotenv').config()

const User = require('../models/user')

const jwt = require('jsonwebtoken')

///////////////////////// JWT FUNCT ///////////////////////////////

// token function
const createToken = ( _id ) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn:'3d' })
}

///////////////////////////////////////////////////////////////////
////////////////////// METHOD DEFINTIONS //////////////////////////
///////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////
// loginUser - POST a login request
//
const getUser = async(req, res) => {
    try{
        const {id: user_id} = req.params
        const response = await User.findById( user_id )

        res.status(200).json(response)


    } catch (err) {
        console.error(err.message)
        res.status(400).json({error: err.message})
    }
}

///////////////////////////////////////////////////////////////////
// loginUser - POST a login request
//
const requestStatus = async(req, res) => {
    console.log("User: requestStatus start")
    try {

        const { id: user_id} = req.params

        const { fullname } = req.body
        const user = await User.findById( user_id )

        const response = await User.sendRequest( user, fullname )

        if (!response){
            throw Error("problem here")
        }

        res.status(200).json({response: true})
        console.log("User: requestStatus stop: successful")

    } catch (err) {
        console.error("User: requestStatus: an error occurred: " + err.message)
        res.status(400).json({error:err.message})
    }
}

///////////////////////////////////////////////////////////////////
// loginUser - POST a login request
//
const sendReset = async (req, res) => {
    console.log("User: sendReset start")
    try {
        const {email} = req.body

        const response = await User.resetCode(email)

        if (!response) {
            throw Error('User: sendReset: static method did not succeed')
        }

        // returns the user mail
        res.status(200).json( response )
        console.log("User: sendReset stop: successful")


    } catch (err) {
        console.error("User: sendReset: an error occurred: " + err.message)
        res.status(400).json({error:err.message})
    }
}

///////////////////////////////////////////////////////////////////
// loginUser - POST a login request
//
const confirmReset = async (req, res) => {
    console.log("User: confirmReset start")
    try {
        const { email, code, password} = req.body

        const response = await User.resetConfirm(email, code, password)

        if (!response){
            throw Error("User: confirmReset: static method problem")
        }

        const user_id = response._id
        const username = response.username

        //create a token
        const token = createToken(user_id)

        // returns: user id, username, email, token
        res.status(200).json({user_id, username, email, token})
        console.log("User: confirmReset stop: successful")


    } catch (err) {
        console.error("User: confirmReset: an error occurred: " + err.message)
        res.status(400).json({error:err.message})
    }
}

///////////////////////////////////////////////////////////////////
// loginUser - POST a login request
//
const loginUser = async (req, res) => {
    console.log("User: LoginUser start")
    try {

        // destructure the request body
        const { email, password } = req.body
        console.log("   User: LoginUser - email: ", email)
        
        // await static login function: It checks if credentials are correct
        // if correct, returns the user document
        const response = await User.login(email, password)

        // response is either a user or an error, if empty it's another problem though
        if(!response){
            const msg = 'There was an error with static login'
            console.error(msg)
            throw Error(msg)
        }

        // if response is ok, we retreive user id and create a token with it
        user_id = response._id
        username = response.username

        //create a token
        const token = createToken(user_id)

        // return the user id, username, mail and token
        res.status(200).json({user_id, username, email, token})
        console.log("User: LoginUser stop: successful")

    } catch (error){
        console.log("User: LoginUser: an error occured: " + error.message)
        res.status(400).json({error: error.message})
    }
}


///////////////////////////////////////////////////////////////////
// signupUser - POST a signup request
//
const signupUser = async (req, res) => {
    console.log("User: SignupUser start")
    try {

        // destructure the request body
        const { email, username, password } = req.body
        console.log("   User: signupUser - request mail: ", email)
        
        /*
        await static signup function:
            - it checks if credentials are correct
            - if so, generate a confirmation code and store user credentials until we get a response
        */
        // if correct, returns the user email only
        const response = await User.signup(email, username, password)

        // response is either an email or an error, if empty it's another problem though

        if (!response) {
            throw Error('signupUser: static signup did not succeed')
        }

        // returns the user mail
        res.status(200).json( response )
        console.log("User: SignupUser stop: successful")
        

    } catch (error){
        console.error("User: SignupUser: an error occured: " + error.message)
        res.status(400).json({error: error.message})
    }
}

///////////////////////////////////////////////////////////////////
// confirmUser - POST a confirm signup request
//
const confirmUser = async (req, res) => {
    console.log("User: ConfirmUser start")
    try {

        // destructure the request body
        const { email, code } = req.body
        console.log("   User: confirmSignupUser - request: ", email, code)
        
        /*
        await static confirmSignup function:
            if code is correct, it creates a new user document
        */
        // if correct, returns the new user document
        const response = await User.confirmSignup(email, code)

        // response is either a new user or an error, if empty it's another problem though
        if(!response){
            const msg = 'There was an error with static confirmSignup'
            console.error(msg)
            throw Error( msg )
        }

        // if ok, retreive the new user id and create a token with it
        const user_id = response._id
        const username = response.username

        //create a token
        const token = createToken(user_id)

        // returns: user id, username, email, token
        res.status(200).json({user_id, username, email, token})

        console.log("User: ConfirmUser stop: successful")

    } catch (error){
        console.log("User: ConfirmUser: an error occured: " + error.message)
        res.status(400).json({error: error.message})
    }
}


///////////////////////////////////////////////////////////////////
module.exports = { loginUser, signupUser, confirmUser, 
    getUser, sendReset, confirmReset, requestStatus }