

const getAllSpecies = ( guesses ) => {

    let allSpecies = []

    for (let guess of guesses) {
        let alreadyIn = false

        for (species of allSpecies){
            if (species === guess.species){ alreadyIn = true }
        }

        if ( alreadyIn === false){ allSpecies.push(guess.species) }
    }

    return allSpecies
}

module.exports = getAllSpecies