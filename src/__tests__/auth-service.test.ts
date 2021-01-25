require("dotenv").config({ path: __dirname + "/../../.env" });

import { SDKv2 } from "..";
import { ExchangeTokenDto } from "../auth/dto/exchange-token.dto";

let sdk: SDKv2;
let tokens: ExchangeTokenDto;

const username = process.env.SDK_USERNAME || "";
const password = process.env.SDK_PASSWORD || "";
const userId = process.env.SDK_USER_ID || "";
const exchange = process.env.SDK_EXCHANGE || "";
const environment = process.env.SDK_ENVIRONMENT || "";

test("sdk.login", async () => {
  sdk = new SDKv2(exchange, environment);
  tokens = await sdk.login(username, password);
  // console.log(tokens.client_access_token);

  expect(tokens.client_access_token).toBeTruthy();
  sdk.accessToken = tokens.client_access_token;
});

test("sdk.refreshAccessToken", async () => {
  const newTokens = await sdk.refreshAccessToken(tokens.client_refresh_token);
  expect(tokens.client_access_token).toBeTruthy();
  expect(newTokens.client_access_token).not.toEqual(tokens.client_access_token);
  sdk.accessToken = newTokens.client_access_token;
});

test("sdk.getUserAttributes", async () => {
  const attributes = await sdk.getUserAttributes();
  expect(attributes).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        name: "sub",
        value: userId,
      }),
      expect.objectContaining({
        name: "email",
        value: username,
      }),
    ])
  );
});
