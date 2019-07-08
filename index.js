const express = require('express');
const app = express();
const bodyParser = require('body-parser')

const twilioClient = require("./lib/twilio-cilient")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

const {accountSid, authToken} = require("./config.json").credentials
const client = require('twilio')(accountSid, authToken);


app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post('/messaging-event', function(req,res){
    let event = req.body 
    let userInput = event.Body;
    let outputMessage = `You typed *${userInput}*`;
    let image = "https://media.licdn.com/dms/image/C4E0BAQGYGYHFFpDh2w/company-logo_200_200/0?e=2159024400&v=beta&t=_KSVehq6l4G3bayeETLBgDMq2P10d9p55xX0jieBWMc"
    twilioClient.sendMessage(event.From, outputMessage,image)
    console.log(req.body)
    res.send("ok");
})

app.post('/message-status', function(req,res){
    console.log(`Message status event ${req.body.MessageStatus}`)
})

app.listen(80, function () {
  console.log('Example app listening on port 80!');
});

