// imports 
const mongoose = require('mongoose')

const Schema = mongoose.Schema

////////////////////////////////////////////////////////////////////////////

// SCHEMA
////////////////////////////////////////////////////////////////////////////

const speciesSchema = new Schema( {
    artid: {
        type: String, required: true, unique: true
    },

    euringid: {
        type: String, required: true, unique: true
    },

    english: {
        type: String, required: true, unique: true
    },

    deutsch: {
        type: String, required: true, unique: true
    },

    francais: {
        type: String, required: true, unique: true
    }

} )

module.exports = Species = mongoose.model('species', speciesSchema)

////////////////////////////////////////////////////////////////////////////