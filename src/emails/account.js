const sgMail = require('@sendgrid/mail')
const { getMaxListeners } = require('../models/user')

//const sendgridAPIKey = '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'

sgMail.setApiKey(process.env.SEND_GRID_API_KEY)

const sendWelcomEmail = (email,name) =>{ 

    sgMail.send({
        to: email,
        from:'aravindauth100@gmail.com',
        subject:'Welcome to the app!',
        text:`Welcome to the ${name},aravind.Let me know how you get along with the app`
    })
}

const sendCancelEmail = (email,name)=>{
    sgMail.send({
        to:email,
        from:'aravindsrisai100@gmail.com',
        subject:'Sorry to see you go',
        text: `Goodbye, ${name} i hope to see you soon again :)`

    })
}

module.exports = {
    sendWelcomEmail,
    sendCancelEmail
}
