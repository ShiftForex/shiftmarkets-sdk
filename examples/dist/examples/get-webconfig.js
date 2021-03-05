"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
async function onAppReady() {
    const sdk = new src_1.SDKv2(process.env.SDK_EXCHANGE || "", process.env.SDK_ENVIRONMENT || "");
    const config = await sdk.getWebConfig();
    console.log("WEB CONFIG", JSON.stringify(config, undefined, " "));
}
onAppReady();
