// imports 
const mongoose = require('mongoose')

const Schema = mongoose.Schema

////////////////////////////////////////////////////////////////////////////

// SCHEMA
////////////////////////////////////////////////////////////////////////////

const communeSchema = new Schema( {
    postal_code: {
        type: String, required: true, unique: true
    },

    name: {
        type: String, required: true, unique: true
    },

    canton: {
        type: String, required: true, unique: true
    }
} )

module.exports = Commune = mongoose.model('commune', communeSchema)

////////////////////////////////////////////////////////////////////////////