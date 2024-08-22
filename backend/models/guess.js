require('dotenv').config()
const mongoose = require('mongoose')

const Schema = mongoose.Schema

////////////////////////////////////////////////////////////////////////////

// SCHEMA
////////////////////////////////////////////////////////////////////////////

const guessSchema = new Schema( {

    photo_id: { 
        type:String, 
        required: true 
    },

    species: {
        type: String, 
        required: true
    },

    confidence: {
        type: Number,
        required: true
    },

    ponderation: {
        type: Number,
        required: true
    },

    user_id: {
        type: String,
        required: true
    }

}, { timestamps: true })

module.exports = mongoose.model('Guess', guessSchema)


////////////////////////////////////////////////////////////////////////////
