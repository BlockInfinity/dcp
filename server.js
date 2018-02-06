const path = require("path");
const express = require('express');
const app = express();
const server = require('http').createServer(app);
//const io = require('socket.io')(server);
// const ioClient = io('http://localhost');
// ioClient.on('connect', (ev) => {
//     console.log(232342)
//     console.log(ev);
// })
const bodyParser = require('body-parser');

const BlockchainApi = require('./blockchain.js');
const blockchainApi = new BlockchainApi(io);
//const authentification = require('./server/authentification.js');
//const database = require('./server/database');
//const BcEventHandler = require('./server/bcEventHandler');
//const bcEventHandler = new BcEventHandler(io);

// database.clearDB().then(response => {
//     console.log('database cleared')
// }, err => {
//     console.log('database not cleared') 
// })

app.use('/', express.static('public'))

// app.use('/user/', function(req, res, next) {
//     if (authentification.isAuthenticated(req, res))
//         next();
//     else
//         res.status(401).send("Authentication Required. Please use metamask.")
// });

// if (process.env.PRODUCTION !== "PRODUCTION") {
//     app.use('/test', express.static(path.join(__dirname, 'app', 'mochaTests')))
//     app.use('/node_modules/mocha', express.static(path.join(__dirname, 'node_modules', 'mocha')))
//     app.use('/node_modules/chai', express.static(path.join(__dirname, 'node_modules', 'chai')))
// }

// parse application/json
app.use(bodyParser.json())

// app.get('/EnergySystemTokenFactory', (req, res) => {
//     blockchainApi.getEnergySystemTokenFactory(req, res);
// })

app.get('/DCPTokenAbi', (req, res) => {
    blockchainApi.getDCPTokenAbi(req, res);
})

app.get('/dcpTokenStoredData', (req, res) => {
    let userAddress;
    if (req.query.userAddress) {
        userAddress = req.query.userAddress;
    } else {
        response.send("UserAddress as query parameter is missing.");
        return;
    }
    
    blockchainApi.getDCPTokenStoredData(userAddress).then(function(result) {
        res.send(JSON.stringify(result));
    }, function(error) {
        res.status(500).send('unable to fetch energy systems for user')
    }).catch(error => {
        res.status(500).send('unable to fetch energy system for user')
    })
})

// ...

// app.get('/transactionReceipt', (req, res) => {
//     blockchainApi.getTransactionReceipt(req, res);
// })

// app.get('/LastEnergySystemTokenAddressForUser', (req, res) => {
//     blockchainApi.getLastEnergySystemTokenAddressForUser(req, res);
// })

// // expects energySystemTokenAddress as parameter
// app.get('/FulfilledOrders', (req, res) => {
//     blockchainApi.getFulfilledOrders(req, res);
// })

// // expect energySystemTokenAddress, eventName as parameters
// app.get('/EventListener', (req, res) => {
//     blockchainApi.eventListener(req, res);
// })

server.listen(8000, function() {
    console.log('App listening on port 8000!');
});