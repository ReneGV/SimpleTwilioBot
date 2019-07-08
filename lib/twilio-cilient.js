/**
 * This module is a simple client wrapper for sending messages vía twilio API
 */
const client = require('twilio')(accountSid, authToken);

const twilioConfig =require("./config/config.json").twilio;
const {accountSid, authToken} = twilioConfig.credentials;
const from = twilioConfig.recipient;

const twilioClient = {}

/**
 * Sends a message vby twilio API
 * @param {String} to   - User who will reveive the message something like ```whatsapp:+[0-9]{11}```
 * @param {String} body - Message that will be sent
 * @param {String} [mediaUrl] -Optional image to append with the message
 */
twilioClient.sendMessage = (to, body, mediaUrl) => {
    requestData = {from,to, body};
    if(mediaUrl){
        requestData = {mediaUrl, ...requestData}
    }
    client
        .messages
        .create(requestData)
    .then(
        message => console.log(`Message sent with id: ${message.sid}`)
    );
}

module.exports = twilioClient;