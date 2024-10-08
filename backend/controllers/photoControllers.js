// imports

const Photo = require('../models/photo')
const Guess = require('../models/guess')

const mongoose = require('mongoose')

const fs = require('fs')

const {removeImage} = require('../utils/uploadToCloudinary')

const getLikelySpecies = require('./algorithms/getLikelySpecies')


///////////////////////////////////////////////////////////////////
////////////////////// METHOD DEFINTIONS //////////////////////////
///////////////////////////////////////////////////////////////////

// getPhotos - GET all photos 
// (query:maybe, body:none)


getPhotos = async (req, res) => {
    console.log('Photo: GET all start')
    try {

        const { status, species } = req.query
        let query = {}
        let selection = []

        // if there is a status filter, add it to the filter query
        if ( status ){
            query.is_classed = (status === 'classed' ? true : false )
        }

        // mongoose find query
        response = await Photo.find(query)

        if (!response) {throw Error(!response)}

        selection = response

        // if there is a species filter, FOR EACH PHOTO
        // loop through the guesses and obtain the list of confidence degrees
        // loop through the list and fetch the first 3 highest confidence degrees
        // retain only the photos whose "most likely species" list contains the desired species
        if ( species ){
            selection = []

            for (let photo of response) {

                const guesses = await Guess.find({ photo_id: photo._id }) 

                const mostLikelySpecies = getLikelySpecies( guesses )

                if ( mostLikelySpecies.species.includes(species) ) {

                    selection.push(photo)

                }
            }
        }

        res.status(200).json( selection )
        console.log('Photo: GET all stop: successful')

    } catch (error) {
        console.error('Photo: GET all: an error occured: ' + error.message)
        res.status(400).json({ error: error.message })
    }
    
}

///////////////////////////////////////////////////////////////////

// getPhoto - GET a single photo
// (query:yes, body:none)


getPhoto = async (req, res) => {
    console.log('Photo: GET one start')
    try {

        // fetch photo_id: 
        // it's found in the request address, so fetch it with req.params
        const { id: photo_id } = req.params

        // is it a valid mongoose id:
        if(!mongoose.Types.ObjectId.isValid( photo_id )){
            throw Error('No such id was found')
        }

        // mongoose query: findById( id )
        const response = await Photo.findById( {_id: photo_id} )

        if (!response) {
            throw Error('getPhoto: findById query did not succeed' )
        }

        res.status(200).json({ response })
        console.log('Photo: GET one stop: successful')


    } catch (error) {
        console.error('Photo: GET one: an error occured: ' +  error.message)
        res.status(400).json({ error: error.message })
    }
}

///////////////////////////////////////////////////////////////////

// updatePhoto - PATCH a photo
// (id:yes, body:yes)


updatePhoto = async (req, res) => {
    console.log('Photo: PATCH one start')
    try {

        const { is_classed:is_classed, delete_flags:delete_flags } = req.body
        const { id: photo_id } = req.params

        if ( !photo_id || !is_classed  ){
            throw Error('No field should be missing')
        }

        let del_flags = []
        if(delete_flags){
            del_flags = delete_flags
        }

        const response = await Photo.findOneAndUpdate(
            { _id: photo_id }, 
            { is_classed: is_classed, delete_flags: del_flags }, 
            { new: true })

        if(!response){
            throw Error ('updatePhoto: findOneAndReplace query did not succeed')
        }

        res.status(200).json({ response })
        console.log('Photo: PATCH one stop: successful')

    } catch (error) {
        console.error('Photo: PATCH one: an error occured: ' + error.message)
        res.status(400).json({ error: error.message })
    }
}

///////////////////////////////////////////////////////////////////

// DELETE a photo
// (id:yes, body:yes)

deletePhoto = async (req, res) => {
    console.log('Photo: DELETE one start')
    try {

        // fetch imagepath to unlink from files
        const { imagepath } = req.body

        // fetch photo_id through req.params
        const { id: photo_id } = req.params

        // first remove the image from cloud
        removeImage(imagepath)

        // if successful, find and delete Photo document
        // mongoose query: findOneAndDelete( id )
        const response = await Photo.findOneAndDelete( { _id: photo_id } )

        if ( !response ) {
            throw Error('deletePhoto: findOneAndDelete query did not succeed')
        }

        res.status(200).json({ response })
        console.log('Photo: DELETE one stop: successful')

    } catch (error) {
        console.error('Photo: DELETE one: an error occured: ', error.message)
        res.status(400).json({ error: error.message })
    }
}

///////////////////////////////////////////////////////////////////

// POST a photo
// (id:none, body:yes)

const createPhoto = async (req, res) => {
    console.log('Photo: POST one start')
    try {

        // retreive all properties for a photo
        const { location, date, user_id } = req.body
        const imagepath = req.file.path
        
        // no field should be missing
        if ( !imagepath || !location || !date || !user_id  ) {
            throw Error( 'No fields should be missing' )
        } else {
        console.log("  Photo: POST one: request body: ", imagepath, location, date, user_id)
        }


        // create the document
        const newPhoto = new Photo({
            imagepath,
            location,
            date,
            isclassed: false,
            delete_flags: [],
            user_id: user_id
        })

        // save the document
        // mongoose save query
        const response = await Photo.create(newPhoto)

        if ( !response ) {
            throw Error('createPhoto: save query did not succeed')
        }

        res.status(200).json( response )
        console.log('Photo: POST one stop: successful')

    } catch (error) {
        console.error('Photo: POST one: an error occured: ' + error.message)
        res.status(400).json({ error: error.message })
    }
    
}
///////////////////////////////////////////////////////////////////

module.exports = {
    getPhotos,
    getPhoto,
    updatePhoto,
    deletePhoto,
    createPhoto
}