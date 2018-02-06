"use strict";
const fs = require('fs');
const path = require('path');
const Web3 = require('web3');
const solc = require('solc');
//const database = require('./database');

// const pathContractData = path.join('./', 'server', 'contractData',
//     'EnergySystemTokenFactoryAndAddress.json');
// const pathEnergySystemTokenFactory = path.join('./', 'bc.ico.contractdeployer', 'truffle',
//     'contracts', 'EnergySystemTokenFactory.sol');
// const pathEnergySystemToken = path.join('./', 'bc.ico.contractdeployer', 'truffle',
//     'contracts', 'EnergySystemToken.sol');
// const pathHumanStandardToken = path.join('./', 'bc.ico.contractdeployer', 'truffle',
//     'contracts', 'HumanStandardToken.sol');
// const pathStandardToken = path.join('./', 'bc.ico.contractdeployer', 'truffle',
//     'contracts', 'StandardToken.sol');
// const pathToken = path.join('./', 'bc.ico.contractdeployer', 'truffle',
//     'contracts', 'Token.sol');
const pathToken = path.join('./', 'contracts', 'SimpleStorage.sol');

module.exports = class Blockchain {

    constructor() {
        this.eventsProcessed = [];
        this.connect();
        this.old_Events = [];
        this.iteratorForAddingEvents = 0;
        this.isListening = [];
    }

    // ####################################################
    // ########################## helper functions  
    // ####################################################

    connect(bcUrl = 'http://localhost:8545') {
        this.web3 = new Web3(new Web3.providers.HttpProvider(process.env.nodeUrl));
        if (this.web3 && !this.web3.isConnected()) {
            throw new Error("web3 is not connected. Please execute connect function if not already done. ")
        } else {
            this.web3.eth.defaultAccount = this.web3.eth.accounts[0];
            console.log(`Connected to Node at ${process.env.nodeUrl}`)
        }
        return this.web3;
    }

    // getESTokenCreationEvents(filter) {
    //     return new Promise((resolve, reject) => {
    //         fs.readFile(pathContractData, (err, data) => {
    //             // file exists 
    //             if (!err) {
    //                 console.log("EnergySystemTokenFactoryAndAddress.json exists");
    //                 data = JSON.parse(data);
    //                 let abi = data.abi;
    //                 let address = data.address;
    //                 // if contract is deployed then return 
    //                 if (this.web3.eth.getCode(address).length > 4) {
    //                     console.log("EnergySystemTokenFactory is deployed.")
    //                     console.log(this.web3.eth.getCode(address))
    //                     let contract = this.web3.eth.contract(abi);
    //                     let instance = contract.at(address);
    //                     // todo: auf richtiger blockchain muss der Parameter fromBlock angepasst werden, ansonsten dauert die Suche zu lange. 
    //                     instance.EnergySystemTokenCreationEvent(filter, { fromBlock: 0, toBlock: 'latest' }).get((error, events) => {
    //                         if (error) {
    //                             console.log('Error in EnergySystemTokenCreationEvent event handler: ' + error);
    //                         } else {
    //                             console.log('EnergySystemTokenCreationEvent: ' + JSON.stringify(events));
    //                             resolve(events);
    //                         }
    //                     });
    //                 }
    //             }
    //         });
    //     })
    // }

    // getEnergySystemTokenAbi_internal() {
    //     return new Promise((resolve, reject) => {
    //         try {
    //             // file does not exist || contract is not deployed || or sth. else
    //             fs.readFile(pathToken, 'utf8', (err, dataToken) => {
    //                 if (err) throw err;
    //                 fs.readFile(pathStandardToken, 'utf8', (err, dataStandardToken) => {
    //                     if (err) throw err;
    //                     fs.readFile(pathHumanStandardToken, 'utf8', (err, dataHumanStandardToken) => {
    //                         if (err) throw err;
    //                         fs.readFile(pathEnergySystemToken, 'utf8', (err, dataEstoken) => {
    //                             if (err) throw err;

    //                             // compile and extract data for contract creation
    //                             let input = {
    //                                 'EnergySystemToken.sol': dataEstoken,
    //                                 'HumanStandardToken.sol': dataHumanStandardToken,
    //                                 'StandardToken.sol': dataStandardToken,
    //                                 'Token.sol': dataToken
    //                             }
    //                             let output = solc.compile({ sources: input }, 1);
    //                             let abi = JSON.parse(output.contracts['EnergySystemToken.sol:EnergySystemToken'].interface);
    //                             resolve(abi)
    //                         });
    //                     });
    //                 });
    //             });
    //         } catch (err) {
    //             reject(err)
    //         }
    //     });
    // }

    // getEnergySystemToken(_energySystemTokenAddress) {
    //     return new Promise((resolve, reject) => {
    //         return this.getEnergySystemTokenAbi_internal().then(abi => {
    //             let contract = this.web3.eth.contract(abi);
    //             let estoken = contract.at(_energySystemTokenAddress);
    //             resolve(estoken);
    //         })
    //     })
    // }

    // getTransferEvents(_energySystemTokenAddress, _filter) {
    //     return this.getEnergySystemToken(_energySystemTokenAddress).then(estoken => {
    //         return new Promise((resolve, reject) => {
    //             estoken.Transfer(_filter, { fromBlock: 0, toBlock: 'latest' }).get((error, events) => {
    //                 if (error) {
    //                     console.log('Error in Transfer event handler: ' + error);
    //                 } else {
    //                     let output = [];
    //                     for (let i in events) {
    //                         output.push({
    //                             transactionHash: events[i].transactionHash,
    //                             blockNumber: events[i].blockNumber,
    //                             from: events[i].args._from,
    //                             to: events[i].args._to,
    //                             value: events[i].args._value,
    //                         })
    //                     }
    //                     console.log(2)
    //                     resolve(output);
    //                 }
    //             });
    //         })
    //     })
    // }

    // getFulfilledBuyOrders(_energySystemTokenAddress) {
    //     let filter = { _from: _energySystemTokenAddress };
    //     return this.getTransferEvents(_energySystemTokenAddress, filter);
    // }

    // getFulfilledSellOrders(_energySystemTokenAddress) {
    //     let filter = { _to: _energySystemTokenAddress };
    //     return this.getTransferEvents(_energySystemTokenAddress, filter);
    // }

    // listenToEvent(_contract, _eventName, filter = {}) {
    //     try {
    //         _contract[_eventName](filter, (error, event) => {
    //             if (error) throw error;

    //             console.log("in listenToEvent ", event);
    //             if (!this.old_Events.includes(event.transactionHash)) {
    //                 this.addEventToArray(event.transactionHash);
    //                 this.io.emit(_eventName, `${JSON.stringify(event.args)}`);

    //                 database.createOrUpdateEnergySystemBcData(event.transactionHash, event.args._contract).then(result => {
    //                     if (result && result.status === 1) {
    //                         this.io.emit('EnergySystemCreated', `${JSON.stringify(event.args)}`);
    //                     }
    //                 }).catch(err => {
    //                     console.log(err);
    //                 })
    //             }

    //             console.log(event)
    //         })
    //     } catch (err) { console.error(`error in listenToEvent: ${err}`) }
    // }

    // addEventToArray(txhash) {
    //     if (this.iteratorForAddingEvents > 30)
    //         this.iteratorForAddingEvents = 0;
    //     this.old_Events[this.iteratorForAddingEvents++] = txhash;
    // }

    // // ####################################################
    // // ########################## exposed functions 
    // // ####################################################

    // eventListener(request, response) {
    //     let energySystemTokenAddress = request.query.energySystemTokenAddress;
    //     let eventName = request.query.eventName;
    //     let filter = {};
    //     if (request.query.filter) {
    //         filter = request.query.filter;
    //     }

    //     this.getEnergySystemToken(energySystemTokenAddress).then(estoken => {
    //         this.listenToEvent(estoken, eventName, filter);
    //         response.send(`Server is listening to ${eventName} from EnergySystemToken with address ${estoken}`)
    //     })
    // }

    // // returns [{transactionHash, blockNumber, from, to, value}, ...]
    // getFulfilledOrders(request, response) {
    //     console.log(1);
    //     let energySystemTokenAddress = request.query.energySystemTokenAddress;
    //     let p1 = this.getFulfilledBuyOrders(energySystemTokenAddress);
    //     let p2 = this.getFulfilledSellOrders(energySystemTokenAddress);
    //     console.log(3);
    //     p1.then(buyOrders => {
    //         console.log(4);
    //         p2.then(sellOrders => {
    //             console.log(5);
    //             response.json({ buyOrders, sellOrders })
    //         })
    //     }).catch(err => {
    //         response.status(500).send(err);
    //     });
    // }

    // getEnergySystemTokenFactory(req, response) {
    //     try {
    //         fs.readFile(pathContractData, (err, data) => {
    //             // file exists 
    //             if (!err) {
    //                 data = JSON.parse(data);
    //                 let abi = data.abi;
    //                 let address = data.address;
    //                 // if contract is deployed then return 
    //                 if (this.web3.eth.getCode(address).length > 4) {
    //                     let contract = this.web3.eth.contract(abi);
    //                     let instance = contract.at(address);

    //                     // debug purposes 
    //                     if (!this.isListening[instance.address]) {
    //                         this.listenToEvent(instance, "EnergySystemTokenCreationEvent", ["_contract", "_from", "totalSupply"])
    //                         this.isListening[instance.address] = true;
    //                     }

    //                     response.json({ abi, address });
    //                     return;
    //                     // if contract not deployed and env is production, then return with error 
    //                 } else if (process.env.PRODUCTION == "PRODUCTION") {
    //                     let msg = `EnergySystemTokenFactory contract with address ${address} not deployed. Please contact server provider.`;
    //                     console.error(msg);
    //                     response.status(500).send(msg);
    //                     return;
    //                 }
    //             }
    //             // file does not exist || contract is not deployed || or sth. else
    //             fs.readFile(pathToken, 'utf8', (err, dataToken) => {
    //                 if (err) throw err;
    //                 fs.readFile(pathStandardToken, 'utf8', (err, dataStandardToken) => {
    //                     if (err) throw err;
    //                     fs.readFile(pathHumanStandardToken, 'utf8', (err, dataHumanStandardToken) => {
    //                         if (err) throw err;
    //                         fs.readFile(pathEnergySystemToken, 'utf8', (err, dataEstoken) => {
    //                             if (err) throw err;
    //                             fs.readFile(pathEnergySystemTokenFactory, 'utf8', (err, dataFactory) => {
    //                                 if (err) throw err;
    //                                 // compile and extract data for contract creation
    //                                 let input = {
    //                                     'EnergySystemTokenFactory.sol': dataFactory,
    //                                     'EnergySystemToken.sol': dataEstoken,
    //                                     'HumanStandardToken.sol': dataHumanStandardToken,
    //                                     'StandardToken.sol': dataStandardToken,
    //                                     'Token.sol': dataToken
    //                                 }
    //                                 let output = solc.compile({ sources: input }, 1);
    //                                 let bytecode = output.contracts['EnergySystemTokenFactory.sol:EnergySystemTokenFactory'].bytecode;
    //                                 let abi = JSON.parse(output.contracts['EnergySystemTokenFactory.sol:EnergySystemTokenFactory'].interface);
    //                                 let contract = this.web3.eth.contract(abi);
    //                                 let gasEstimate = this.web3.eth.estimateGas({ data: bytecode });
    //                                 // create contract
    //                                 let contractInstance = contract.new({
    //                                     data: '0x' + bytecode,
    //                                     from: this.web3.eth.defaultAccount,
    //                                     gas: gasEstimate
    //                                 }, (err, instance) => {
    //                                     if (err) {
    //                                         console.log(err);
    //                                         return;
    //                                     }
    //                                     if (instance.address) {
    //                                         console.log('Contract address: ' + instance.address);

    //                                         // debug purposes 
    //                                         this.listenToEvent(instance, "EnergySystemTokenCreationEvent", ["_contract", "_from", "totalSupply"])

    //                                         let address = instance.address
    //                                         fs.writeFile('./server/contractData/EnergySystemTokenFactoryAndAddress.json', JSON.stringify({ abi, address }), (err) => {
    //                                             if (err) throw err;
    //                                             console.log('The file has been saved!');
    //                                             response.json({ abi, address });
    //                                         });
    //                                     }
    //                                 });
    //                             });
    //                         });
    //                     });
    //                 });
    //             });
    //         })
    //     } catch (err) {
    //         response.status(500).send(`Error when trying to retrieve EnergySystemTokenFactory: ${err}`)
    //     }
    // }

    // getTransactionReceipt(request, response) {
    //     let txhash = request.query.transactionHash;
    //     console.log(request.query);
    //     // response.json(request.query);
    //     let receipt = this.web3.eth.getTransactionReceipt(txhash);
    //     response.json({ transactionReceipt: receipt })
    // }

    // getLastEnergySystemTokenAddressForUser(request, response) {
    //     let userAddress;
    //     if (request.query.userAddress) {
    //         userAddress = request.query.userAddress;
    //     } else {
    //         response.send("UserAddress as query parameter is missing.");
    //         return;
    //     }

    //     let filter = { _from: userAddress }

    //     this.getESTokenCreationEvents(filter).then((events) => {
    //         // returns {txhash, from, contract, blocknumber}
    //         let transactionHash = events[0].transactionHash;
    //         let blockNumber = events[0].blockNumber;
    //         let _contract = events[0].args._contract;
    //         let _from = events[0].args._from;

    //         response.json({ from: _from, contract: _contract, blockNumber, transactionHash });
    //     })
    // }

    // getAllEnergySystemAddressesForUser(_userAddress) {
    //     let filter = { _from: _userAddress }
    //     console.log("filter", filter);
    //     return this.getESTokenCreationEvents(filter).then((events) => {
    //         let output = [];
    //         for (let i in events) {
    //             output.push(events[i].args._contract)
    //         }
    //         return output;
    //     })
    // }
    

    // getAllEnergySystemAddresses() {
    //     return new Promise((resolve, reject) => {
    //         console.log(1)
    //         this.getESTokenCreationEvents({}).then((events) => {
    //             console.log(2)
    //             let output = [];
    //             for (let i in events) {
    //                 output.push(events[i].args._contract)
    //             }
    //             console.log("output from getAllEnergySystemTokenAddresses: ", output)
    //             resolve(output);
    //         })
    //     });
    // }

    // getDCPTokenAbi_internal() {
    //     return new Promise((resolve, reject) => {
    //         try {
    //             // file does not exist || contract is not deployed || or sth. else
    //             fs.readFile(pathToken, 'utf8', (err, dataToken) => {
    //                 if (err) throw err;
    //                 fs.readFile(pathStandardToken, 'utf8', (err, dataStandardToken) => {
    //                     if (err) throw err;
    //                     fs.readFile(pathHumanStandardToken, 'utf8', (err, dataHumanStandardToken) => {
    //                         if (err) throw err;
    //                         fs.readFile(pathEnergySystemToken, 'utf8', (err, dataEstoken) => {
    //                             if (err) throw err;

    //                             // compile and extract data for contract creation
    //                             let input = {
    //                                 'EnergySystemToken.sol': dataEstoken,
    //                                 'HumanStandardToken.sol': dataHumanStandardToken,
    //                                 'StandardToken.sol': dataStandardToken,
    //                                 'Token.sol': dataToken
    //                             }
    //                             let output = solc.compile({ sources: input }, 1);
    //                             let abi = JSON.parse(output.contracts['EnergySystemToken.sol:EnergySystemToken'].interface);
    //                             resolve(abi)
    //                         });
    //                     });
    //                 });
    //             });
    //         } catch (err) {
    //             reject(err)
    //         }
    //     });
    // }

    getDCPTokenStoredData(_userAddress) {
        let filter = { _from: _userAddress }
        console.log("filter", filter);
        return this.getESTokenCreationEvents(filter).then((events) => {
            let output = [];
            for (let i in events) {
                output.push(events[i].args._contract)
            }
            return output;
        })
    }

    getDCPTokenAbi_internal() {
        return new Promise((resolve, reject) => {
            try {
                // file does not exist || contract is not deployed || or sth. else
                fs.readFile(pathToken, 'utf8', (err, dataEstoken) => {
                    if (err) throw err;

                    // compile and extract data for contract creation
                    let input = {
                        'SimpleStorage.sol': dataEstoken,
                    }
                    let output = solc.compile({ sources: input }, 1);
                    let abi = JSON.parse(output.contracts['SimpleStorage.sol:SimpleStorage'].interface);
                    resolve(abi)
                });
            } catch (err) {
                reject(err)
            }
        });
    }

    getDCPTokenAbi(request, response) {
        this.getDCPTokenAbi_internal().then(abi => {
            response.json({ abi })
        }).catch(err => {
            response.status(500).send(`Error when trying to retrieve DCPToken: ${err}`)
        })
    }
}
