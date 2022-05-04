"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const node_rsa_1 = __importDefault(require("node-rsa"));
const axios_1 = __importDefault(require("axios"));
/**
 * Example how to use API keys to generate and validate signature for http requests
 * All the keys in this example are for demo purpose only, they will not work on live system
 * Please contact our support to get actual keys
 */
const API_KEY_ID = "7c00eeac-306b-6aa0-1181-78d20ff9d982";
const API_PUBLIC_KEY_FILENAME = "./my_public_api_key.pub";
const API_PRIVATE_KEY_FILENAME = "./my_private_api_key.pem";
// Function to generate signature for payload
function createSignature(payload) {
    const privateKey = fs_1.default.readFileSync(API_PRIVATE_KEY_FILENAME).toString();
    const rsaKey = new node_rsa_1.default();
    rsaKey.importKey(privateKey);
    return rsaKey.sign(payload).toString("base64");
}
// Function to verify signature for payload
// Usually, you don't need this on client side, it is just for demo purpose
function verifySignature(signature, payload) {
    const publicKey = fs_1.default.readFileSync(API_PUBLIC_KEY_FILENAME).toString();
    const rsaKey = new node_rsa_1.default();
    rsaKey.importKey(publicKey);
    return rsaKey.verify(Buffer.from(payload), signature, "buffer", "base64");
}
const payload = {
    label: "BTC Address for Order",
    user_custom_data: { username: "jenny.smith", article: "PN 12355" },
};
const signature = createSignature(JSON.stringify(payload));
const headers = {
    "API-KEY-ID": API_KEY_ID,
    "API-SIGNATURE": signature,
};
console.log("HTTP Headers", {
    headers,
});
const isVerified = verifySignature(signature, JSON.stringify(payload));
console.log("Signature verification", {
    isVerified,
});
axios_1.default({
    url: "https://nexus-pay.cryptosrvc.com/api/v1/wallet/BTC/address",
    method: "post",
    headers,
    data: payload,
})
    .then((response) => {
    console.log(response.data);
})
    .catch((error) => {
    console.error(error.message);
});
