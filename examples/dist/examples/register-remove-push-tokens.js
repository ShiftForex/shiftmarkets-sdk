"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
(async () => {
    try {
        const sdk = new src_1.SDKv2(process.env.SDK_EXCHANGE || "", process.env.SDK_ENVIRONMENT || "");
        const tokens = await sdk.login(process.env.SDK_USERNAME || "", process.env.SDK_PASSWORD || "");
        sdk.accessToken = tokens.client_access_token;
        await sdk.registerPushToken("TOKEN");
        setTimeout(async () => {
            await sdk.removePushToken("TOKEN");
        }, 10000);
    }
    catch (e) {
        console.log(e);
    }
})();
