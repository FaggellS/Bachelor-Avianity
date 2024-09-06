const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const multer = require('multer')

// configuring
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

// define multer storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'images',
  },
})

function getPublicIdFromUrl(url) {
  const parts = url.split('/');  
  const lastPart = parts.pop();  
  const publicId = lastPart.split('.')[0];  // get the extension out
  return 'images/' + publicId;  
}

function removeImage(url) {
  const publicId = getPublicIdFromUrl(url)
  cloudinary.uploader.destroy(publicId, (error, result) => {
    if (error) {
      console.error('Could not delete:', error);
    }
  });
}

// export funct
const upload = multer({ storage: storage })

module.exports = { upload, removeImage}