const { Magic } = require("@magic-sdk/admin")
const { avm, keyStore } = require('../../utilities/ava')
const {validationResult} = require('express-validator')

const magic = new Magic('pk_test_F4B7DB2E256635A0');

const rootMessage = (request, response) => {
    response.status(200).send(`Ahoj Wallet API v.${process.env.AHOJ_WALLET_API_VERSION}`)
}

const createUser = async (username, password) => {
    try {
        console.log("succesfull!!")
        let succesfull = await keyStore.createUser(username, password)
        console.log("succesfull: ", succesfull)
    } catch(error) {
        return response.status(422).json({status: 'Wallet API - Get Address - error: ', message: error})
        throw error.message;
    } 
}

const createAddress = async (username, password) => {
    let avalancheAddress = await avm.createAddress(username, password) 
    return avalancheAddress;
}

const getFirstAddress = async (username, password) => {
    console.log("username: ", username);
    console.log("password: ", password);
    let listAddresses = await avm.listAddresses(username, password) 
    console.log("List Address 0: ", listAddresses[0])
    console.log("List Address 1: ", listAddresses[1])
    console.log("List Address 2: ", listAddresses[2])
    return listAddresses[0];
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
        await createUser(username, password)
        avalancheAddress = await createAddress(username, password)
        //await createUser("eherrador", "LFMOxto24")
        //avalancheAddress = await createAddress("eherrador", "LFMOxto24") 
        console.log("En el try...")
    } catch(error) {
        console.log("En el catch...")
        avalancheAddress = await getFirstAddress(username, password) 
        //avalancheAddress = await getFirstAddress("eherrador", "LFMOxto24")
        //return response.status(422).json({status: 'Wallet API - Get Address - error: ', message: error})
    } finally {
        return response.status(200).json({ address: avalancheAddress})
    }
}

module.exports = {
    rootMessage,
    getAddress,
}