// imports
const express = require('express')
const router = express.Router()
const upload = require('../utils/uploadToCloudinary')

// controller methods
const {
    getPhotos,
    getPhoto,
    updatePhoto,
    deletePhoto,
    createPhoto
} = require('../controllers/photoControllers')


//////////////////// MIDDLEWARE FOR PROTECTED ROUTES /////////////////////////////

// require authorization for all document modifications
const requireAuth = require('../middleware/requireAuth')
router.use(requireAuth)


const cors = require('./cors')
router.use(cors.corsWithOptions)

////////////////////////// ROUTES ///////////////////////////////


// PROTECTED ROUTES


// GET all photos
router.get('/all',  getPhotos)


// GET a single photo
router.get('/:id', getPhoto)



// PATCH a photo
router.patch('/:id',  upload.single('image'), updatePhoto)

// DELETE a photo
router.delete('/:id', upload.single('image'), deletePhoto)

// POST a photo
router.post('/',  upload.single('image'), createPhoto)


/////////////////////////////////////////////////////////////////

module.exports = router