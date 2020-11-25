const ava = require("avalanche");
const BN = require('bn.js');

const AVA_IP = "localhost";
const AVA_PORT_LOCAL = 9650; //9650;
const AVA_PORT = 443;
const AVA_PROTOCOL_LOCAL = "http";
const AVA_PROTOCOL = "https";
const AVA_NETWORK_ID = 5; //4;  //12345
const AVA_CHAIN_ID_LOCAL = 'X';
const AVA_CHAIN_ID = '2JVSBoinj9C2J33VntvzYtVJNZdN2NKiwwKjcumHUWEb5DbBrm';

const AVA_RPC_URL = 'api.avax-test.network'; //'testapi.avax.network';  
const X_CHAIN_ENDPOINT = "/ext/bc/X"
const BUILD_GENESIS_ENDPOINT = "/ext/vm/avm"
const KEYSTORE_ENDPOINT = "/ext/keystore"

const AVAX_FEE =  1000000;
const ASSET_ID = "U8iRqJoiJm8xZHAacmvYyZVwqQx6uDNtQeP3CQ6fcgQk3JqnK";  //AVAX

const bintools = ava.BinTools.getInstance();

//const avalanche = new ava.Avalanche(AVA_IP, parseInt(AVA_PORT_LOCAL), AVA_PROTOCOL_LOCAL, parseInt(AVA_NETWORK_ID), AVA_CHAIN_ID_LOCAL);
const avalanche = new ava.Avalanche(AVA_RPC_URL, parseInt(AVA_PORT), AVA_PROTOCOL, parseInt(AVA_NETWORK_ID), AVA_CHAIN_ID);

let avm = avalanche.XChain();
avm.setTxFee(new BN(AVAX_FEE));

let keyStore = avalanche.NodeKeys()
let xKeychain = avm.keyChain();

const AVA_CONFIG = {
    AVA_IP: AVA_IP,
    AVA_PORT_LOCAL: AVA_PORT_LOCAL,
    AVA_PORT: AVA_PORT,
    AVA_PROTOCOL_LOCAL: AVA_PROTOCOL_LOCAL,
    AVA_PROTOCOL: AVA_PROTOCOL,
    AVA_NETWORK_ID: AVA_NETWORK_ID,
    AVA_RPC_URL: AVA_RPC_URL,
    AVA_CHAIN_ID_LOCAL: AVA_CHAIN_ID_LOCAL,
    AVA_CHAIN_ID: AVA_CHAIN_ID,
    AVAX_FEE: AVAX_FEE,
    ASSET_ID: ASSET_ID,
    X_CHAIN_ENDPOINT: X_CHAIN_ENDPOINT,
    KEYSTORE_ENDPOINT: KEYSTORE_ENDPOINT,
    BUILD_GENESIS_ENDPOINT: BUILD_GENESIS_ENDPOINT,
};

console.log(AVA_CONFIG);

module.exports = {
    avalanche,
    avm,
    keyStore,
    xKeychain,
    bintools,
    AVA_CONFIG,
    BN
};
