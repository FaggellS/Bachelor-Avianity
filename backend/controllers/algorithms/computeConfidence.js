//     COMPUTE Confidence       ////////////////////////////////////////

const computeConfidence = function ( guesses, species, species_total=179 ) {
    try{

        let numerator = 0
        let denominator = 0

        guesses.forEach( (elem) => {

            const cert = (elem.certitude * elem.ponderation)
            if (elem.species === species){

                numerator +=  cert
                denominator +=  cert
            } else {

                denominator += cert
            }
        })

        let conf = numerator / denominator

        if (conf == 0){ conf = 0.000001 }
        return conf
        
    } catch (err) {throw new Error(err)}
}

module.exports = computeConfidence