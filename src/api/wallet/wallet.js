import { Buffer } from "avalanche"
import { Magic } from "@magic-sdk/admin"
import { avm, keyStore, xKeychain, bintools } from '../../utilities/ava'

const {validationResult} = require('express-validator')

const rootMessage = (request, response) => {
    response.status(200).send(`Ahoj Wallet API v.${process.env.AHOJ_WALLET_API_VERSION}`)
}

const createUser = async () => {
    try {
        await keyStore.createUser(username, password)
    } catch(error) {
        throw error;
    } 
}

const createAddress = async () => {
    let avalancheAddress = await avm.createAddress(username, password) 
    return avalancheAddress;
}

const createWallet = (request, response) => {
    if (!request.header('apiKey') || request.header('apiKey') !== process.env.API_KEY) {
        return response.status(401).json({status: 'error', message: 'Unauthorized.'})
    }

    try {
        await createUser()
        let avalancheAddress = await createAddress() 
         return response.status(200).json({ address: avalancheAddress})
    } catch(error) {
        return response.status(422).json({status: 'error', message: error})
    }
}

module.exports = {
    rootMessage,
    createWallet,
}