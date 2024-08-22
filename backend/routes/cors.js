const cors = require('cors')

const whitelist = ['http://localhost:3000', 'http://localhost:5000', 'http://192.168.1.114:3000']

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