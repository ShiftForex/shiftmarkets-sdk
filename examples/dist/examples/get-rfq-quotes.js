"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
async function onAppReady() {
    const sdk = new src_1.SDKv2(process.env.SDK_EXCHANGE || "", process.env.SDK_ENVIRONMENT || "");
    const tokens = await sdk.login(process.env.SDK_USERNAME || "", process.env.SDK_PASSWORD || "");
    sdk.accessToken = tokens.client_access_token;
    const quote = await sdk.createRfqQuote("BTCUSD", 0.001);
    console.log("QUOTE", quote);
    const routes = await sdk.getRfqQuotes();
    console.log("ROUTES", routes);
}
onAppReady();
