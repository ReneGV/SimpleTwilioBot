const {accountSid, authToken} = require("./config.json").credentials
const client = require('twilio')(accountSid, authToken);

const twilioClient = {}
const from = 'whatsapp:+14155238886'

/**
 * Sends a simple mesage
 */
twilioClient.sendMessage =  (to, body, mediaUrl)=>{
    client.messages
    .create(
        {to, from, body, mediaUrl})
    .then(message => console.log(message.sid));
}

module.exports = twilioClient;


