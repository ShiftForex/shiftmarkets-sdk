"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
function onUserEvent(data) {
    console.log("from ws", data);
}
(async () => {
    const sdk = new src_1.SDKv2(process.env.SDK_EXCHANGE || "", process.env.SDK_ENVIRONMENT || "");
    // Login user
    const tokens = await sdk.login(process.env.SDK_USERNAME || "", process.env.SDK_PASSWORD || "");
    sdk.accessToken = tokens.client_access_token;
    // Subscribe to all user notifications
    const ws = await sdk.notificationWebsocketFactory();
    await new src_1.NotificationEvents(ws).subscribeEvents(sdk.accessToken, onUserEvent);
    setTimeout(() => {
        // close websocket when you don't need it
        ws.close();
    }, 60000);
    // Create order
    let order = await sdk.createOrder({
        instrument: "BTCUSD",
        quantity: 1,
        side: "buy",
        type: "limit",
        time_in_force: "gtd",
        limit_price: 0.2,
    });
    console.log(order);
    // Get order
    order = await sdk.getOrder(order.id);
    console.log(order);
    // Cancel order
    setTimeout(async () => {
        await sdk.cancelOrder(order.id);
    }, 10000);
})();
