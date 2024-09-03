//imports
const getAllSpecies = require('./getAllSpecies')
const getAllConfidence = require('./getAllConfidence')

//     GET LIKELY SPECIES       ////////////////////////////////////////


const getLikelySpecies = function ( guesses ) {
    try {

        const allSpecies = getAllSpecies( guesses )

        const { species_list, confidence_list } = getAllConfidence( guesses, allSpecies )


        let i = []



        if (species_list.length >= 3){
                
            let cl = [...confidence_list]

            i[0] = cl.indexOf(Math.max(...cl))
            cl[i[0]] = -1

            i[1] = cl.indexOf(Math.max(...cl))
            cl[i[1]] = -1

            i[2] = cl.indexOf(Math.max(...cl))

            return {
                species: [species_list[i[0]], species_list[i[1]], species_list[i[2]]],
                conf: [confidence_list[i[0]], confidence_list[i[1]], confidence_list[i[2]]]
            }

        } else if (species_list.length === 2) {

            let cl = [...confidence_list]

            i[0] = cl.indexOf(Math.max(...cl))
            cl[i[0]] = -1

            i[1] = cl.indexOf(Math.max(...cl))

            return {
                species: [species_list[i[0]], species_list[i[1]]],
                conf: [confidence_list[i[0]], confidence_list[i[1]]]
            }

        } else if (species_list.length === 1) {
            return {
                species: species_list,
                conf: confidence_list
            }
        } else { throw Error("There should be at least one species..") }
    } catch (err) {
        throw Error( err.message )
    }

    
}

module.exports = getLikelySpecies