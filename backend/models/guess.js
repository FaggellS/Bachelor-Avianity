require('dotenv').config()
const mongoose = require('mongoose')

const Schema = mongoose.Schema

////////////////////////////////////////////////////////////////////////////

// SCHEMA
////////////////////////////////////////////////////////////////////////////

const guessSchema = new Schema( 
    {
        species: {
            type: String, required: true
        },

        certitude: {
            type: Number, required: true
        },

        ponderation: {
            type: Number, required: true
        },

        photo_id: { 
            type:String,  required: true 
        },

        user_id: {
            type: String, required: true
        }

    }, { timestamps: true }
)










module.exports = mongoose.model('Guess', guessSchema)


////////////////////////////////////////////////////////////////////////////
