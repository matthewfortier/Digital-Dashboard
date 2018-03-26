const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();
var redis = require("redis"),
    client = redis.createClient();

var rpm, mph = 0;

client.on("error", function (err) {
    console.log("Error " + err);
});

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

app.route('/api/dash').get((req, res) => {
    res.send({
        dash: [{ speed: '100' }]
    });
});  

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//Set Port
const port = process.env.PORT || '4200';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));

// Socket.IO part
var io = require('socket.io')(server);

io.on('connection', function (socket) {
  console.log('New client connected!');

    //send data to client
    setInterval(function(){

        if(rpm < 7200){
            rpm += 11
        } else{
            rpm = 0
        }

        if(mph < 120){
            mph += 1
        } else{
            mph = 0
        }

      socket.emit('ecuData', {'rpm':Math.floor(rpm),'mph':Math.floor(mph)});
    }, 16.6);
});