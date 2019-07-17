const express = require('express');
const bodyParser = require('body-parser')
const twilioClient = require("./lib/twilio-cilient")

const _ = require("underscore");
const custom_images = require("./assets/images.json").images

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post('/messaging-event', function(req,res){
    let event = req.body 
    let userInput = event.Body;
    // First message
    let outputMessage = `You typed *${userInput}*`;
    twilioClient.sendMessage(event.From, outputMessage)
    // Second message
    twilioClient.sendMessage(
      event.From,
      "Do you know this bot is powerred by Nodejs",
      _.sample(custom_images)
    )
    console.log(req.body)
    res.send("ok");
})

app.post('/message-status', function(req,res){
    console.log(`Message status event ${req.body.MessageStatus}`)
})

app.listen(80, function () {
  console.log('Example app listening on port 80!');
});

