// express/app
const express = require('express');
const app = express();
// socket.io
var server = require('http').Server(app);
var io = require('socket.io')(server);
// body-parser
const bodyParser = require('body-parser');
//require/import the mongodb native drivers
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
// using Node.js `require()`
const mongoose = require('mongoose');
// connection URL
const url = process.env.MONGOLAB_URI;      
// connection
const promise_connection = mongoose.connect(url);
let db = mongoose.connection;
// if connection is success
promise_connection.then((db) => {
	console.log('Connected to mongodb');
});


/*******************************/
/* set USEs
/*******************************/
app.use( bodyParser.json() );   
app.use(bodyParser.urlencoded({ 
  extended: true
}));
/***/
app.use(express.static('public'));
/***********************************/
// server
server.listen(process.env.PORT);
// listener on CONNECTION
io.on('connection', (socket) => {
  socket.on('send',  (message) => {
        socket.broadcast.emit('send_message', message);
  });
});
/******************************/
// mongoDB models and schemas
/******************************/
// describe the schema
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
const messageSchema = new Schema({
    username: String,
    avatar_url: String,
    date: String,
    text: String
});
// get the model
const messageModel = mongoose.model('telechat-messages', messageSchema);



/******************************/
// requests handlers
/******************************/

// main handler
app.get("*", (request, response) => {
  response.sendFile(__dirname + '/app/index.html');
});

// add_message handler
app.post("/add-message", (request, response) => {
    const message_obj = {
      username: request.body.username,
      avatar_url: request.body.avatar_url,
      date: request.body.date,
      text: request.body.text
    };
    const message = new messageModel(message_obj);
    message.save((err) => {
      if(!err) response.status(201).json({"error": "0"});
    });
});

// get_all_messages handler
app.post("/get-messages", (request, response) => {
    messageModel
    .find()
    .select({ "username": 1, "_id": 0, "avatar_url": 1, "date": 1, "text": 1})
    .exec((err, messages) => {
            if (!err) response.status(200).json(messages);
          });
});