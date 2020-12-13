const { Magic } = require("@magic-sdk/admin")
const { avm, keyStore, AVA_CONFIG } = require('../../utilities/ava')
const {validationResult} = require('express-validator')
//const axios = require('axios');
//const delay = require('delay')

const magic = new Magic('pk_test_F19F104AD0EB77B4');

const rootMessage = (request, response) => {
    response.status(200).send(`Ahoj Wallet API v.${process.env.AHOJ_WALLET_API_VERSION}`)
}

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
        //console.log("*******************************+")
        //username = "NINA100"
        //password = "LFMOxto24"
        console.log("username: ", username)
        console.log("password: ", password)
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