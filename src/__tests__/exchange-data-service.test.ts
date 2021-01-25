require("dotenv").config({ path: __dirname + "/../../.env" });

import { SDKv2, Orderbook, Ticker, Chart } from "..";
import moment from "moment";
import WebSocket from "isomorphic-ws";
import { Periodicity } from "../chart/interfaces/periodicity.interface";

const exchange = process.env.SDK_EXCHANGE || "";
const environment = process.env.SDK_ENVIRONMENT || "";

let sdk: SDKv2;
let ws: WebSocket;

beforeAll(async () => {
  sdk = new SDKv2(exchange, environment);
  ws = await sdk.edsWebsocketFactory();
});

test("sdk.getProducts", async () => {
  const products = await sdk.getProducts();

  expect(products).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        id: "BTC",
      }),
      expect.objectContaining({
        id: "USD",
      }),
    ])
  );
});

test("sdk.getInstruments", async () => {
  const instruments = await sdk.getInstruments();
  expect(instruments).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        id: "BTCUSD",
      }),
    ])
  );
});

test("chart.getHistoricalBars", async () => {
  const chart = new Chart(ws, "DEMO", "BTCUSD");
  const starTime = moment().subtract(3, "days").toDate();
  const endTime = moment().toDate();

  for (let periodicity of ["day", "hour", "minute"]) {
    const bars = await chart.getHistoricalBars(
      starTime,
      endTime,
      periodicity as Periodicity
    );
    expect(bars.length).toBeTruthy();
  }
});

test("chart.subscribeCurrentBars & unsubscribeCurrentBars", (): Promise<void> => {
  return new Promise((resolve) => {
    const chart = new Chart(ws, "DEMO", "BTCUSD");
    chart.onCurrentBarsUpdate = jest.fn((currentBar) => {
      ["timestamp", "open_ask", "open_bid", "volume"].forEach((prop) => {
        expect(currentBar).toHaveProperty(prop);
      });
      chart.unsubscribeCurrentBars("hour");
      resolve();
    });
    chart.subscribeCurrenBars("hour");
  });
});

test("ticker.subscribe & unsubscribe", (): Promise<void> => {
  const callback = jest.fn((tickerRecord) => {
    ["ask", "bid", "volume"].forEach((prop) => {
      expect(tickerRecord).toHaveProperty(prop);
    });
  });

  return new Promise((resolve) => {
    const ticker = new Ticker("DEMO", "BTCUSD", (tickerRecord) => {
      callback(tickerRecord);
      ticker.unsubscribe();
      resolve();
    });
    ticker.subscribe(ws);
  });
});

test("orderbook manages subscriptions", async () => {
  const instruments = await sdk.getInstruments();
  ws.setMaxListeners(instruments.length);
  const orderbooks: Orderbook[] = [];
  for (const i of instruments) {
    const orderbook = new Orderbook("DEMO", i.id);
    orderbook.subscribe(ws);
    orderbooks.push(orderbook);
  }

  expect(ws.listeners("message").length).toBe(instruments.length);

  for (const orderbook of orderbooks) {
    orderbook.unsubscribe();
  }

  expect(ws.listeners("message").length).toBe(0);
});

test("orderbook.subscribe & unsubscribe", (): Promise<void> => {
  const callback = jest.fn((ob) => {
    expect(ob.getSellSide()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          side: "sell",
        }),
      ])
    );

    expect(ob.getBuySide()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          side: "buy",
        }),
      ])
    );
  });

  return new Promise((resolve) => {
    const orderbook = new Orderbook("DEMO", "BTCUSD", (ob) => {
      callback(ob);
      orderbook.unsubscribe();
      resolve();
    });
    orderbook.subscribe(ws);
  });
});

afterAll(async () => {
  ws.close();
});
