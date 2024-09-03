const cors = require('cors')

const whitelist = [process.env.PROD_PROXY]

const corsOptionsDelegate = (req, callback) => {
    let corsOptions
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true }
    } else {
        corsOptions = { origin: false }
    }
    callback(null, corsOptions)
}


exports.cors = cors()
exports.corsWithOptions = cors(corsOptionsDelegate)