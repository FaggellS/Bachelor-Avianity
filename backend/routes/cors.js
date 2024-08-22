const cors = require('cors')

const whitelist = ['https://avianity.onrender.com']

const corsOptionsDelegate = (req, callback) => {
    console.log("CORS !!")
    let corsOptions
    console.log("origin: ",req.header('Origin'))
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true }
    } else {
        corsOptions = { origin: false }
    }
    callback(null, corsOptions)
}


exports.cors = cors()
exports.corsWithOptions = cors(corsOptionsDelegate)