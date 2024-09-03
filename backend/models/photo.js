// imports
const mongoose = require('mongoose')

const Schema = mongoose.Schema

////////////////////////////////////////////////////////////////////////////

// SCHEMA
////////////////////////////////////////////////////////////////////////////

const photoSchema = new Schema(
    {   
        imagepath: { type: String, required:true },

        location: { type: String, required: true },

        date: { type: String, required: true },

        is_classed: { type: Boolean, default: false },

        delete_flags: [{ type: String }],
    
        user_id: { type: String, required: true }
        
    }, { timestamps: true }
)

module.exports = mongoose.model('Photo', photoSchema)

////////////////////////////////////////////////////////////////////////////