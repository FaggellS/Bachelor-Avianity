const Species = require('../../models/datalists/species')

//const mongoose = require('mongoose')

// GET all species

getSpecies = async (req, res) => {

    try {


        const response = await Species.find({}).sort({francais: 1})

        if(!response){
            res.status(404).json({error: 'no such documents were found'})
        }
        
        res.status(200).json(response)
        console.log("getSpecies: successful")

    } catch (err) {
        res.status(404).json({error: err.message})
    }
}

module.exports = {
    getSpecies
}