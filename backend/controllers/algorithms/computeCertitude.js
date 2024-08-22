//     COMPUTE CERTITUDE       ////////////////////////////////////////


const computeCertitude = function ( guesses, species, list_species ) {
    try{

        let conf_for_species = 0
        let conf_else = 0

        guesses.forEach( (elem) => {


            // if this entry's species is the target species: add up the conf
            if (elem.species.trim() === species){

                conf_for_species +=  (elem.confidence * elem.ponderation)

            // else, add it to the conf_else
            } else {

                // add to conf else:
                conf_else += (elem.confidence * elem.ponderation)
            }
        })

        // simple mean :
        // add a little degree (1) for each species that have no entry for statistical representation
        const  dividende = conf_for_species
        const  divisor = conf_for_species + conf_else + ((process.env.NR_SPECIES - list_species.length) * 2)
   
        try{
            let cert = dividende / divisor
            console.log("species: " + species + ", certitude: " + cert)
    
            if (cert == 0){cert = 0.000001}
    
            return cert
        } catch (err2) { throw new Error(err2) }
        
    } catch (err) {throw new Error(err)}

}

module.exports = computeCertitude