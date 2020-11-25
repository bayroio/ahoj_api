const { Magic } = require("@magic-sdk/admin")
const { avm, keyStore, AVA_CONFIG } = require('../../utilities/ava')
const {validationResult} = require('express-validator')
//const axios = require('axios');
//const delay = require('delay')

const magic = new Magic('pk_test_F4B7DB2E256635A0');

const rootMessage = (request, response) => {
    response.status(200).send(`Ahoj Wallet API v.${process.env.AHOJ_WALLET_API_VERSION}`)
}
/*
const createUser = async (username, password) => {
    await delay(5000);
    let AVALANCHE_KEYSTORE_ENDPOINT = AVA_CONFIG.AVA_PROTOCOL.concat("://").concat(AVA_CONFIG.AVA_RPC_URL).concat(":").concat(AVA_CONFIG.AVA_PORT).concat(AVA_CONFIG.KEYSTORE_ENDPOINT)
    //let AVALANCHE_KEYSTORE_ENDPOINT = AVA_CONFIG.AVA_PROTOCOL_LOCAL.concat("://").concat(AVA_CONFIG.AVA_IP).concat(":").concat(AVA_CONFIG.AVA_PORT_LOCAL).concat(AVA_CONFIG.KEYSTORE_ENDPOINT)
    console.log("API createUser: ", AVALANCHE_KEYSTORE_ENDPOINT)

    await axios.post(
        AVALANCHE_KEYSTORE_ENDPOINT,
        {
            "jsonrpc":"2.0",
            "id"     :1,
            "method" :"keystore.createUser",
            "params" :{
                "username": username,
                "password": password
            }
        },
        //{ timeout: 10000 } // timeout of 10 seg
    )
    .then(function (response) {
        console.log("response status: ", response.status)
        console.log("response statusText: ", response.statusText)
        console.log("response data: ", response.data)
        if (response.data["error"] != null) {
            throw response.data["error"];
        }
        else {
            console.log("No error on createUser!")
        }
    })
    .catch(function (error) {
        console.log("Error in createUser: ", error)
        throw error.errno;
    });
}

const createAddress = async (username, password) => {
    await delay(5000);
    let AVALANCHE_X_CHAIN_ENDPOINT = AVA_CONFIG.AVA_PROTOCOL.concat("://").concat(AVA_CONFIG.AVA_RPC_URL).concat(":").concat(AVA_CONFIG.AVA_PORT).concat(AVA_CONFIG.X_CHAIN_ENDPOINT)
    //let AVALANCHE_X_CHAIN_ENDPOINT = AVA_CONFIG.AVA_PROTOCOL_LOCAL.concat("://").concat(AVA_CONFIG.AVA_IP).concat(":").concat(AVA_CONFIG.AVA_PORT_LOCAL).concat(AVA_CONFIG.KEYSTORE_ENDPOINT)
    console.log("API createAddress: ", AVALANCHE_X_CHAIN_ENDPOINT)

    await axios.post(
        AVALANCHE_X_CHAIN_ENDPOINT,
        {
            "jsonrpc":"2.0",
            "id"     :1,
            "method" :"avm.createAddress",
            "params" :{
                "username": username,
                "password": password
            }
        }
    )
    .then(function (response) {
        console.log("Address in createAddress: ", response.data)
        return response.data
    })
    .catch(function (error) {
        console.log("Error in creatAddress: ", error)
        throw error;
    });
}

const getFirstAddress = async (username, password) => {
    await delay(5000);
    let AVALANCHE_X_CHAIN_ENDPOINT = AVA_CONFIG.AVA_PROTOCOL.concat("://").concat(AVA_CONFIG.AVA_RPC_URL).concat(":").concat(AVA_CONFIG.AVA_PORT).concat(AVA_CONFIG.X_CHAIN_ENDPOINT)
    //let AVALANCHE_X_CHAIN_ENDPOINT = AVA_CONFIG.AVA_PROTOCOL_LOCAL.concat("://").concat(AVA_CONFIG.AVA_IP).concat(":").concat(AVA_CONFIG.AVA_PORT_LOCAL).concat(AVA_CONFIG.KEYSTORE_ENDPOINT)
    console.log("API getFirstAddress: ", AVALANCHE_X_CHAIN_ENDPOINT)

    await axios.post(
        AVALANCHE_X_CHAIN_ENDPOINT,
        {
            "jsonrpc":"2.0",
            "id"     :1,
            "method" :"avm.listAddresses",
            "params" :{
                "username": username,
                "password": password
            }
        }
    )
    .then(function (response) {
        console.log("Address in getFirstAddress - then: ", response.data)
        response.data;
    })
    .catch(function (error) {
        console.log("Error in getFirstAddress: ", error)
        throw error;
    })
}
*/
const getAddress = async (request, response) => {
    if (!request.header('apiKey') || request.header('apiKey') !== process.env.API_KEY) {
        return response.status(401).json({status: 'Wallet API - Get Address - api key error: ', message: 'Unauthorized'})
    }

    const errors = validationResult(request)
    if (!errors.isEmpty()) {
      return response.status(422).json({status: 'Wallet API - Get Address - validation error on request: ', message: errors.array()})
    }

    let token = request.body.DID_Token;
    let username = magic.token.decode(token)[1].sub;
    let password = magic.token.decode(token)[1].add;
    let avalancheAddress = ""

    try {
        console.log("*******************************+")
        //username = "NINA92"
        //password = "LFMOxto24"
        //console.log("username: ", username)
        //console.log("password: ", password)
        if (await keyStore.createUser(username, password)) {
            avalancheAddress = await avm.createAddress(username, password)
        }
        console.log("Avalanche Address - create user and address: ", avalancheAddress)
    } catch (error) {
        console.log("error: ", error)
        avalancheAddresses = await avm.listAddresses(username, password)
        console.log("Addresses List: ", avalancheAddresses)
        avalancheAddress = avalancheAddresses[0]
        console.log("Avalanche Address - list address: ", avalancheAddress)
    } finally {
        return response.status(200).json({ address: avalancheAddress})
    }
}

module.exports = {
    rootMessage,
    getAddress,
}