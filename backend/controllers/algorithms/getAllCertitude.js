// imports
const computeCertitude = require('./computeCertitude')


const getAllCertitude = ( guesses, allSpecies ) => {

    let species_list = []
    let certitude_list = []


    for (let species of allSpecies) {
        const cert = computeCertitude( guesses , species, allSpecies )

        species_list.push(species)
        certitude_list.push(cert)
    }

    return { species_list: species_list, certitude_list: certitude_list }
}

module.exports = getAllCertitude