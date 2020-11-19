const { Magic } = require("@magic-sdk/admin")
const { avm, keyStore } = require('../../utilities/ava')
const {validationResult} = require('express-validator')

const magic = new Magic('pk_test_F4B7DB2E256635A0');

const rootMessage = (request, response) => {
    response.status(200).send(`Ahoj Wallet API v.${process.env.AHOJ_WALLET_API_VERSION}`)
}

const createUser = async (username, password) => {
    try {
        await keyStore.createUser(username, password)
    } catch(error) {
        throw error;
    } 
}

const createAddress = async (username, password) => {
    let avalancheAddress = await avm.createAddress(username, password) 
    return avalancheAddress;
}

const getWalletAddress = async (request, response) => {
    if (!request.header('apiKey') || request.header('apiKey') !== process.env.API_KEY) {
        return response.status(401).json({status: 'error', message: 'Unauthorized'})
    }

    const errors = validationResult(request)
    if (!errors.isEmpty()) {
      return response.status(422).json({status: 'error', message: errors.array()})
    }

    try {
        let token = request.body.DID_Token;
        let username = magic.token.decode(token)[1].sub;
        let password = magic.token.decode(token)[1].add;
        await createUser(username, password)
        let avalancheAddress = await createAddress(username, password) 
         return response.status(200).json({ address: avalancheAddress})
    } catch(error) {
        return response.status(422).json({status: 'error', message: error})
    }
}

module.exports = {
    rootMessage,
    getWalletAddress,
}