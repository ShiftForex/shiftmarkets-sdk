"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
(async () => {
    const sdk = new src_1.SDKv2(process.env.SDK_EXCHANGE || "", process.env.SDK_ENVIRONMENT || "");
    const tokens = await sdk.login(process.env.SDK_USERNAME || "", process.env.SDK_PASSWORD || "");
    sdk.accessToken = tokens.client_access_token;
    // Retrieving a withdraw schema so that the user can provide additional schemaData
    const schemas = await sdk.getSchemas("BTC", "withdraw");
    console.log(schemas);
    // Set corresponding user data from form related to the schema
    const schemaData = { email: "test@gmail.com", phone: "311499212" };
    // Create withdraw request and wait till it will be completed/failed
    const btcAddress = "3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy";
    let withdrawTransaction = await sdk.createWithdraw("BTC", 0.001, btcAddress, "Sell", schemaData);
    while (!withdrawTransaction.iframe_url && withdrawTransaction.success) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const { txid, state_hash } = withdrawTransaction;
        withdrawTransaction = await sdk.getWalletTransaction(txid, state_hash, 5);
    }
    if (!withdrawTransaction.success) {
        console.error("Withdraw error", withdrawTransaction.message);
        return;
    }
    console.log("Iframe URL", withdrawTransaction.iframe_url);
})();
