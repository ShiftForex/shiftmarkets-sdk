"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
(async () => {
    const sdk = new src_1.SDKv2(process.env.SDK_EXCHANGE || "", process.env.SDK_ENVIRONMENT || "");
    const tokens = await sdk.login(process.env.SDK_USERNAME || "", process.env.SDK_PASSWORD || "");
    sdk.accessToken = tokens.client_access_token;
    // Retrieving a deposit schema so that the user can provide additional schemaData
    const schemas = await sdk.getSchemas("BTC", "deposit");
    console.log(schemas);
    // Set corresponding user data from form related to the schema
    const schemaData = { email: "test@gmail.com" };
    // Create deposit request and wait till it will be completed/failed
    const data = {
        product: "BTC",
        amount: 0.001,
        schemaName: "Sell",
        schemaData,
    };
    let depositTransaction = await sdk.createDeposit(data);
    while (!depositTransaction.iframe_url && depositTransaction.success) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const { txid, state_hash } = depositTransaction;
        depositTransaction = await sdk.getWalletTransaction(txid, state_hash, 5);
    }
    if (!depositTransaction.success) {
        console.error("Deposit error", depositTransaction.message);
        return;
    }
    console.log("Iframe URL", depositTransaction.iframe_url);
})();
