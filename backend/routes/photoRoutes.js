// imports
const express = require('express')
const multer = require('multer')
const router = express.Router()

// controller methods
const {
    getPhotos,
    getPhoto,
    updatePhoto,
    deletePhoto,
    createPhoto,
    deletePhotos
} = require('../controllers/photoControllers')

//////////////////////// MULTER THINGS ////////////////////////////

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'images/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '_' +  file.originalname);
    }
});

const upload = multer({ storage: storage })


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
router.post('/',  upload.single('image'), (req,res) => {
    console.log("pre create")
    createPhoto(req,res)
    console.log("post create")
})



// UNPROTECTED ROUTES


// dev route: DELETE all photos
router.delete('/', deletePhotos)

/////////////////////////////////////////////////////////////////

module.exports = router