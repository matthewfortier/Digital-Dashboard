const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();
var redis = require("redis"),
    client = redis.createClient();

client.on("error", function (err) {
    console.log("Error " + err);
});

var fakenews = true;
var ecuData = {
                'SPEED':0,
                'RPM':0,
                'DISTANCE_SINCE_DTC_CLEAR':0,
                'OIL_TEMP':0,
                'COOLANT_TEMP':0,
                'CONTROL_MODULE_VOLTAGE':0,
                'FUEL_LEVEL':0
              };

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

    // let backend know what obd codes we need
    // hardcoded for now
    client.set('OBDKEYS', "SPEED:RPM:DISTANCE_SINCE_DTC_CLEAR:OIL_TEMP:COOLANT_TEMP:CONTROL_MODULE_VOLTAGE:FUEL_LEVEL");

    // send data to client
    setInterval(function() {

        // simulating/testing on a desktop
        if (fakenews) {
            if (ecuData['RPM'] < 7200) {
                ecuData['RPM'] += 11;
            } else {
                ecuData['RPM'] = 0;
            }
            if (ecuData['SPEED'] < 120) {
                ecuData['SPEED'] += 1;
            } else {
                ecuData['SPEED'] = 0;
            }
        }
        // real deployment
        else {
            client.ping(function (err, pong) {
                // reply is "PONG" if the redis server is reachable
                if (pong == "PONG") {
                    // update every value in dictionary
                    for (var key in Object.keys(ecuData)) {
                        client.get(key, function(error, reply) {
                            if (reply != null) {
                                console.log("Warn: \'", key, "\' reply is null")
                                reply = "0"; // if null, force to 0
                            }
                            else if (parseFloat(reply).isNaN()) {
                                console.log("Warn: \'", key, "\' reply is NaN")
                                reply = "0"; // if not parsable, force to 0
                            }

                            // finally set the dictionary value
                            ecuData[key] = Math.floor(parseFloat(reply));
                        });
                    }
                }
                else {
                    console.log("Error: Redis not available");
                }
            });
        }

        socket.emit('ecuData', ecuData);
    }, 16.6);
});
