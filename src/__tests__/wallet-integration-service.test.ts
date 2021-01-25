require("dotenv").config({ path: __dirname + "/../../.env" });

import { SDKv2 } from "..";
import { ExchangeTokenDto } from "../auth/dto/exchange-token.dto";

const exchange = process.env.SDK_EXCHANGE || "";
const username = process.env.SDK_USERNAME || "";
const password = process.env.SDK_PASSWORD || "";
const environment = process.env.SDK_ENVIRONMENT || "";

let sdk: SDKv2;
let tokens: ExchangeTokenDto;

test("sdk.login", async () => {
  sdk = new SDKv2(exchange, environment);
  tokens = await sdk.login(username, password);
  expect(tokens.client_access_token).toBeTruthy();
  sdk.accessToken = tokens.client_access_token;
});

test("sdk.createDeposit", async () => {
  const result = await sdk.createDeposit("USD", 10);
  // console.log(result);
});

test("sdk.getPaymentRoutes", async () => {
  const result = await sdk.getPaymentRoutes();
  // console.log(result);
});

test("sdk.getPaymentOptions", async () => {
  const result = await sdk.getPaymentOptions("BCH");
  // console.log(result);
});

test("sdk.getSchemas", async () => {
  const resultDeposit = await sdk.getSchemas("BCH", "deposit");
  // console.log(resultDeposit);
  const resultWithdraw = await sdk.getSchemas("BCH", "withdraw");
  // console.log(resultWithdraw);
});
