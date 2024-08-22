// imports
require('dotenv').config()
const nodemailer = require('nodemailer')

////////////////////////////////////////////////////////////////////////////

// nodemailer logic
////////////////////////////////////////////////////////////////////////////

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASS
    }
})

const generateConfirmationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6
}

sendAccountConfirmation = (userEmail, confirmationCode) => {
    const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: userEmail,
        subject: 'Account confirmation !',
        text: `Welcome to our site ! Your confirmation code is: ${confirmationCode}`
    }

    transporter.sendMail(mailOptions, ( error, info ) => {
        if (error) {
            return console.log(error)
        }
        console.log('Email was successfully sent')
    })
}

sendPasswordReset = (userEmail, confirmationCode) => {
    const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: userEmail,
        subject: 'Reset Your Password',
        text: `To reset your account password, you will need to enter the following code: ${confirmationCode}`
    }

    transporter.sendMail(mailOptions, ( error, info ) => {
        if (error) {
            return console.log(error, info)
        }
        console.log('Email was successfully sent')
    })
}


sendRequestToAdmin = (fullname, id, mail, date) => {
    const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: process.env.EMAIL_ADDRESS,
        subject: 'User Status Request',
        text: `The following user asks for a status upgrade:\n
        Fullname: ${fullname}\n 
        id: ${id}\n
        mail: ${mail}\n
        Creation date: ${new Date(date).toLocaleDateString()}\n`
    }

    transporter.sendMail(mailOptions, ( error, info ) => {
        if (error) {
            return console.log(error, info)
        }
        console.log('Email was successfully sent')
    })
}

module.exports = {
    generateConfirmationCode,
    sendAccountConfirmation,
    sendPasswordReset,
    sendRequestToAdmin
}
////////////////////////////////////////////////////////////////////////////