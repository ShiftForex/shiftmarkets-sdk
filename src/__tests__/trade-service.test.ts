require("dotenv").config({ path: __dirname + "/../../.env" });

import { SDKv2 } from "..";
import { ExchangeTokenDto } from "../auth/dto/exchange-token.dto";

let sdk: SDKv2;
let tokens: ExchangeTokenDto;

const exchange = process.env.SDK_EXCHANGE || "";
const username = process.env.SDK_USERNAME || "";
const password = process.env.SDK_PASSWORD || "";
const environment = process.env.SDK_ENVIRONMENT || "";

test("sdk.login", async () => {
  sdk = new SDKv2(exchange, environment);
  tokens = await sdk.login(username, password);
  expect(tokens.client_access_token).toBeTruthy();
  // console.log(tokens);
  sdk.accessToken = tokens.client_access_token;
});

test("sdk.getActivity", async () => {
  const activity = await sdk.getActivity({ pager_limit: 5 });
  // console.log(activity);
});

test("sdk.getAccounts", async () => {
  const accounts = await sdk.getAccounts();
  expect(accounts).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        id: expect.any(String),
        product: expect.any(String),
        balance: {
          trade: expect.any(Number),
          withdraw: expect.any(Number),
        },
      }),
    ])
  );
  // console.log(accounts);
});

test("sdk.createOrder sell limit fok ", async () => {
  const order = await sdk.createOrder({
    instrument: "BTCUSD",
    quantity: 0.01,
    side: "sell",
    type: "limit",
    time_in_force: "fok",
    limit_price: 9000,
  });
  expect(order.id).toBeTruthy();
  expect(order).toEqual(
    expect.objectContaining({
      id: expect.any(String),
      status: "pending_new",
    })
  );
});

test("sdk.createOrder buy limit fok", async () => {
  const order = await sdk.createOrder({
    instrument: "BTCUSD",
    quantity: 0.01,
    side: "buy",
    type: "limit",
    time_in_force: "fok",
    limit_price: 9000,
  });

  expect(order.id).toBeTruthy();
  expect(order).toEqual(
    expect.objectContaining({
      id: expect.any(String),
      status: "pending_new",
    })
  );
});

test("sdk.createOrder buy market fok", async () => {
  const order = await sdk.createOrder({
    instrument: "BTCUSD",
    quantity: 0.01,
    side: "buy",
    type: "market",
    time_in_force: "fok",
  });
  expect(order.id).toBeTruthy();
  expect(order).toEqual(
    expect.objectContaining({
      id: expect.any(String),
      status: "pending_new",
    })
  );
});

test("sdk.createOrder sell market fok", async () => {
  const order = await sdk.createOrder({
    instrument: "BTCUSD",
    quantity: 0.01,
    side: "sell",
    type: "market",
    time_in_force: "fok",
  });
  expect(order.id).toBeTruthy();
  expect(order).toEqual(
    expect.objectContaining({
      id: expect.any(String),
      status: "pending_new",
    })
  );
});

test("sdk.createRfqQuote", async () => {
  const quote = await sdk.createRfqQuote("BTCUSD", 0.01);
  expect(quote.quote_id).toBeTruthy();
  expect(quote).toEqual(
    expect.objectContaining({
      ask: expect.any(Number),
      bid: expect.any(Number),
      buy_quantity_filled: expect.any(Number),
      buy_quantity_remaining: expect.any(Number),
      expires: expect.any(String),
      instrument: "BTCUSD",
      quote_id: expect.any(String),
      fees_in_price: expect.any(Boolean),
      sell_quantity_filled: expect.any(Number),
      sell_quantity_remaining: expect.any(Number),
    })
  );
});
