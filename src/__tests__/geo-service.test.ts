require("dotenv").config({ path: __dirname + "/../../.env" });

import { SDKv2 } from "..";

const exchange = process.env.SDK_EXCHANGE || "";
const environment = process.env.SDK_ENVIRONMENT || "";
const geoAccessToken = process.env.GEO_ACCESS_TOKEN || "";

let sdk: SDKv2;

beforeAll(() => {
  sdk = new SDKv2(exchange, environment);
});

test(
  "sdk.getCurrentLocation",
  async () => {
    const location = await sdk.getCurrentLocation(geoAccessToken);
  },
  15000,
);
