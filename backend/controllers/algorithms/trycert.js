const computeCertitude = require('./computeCertitude')


const guesses = [
{species:"merle", confidence:80, ponderation:2}, 
{species:"corbeau", confidence:80, ponderation:2}, 
{species:"merle", confidence:50, ponderation:2}, 
{species:"merle", confidence:40, ponderation:2}, 
{species:"merle", confidence:90, ponderation:2}, 
{species:"merle", confidence:90, ponderation:2}, 


]

const species = "merle"

const result = computeCertitude(guesses, species)
console.log("RESULT: ", result)