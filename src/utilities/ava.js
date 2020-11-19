const ava = require("avalanche");
const BN = require('bn.js');

const AVA_IP = "localhost";
const AVA_PORT = 9650;  //"9650";
const AVA_PROTOCOL = "http";
const AVA_NETWORK_ID = 5; //4;  //"5"; //12345
const AVA_CHAIN_ID = "X"; //'2JVSBoinj9C2J33VntvzYtVJNZdN2NKiwwKjcumHUWEb5DbBrm';
const AVA_RPC_URL = "https://api.avax-test.network" //"https://testapi.avax.network";  
const AVAX_FEE =  1000000;
const ASSET_ID = "U8iRqJoiJm8xZHAacmvYyZVwqQx6uDNtQeP3CQ6fcgQk3JqnK";  //AVAX

const bintools = ava.BinTools.getInstance();

const avalanche = new ava.Avalanche(AVA_IP, parseInt(AVA_PORT), AVA_PROTOCOL, parseInt(AVA_NETWORK_ID), AVA_CHAIN_ID);

let avm = avalanche.XChain();
avm.setTxFee(new BN(AVAX_FEE));

let keyStore = avalanche.NodeKeys()
let xKeychain = avm.keyChain();

const CONFIG = {
    AVA_IP: AVA_IP,
    AVA_PORT: AVA_PORT,
    AVA_PROTOCOL: AVA_PROTOCOL,
    AVA_NETWORK_ID: AVA_NETWORK_ID,
    AVA_RPC_URL: AVA_RPC_URL,
    AVA_CHAIN_ID: AVA_CHAIN_ID,
    AVAX_FEE: AVAX_FEE,
    ASSET_ID: ASSET_ID,
};

console.log(CONFIG);

module.exports = {
    avalanche,
    avm,
    keyStore,
    xKeychain,
    bintools,
    CONFIG,
    BN
};
