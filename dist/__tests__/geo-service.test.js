"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config({ path: __dirname + "/../../.env" });
const __1 = require("..");
const exchange = process.env.SDK_EXCHANGE || "";
const environment = process.env.SDK_ENVIRONMENT || "";
const geoAccessToken = process.env.GEO_ACCESS_TOKEN || "";
let sdk;
beforeAll(() => {
    sdk = new __1.SDKv2(exchange, environment);
});
// NOTE: this test takes a few seconds so test it with --detectOpenHandles flag
test("sdk.getCurrentLocation", async () => {
    const location = await sdk.getCurrentLocation(geoAccessToken);
}, 15000);
//# sourceMappingURL=geo-service.test.js.map