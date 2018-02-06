"use strict";

function defaultAccount() {
    return new Promise((resolve, reject) => {
        web3.eth.getAccounts((err, accounts) => {
            if (err) {
                return reject(err)
            }
            return resolve(accounts[0] ? accounts[0] : null)
        });
    });
}

// gibt true zurück, wenn Account in MetaMask geladen ist
module.exports.isAccountLoaded = function() {
    return new Promise((resolve, reject) => {
        defaultAccount().then(account => {
            return resolve(!!account)
        })
    });
}

//Gets default account that is used by metamask 
module.exports.getDefaultAccount = function() {
    return new Promise((resolve, reject) => {
        defaultAccount().then(account => {
            return resolve(account)
        })
    });
}

// Gibt Account Stand zurück
module.exports.getEtherBalance = function(_user) {
    return new Promise((resolve, reject) => {
        defaultAccount().then(account => {
            console.log(account)
            web3.eth.getBalance(account, function(err, res) {
                if (err)
                    reject(err);
                else
                    resolve(res.toNumber());
            });
        })
    })
}

// get value
module.exports.getDCPTokenStoredData = function(_user = web3.eth.defaultAccount) {
    return fetch(`/dcpTokenStoredData?userAddress=${web3.eth.defaultAccount}`).then(response => {
        return response.json();
    }).then(res => {
        return res;
    });
}

// set data
module.exports.setDCPTokenStoredData = function(_dcpTokenAddress, _value) {
    return getDCPToken(_dcpTokenAddress).then(estoken => {
        return new Promise((resolve, reject) => {
            estoken.sell(_value, { from: web3.eth.defaultAccount, gas: 120000 }, (error, txhash) => {
                if (error) {
                    reject(error);
                }
                resolve('data set');
            })
        })
    })
}

module.exports.getDCPTokenBalance = function(_dcpTokenAddress, _user = web3.eth.defaultAccount) {
    return getDCPToken(_dcpTokenAddress).then(estoken => {
        window.estoken = estoken;
        return new Promise((resolve, reject) => {
            estoken.balanceOf(_dcpTokenAddress, { from: _user }, function(error, result) {
                if (error) reject(error);
                resolve(result.toNumber());
            });
        })
    })
}

function getDCPToken(_dcpTokenAddress, _user = web3.eth.defaultAccount) {
    return new Promise((resolve, reject) => {
        return fetch('/DCPTokenAbi').then(response => {
            return response.json().then(function(data) {
                let abi = data.abi;
                let contract = web3.eth.contract(abi);
                let estoken = contract.at(_dcpTokenAddress);
                resolve(estoken);
            })
        })
    })
}
