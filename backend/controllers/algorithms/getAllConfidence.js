// imports
const computeConfidence = require('./computeConfidence')


const getAllConfidence = ( guesses, allSpecies ) => {

    let species_list = []
    let confidence_list = []


    for (let species of allSpecies) {
        const cert = computeConfidence( guesses , species )

        species_list.push(species)
        confidence_list.push(cert)
    }

    return { species_list: species_list, confidence_list: confidence_list }
}

module.exports = getAllConfidence