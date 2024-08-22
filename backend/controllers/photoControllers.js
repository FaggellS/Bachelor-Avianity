// imports

const Photo = require('../models/photo')
const Guess = require('../models/guess')

const mongoose = require('mongoose')

const fs = require('fs')

const getLikelySpecies = require('./algorithms/getLikelySpecies')


///////////////////////////////////////////////////////////////////
////////////////////// METHOD DEFINTIONS //////////////////////////
///////////////////////////////////////////////////////////////////

// getPhotos - GET all photos 
// (id:none, body:none)
// (query: may have filters !)


getPhotos = async (req, res) => {
    console.log('Photo: GET all start')
    try {

        console.log(req.query)
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

                const guesses = await Guess.find({ photo_id: photo_id }) 

                const mostLikelySpecies = getLikelySpecies( guesses )

                if ( mostLikelySpecies.species.includes(species) ) {


                    selection.push(photo)
                }
            }
        }

        console.log('Photo: GET all stop: successful')
        res.status(200).json( selection )

    } catch (error) {
        console.error('Photo: GET all: an error occured: ' + error.message)
        res.status(400).json({ error: error.message })
    }
    
}

///////////////////////////////////////////////////////////////////

// getPhoto - GET a single photo
// (id:true, body:none)


getPhoto = async (req, res) => {
    console.log('Photo: GET one start')
    try {


        // fetch photo_id: 
        // it's found in the request address, so fetch it with req.params
        const { id: photo_id } = req.params
        console.log("id:")
        console.log(photo_id)

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
// (id:true, body:Photo)


updatePhoto = async (req, res) => {
    console.log('Photo: PATCH one start')
    try {

        const { is_classed:is_classed, delete_flags:delete_flags } = req.body
        const { id: photo_id } = req.params

        console.log("new del flags: ", delete_flags)

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


        console.log('Photo: PATCH one stop: successful')
        res.status(200).json({ response })

    } catch (error) {
        console.error('Photo: PATCH one: an error occured: ' + error.message)
        res.status(400).json({ error: error.message })
    }
}

///////////////////////////////////////////////////////////////////

// DELETE a photo
// (id:true, body:yes)

deletePhoto = async (req, res) => {
    console.log('Photo: DELETE one start')
    try {

        // fetch imagepath to unlink from files
        const { imagepath } = req.body
        console.log("imagepath:", imagepath)

        // fetch photo_id through req.params
        const { id: photo_id } = req.params

        // first unlink the image from file system
        fs.unlink(imagepath, (err) => {
            if (err) {
                throw Error(err.message)
            }

            console.log('file removed from images')
        })


        // if we delete the photo, we need to delete associated guesses as well !
        // mongoose query: deleteMany( condition(s) )
        const guess_response = await Guess.deleteMany( { photo_id: photo_id } )

        if ( !guess_response ) {
            throw Error('deletePhoto: deleteMany query did not succeed')
        }


        // if successful, find and delete Photo document
        // mongoose query: findOneAndDelete( id )
        const photo_response = await Photo.findOneAndDelete( { _id: photo_id } )

        if ( !photo_response ) {
            throw Error('deletePhoto: findOneAndDelete query did not succeed')
        }


        console.log('Photo: DELETE one stop: successful')
        res.status(200).json({ photo_response })

    } catch (error) {
        console.error('Photo: DELETE one: an error occured: ', error.message)
        res.status(400).json({ error: error.message })
    }
}
///////////////////////////////////////////////////////////////////

// DELETE all photos
// (id:none, body:none)

deletePhotos = async (req, res) => {
    console.log('Photo: DELETE all start')
    try {


        // find all photos and circle through to unlink
        // mongoose query: find({})
        const photos = await Photo.find({})

        if ( !photos ) {
            throw Error('deletePhotos: find query did not succeed')
        }

        photos.forEach( ( photo ) => {
            fs.unlink(photo.imagepath, (err) => {
                if (err) {
                    throw Error(err.message)
                }
            })
        })

        // if successful, delete all guesses
        // mongoose query: deleteMany({})
        const guess_response = await Guess.deleteMany({})

        if ( !guess_response ) {
            throw Error('deletePhotos: Guess.deleteMany query did not succeed')
        }

        // if successful, delete all photos
        // mongoose query: deleteMany({})
        const photo_response = await Photo.deleteMany({})

        if ( !photo_response ) {
            throw Error('deletePhotos: Photo.deleteMany query did not succeed')
        }


        console.log('Photo: DELETE all stop: successful')
        res.status(200).json({ state: "success" })

    } catch (error) {
        console.error('Photo: DELETE all: an error occured..')
        res.status(400).json({ error: error.message })
    }
}

///////////////////////////////////////////////////////////////////

// POST a photo
// (id:none, body:Photo)

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

        // should return the newly created document
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
    createPhoto,
    deletePhotos
}