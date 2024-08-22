const Commune = require('../../models/datalists/commune')

//const mongoose = require('mongoose')

// GET all communes

getCommunes = async (req, res) => {

    try {


        const response = await Commune.find({}).sort({ name:1 })

        if(!response){
            res.status(404).json({error: 'no such documents were found'})
        }
        
        res.status(200).json(response)
        console.log("getCommunes: successful")

    } catch (err) {
        res.status(404).json({error: err.message})
    }
}

module.exports = {
    getCommunes
}