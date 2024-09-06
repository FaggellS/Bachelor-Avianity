// imports

const mongoose = require('mongoose')

const bcrypt = require('bcrypt')
const validator = require('validator')

const unconfirmedUsers = new Map();
const unconfirmedPswd = new Map();

const {
    generateConfirmationCode,
    sendAccountConfirmation,
    sendPasswordReset,
    sendRequestToAdmin
} = require('../utils/nodemailerLogic')


////////////////////////////////////////////////////////////////////////////

// SCHEMA
////////////////////////////////////////////////////////////////////////////

const Schema = mongoose.Schema

let userSchema = new Schema({

    email: {
        type: String,
        required: true,
        unique: true
    },

    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    member_status: {
        type: String,
        default: "unconfirmed",
        index:true
    }

}, {timestamps: true})

userSchema.index({createdAt: 1}, {
    expireAfterSeconds: 60, 
    partialFilterExpression: {member_status: 'unconfirmed'} 
})


////////////////////////////////////////////////////////////////////////////

// STATIC METHODS
////////////////////////////////////////////////////////////////////////////
userSchema.statics.sendRequest = async function (user, fullname){
    
    if(!user || !fullname){
        throw Error("missing fields")
    }

    sendRequestToAdmin(fullname, user._id, user.email, user.createdAt)
    return true
}


userSchema.statics.resetCode = async function(email){
    if (!email){
        throw Error('An Email is required')
    }

    // check if email exists
    const exists = await this.findOne( { email:email.toString() } )

    if (!exists){
        throw Error('Email could not be found')
    }


    const confirmationCode = generateConfirmationCode( )
    sendPasswordReset(email, confirmationCode)

    unconfirmedPswd.set(email, { confirmationCode })

    return email

}

userSchema.statics.resetConfirm = async function(email, code, password){

    const placeholder = unconfirmedPswd.get(email)

    if (placeholder.confirmationCode.trim() !== code.trim()) {
        throw Error('Invalid confirmation code')
    } else {
        console.log("here we salt")
        const salt = await bcrypt.genSalt(charLength=10)
        const hash = await bcrypt.hash(password, salt)

        const response = await this.findOneAndUpdate({email: email}, {password: hash}, {returnNewDocument: true})

        if(!response) {
            throw Error('User could not be verified')
        }

        unconfirmedUsers.delete(email)

        return response
    }
}


//     STATIC LOGIN METHOD       ////////////////////////////////////////

userSchema.statics.login = async function( email, password ) {
    
    // validation
    if (!email || !password){
        throw Error('All fields must be filled')
    }

    // check first if email already exists
    // mongoose query: findOne by email
    const response = await this.findOne( { email } )
    
    if (!response){
        throw Error('Email could not be found')
    }

    if(response.member_status === "unconfirmed"){
        throw Error('Account does not seem to be verified')
    }

    // compare password with the one we stored
    const match = await bcrypt.compare( password, response.password )

    if (!match) {
        throw Error('Incorrect password')
    }

    return response
}

////////////////////////////////////////////////////////////////////////////
//     STATIC SIGNUP METHOD       ////////////////////////////////////////

userSchema.statics.signup = async function ( email, username, password ) {

    // validation
    if (!email || !username || !password){
        throw Error('All fields must be filled')
    }

    if (!validator.isEmail(email)){
        throw Error('Email is not valid')
    }

    if (!validator.isStrongPassword(password, {minLowercase: 1, minUppercase: 1, minNumbers: 1})){
        let str = 'Password is not strong enough. Your password needs at least: '
        let need = ''
        if ( validator.isAlpha(password) ){ need = need.concat('1 number, ') }
        if ( validator.isNumeric(password) ){ need = need.concat('1 letter, ') }
        if ( validator.isAlpha(password) && validator.isLowercase(password) ){ need = need.concat('1 uppercase letter, ') }
        if ( validator.isAlpha(password) && validator.isUppercase(password) ){ need = need.concat('1 lowercase letter, ') }

        if ( need.length === 0 ){ need = need.concat('1 special character ') }
    
        throw Error(str.concat(need).slice(0, -2)) 
    }

    // check if email already exists
    const exists = await this.findOne( { email:email.toString() } )

    if (exists){
        throw Error('Email already in use')
    }

    //doesn't exist and inputs are valid, so we:
    /*
        - hash and salt password
        - store credentials
        - send confirmation mail and wait for the answer
    */
    // hash password

    const salt = await bcrypt.genSalt(charLength=10)
    const hash = await bcrypt.hash(password, salt)



    const user = new this( 
        { 
        email: email, 
        username: username, 
        password: hash, 
        member_status:'unconfirmed' 
        }
    )

    const response = await this.create(user)

    // generate code
    const confirmationCode = generateConfirmationCode( )
    sendAccountConfirmation(email, confirmationCode)

    unconfirmedUsers.set(email, { confirmationCode })

    // returns email
    return email

}


////////////////////////////////////////////////////////////////////////////
//     STATIC CONFIRM SIGNUP METHOD       ////////////////////////////////

userSchema.statics.confirmSignup = async function( email, code ) {

    const placeholder = unconfirmedUsers.get(email)

    if (placeholder.confirmationCode.trim() !== code.trim()) {
        throw Error('Invalid confirmation code')
    } else {
        
    // code confirmed, so we create the user and delete the placeholder from unconfirmedUser!


    const response = await this.findOneAndUpdate(
        {email: email}, 
        {member_status: 'ordinary'}, 
        {returnNewDocument: true})

    if(!response) {
        throw Error('User could not be verified')
    }

    unconfirmedUsers.delete(email)

    // return new user document
    return response

    }

}

module.exports = mongoose.model('User', userSchema)

////////////////////////////////////////////////////////////////////////////