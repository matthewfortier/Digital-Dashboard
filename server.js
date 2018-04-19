const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();
const redis = require("redis");

var refreshInterval = 16.6;
var client = redis.createClient();
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

server.listen(port, () => console.log(`Running on 0.0.0.0:${port}`));

// Socket.IO part
var io = require('socket.io')(server);

io.on('connection', function (socket) {
    console.log('New client connected!');
    var redisUp = false;
    var fakenews = true;
    var ecuData = {
                    'SPEED':0,
                    'RPM':0,
                    'DISTANCE_SINCE_DTC_CLEAR':0,
                    'OIL_TEMP':0,
                    'COOLANT_TEMP':0,
                    'ELM_VOLTAGE':0,
                    'FUEL_LEVEL':0
                };

    // send data to client
    setInterval(function() {
        // reply is "PONG" if the redis server is reachable
        client.ping(function (err, reply) {
            redisUp = (reply === 'PONG');
        });
        // check if vehicle data or simulated data
        client.get("FAKENEWS", function(error, reply) {
            fakenews = (reply !== 'false');
        });

        // vehicle data
        if (redisUp && !fakenews) {
            // update OBDKEYS in redis
            client.set('OBDKEYS', Object.keys(ecuData).join(':'));

            // poll vehicle for each piece of data
            Object.keys(ecuData).forEach(function(key) {
                client.get(key, function(error, reply) {
                    if (reply == null) {
                        //console.log("Warn: \'", key, "\' reply is null")
                        reply = "0.0"; // if null, force to 0.0
                    }
                    else if (isNaN(parseFloat(reply))) {
                        //console.log("Warn: \'", key, "\' reply is NaN")
                        reply = "0.0"; // if not parsable, force to 0.0
                    }

                    // finally set the dictionary value
                    ecuData[key] = Math.floor(parseFloat(reply));
                });
            });
        }
        // simulated
        else {
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

        // emit data to front-end
        socket.emit('ecuData', ecuData);
    }, refreshInterval);
});
