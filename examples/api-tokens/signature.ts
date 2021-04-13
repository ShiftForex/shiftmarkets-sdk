import fs from "fs";
import NodeRSA from "node-rsa";
import axios from "axios";

/**
 * Example how to use API keys to generate and validate signature for http requests
 * All the keys in this example are for demo purpose only, they will not work on live system
 * Please contact our support to get actual keys
 */
const API_KEY_ID = "7c00eeac-306b-6aa0-1181-78d20ff9d982";
const API_PUBLIC_KEY_FILENAME = "./my_public_api_key.pub";
const API_PRIVATE_KEY_FILENAME = "./my_private_api_key.pem";

// Function to generate signature for payload
function createSignature(payload: string) {
  const privateKey = fs.readFileSync(API_PRIVATE_KEY_FILENAME).toString();
  const rsaKey = new NodeRSA();
  rsaKey.importKey(privateKey);
  return rsaKey.sign(payload).toString("base64");
}

// Function to verify signature for payload
// Usually, you don't need this on client side, it is just for demo purpose
function verifySignature(signature: string, payload: string) {
  const publicKey = fs.readFileSync(API_PUBLIC_KEY_FILENAME).toString();
  const rsaKey = new NodeRSA();
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

axios({
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
