"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config({ path: __dirname + "/../../.env" });
const __1 = require("..");
const moment_1 = __importDefault(require("moment"));
const exchange = process.env.SDK_EXCHANGE || "";
const environment = process.env.SDK_ENVIRONMENT || "";
let sdk;
let ws;
beforeAll(async () => {
    sdk = new __1.SDKv2(exchange, environment);
    ws = await sdk.edsWebsocketFactory();
});
test("sdk.getProducts", async () => {
    const products = await sdk.getProducts();
    expect(products).toEqual(expect.arrayContaining([
        expect.objectContaining({
            id: "BTC",
        }),
        expect.objectContaining({
            id: "USD",
        }),
    ]));
});
test("sdk.getInstruments", async () => {
    const instruments = await sdk.getInstruments();
    expect(instruments).toEqual(expect.arrayContaining([
        expect.objectContaining({
            id: "BTCUSD",
        }),
    ]));
});
test("chart.getHistoricalBars", async () => {
    const chart = new __1.Chart(ws, "DEMO", "BTCUSD");
    const starTime = moment_1.default().subtract(3, "days").toDate();
    const endTime = moment_1.default().toDate();
    for (let periodicity of ["day", "hour", "minute"]) {
        const bars = await chart.getHistoricalBars(starTime, endTime, periodicity);
        expect(bars.length).toBeTruthy();
    }
});
test("chart.subscribeCurrentBars & unsubscribeCurrentBars", () => {
    return new Promise((resolve) => {
        const chart = new __1.Chart(ws, "DEMO", "BTCUSD");
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
test("ticker.subscribe & unsubscribe", () => {
    const callback = jest.fn((tickerRecord) => {
        ["ask", "bid", "volume"].forEach((prop) => {
            expect(tickerRecord).toHaveProperty(prop);
        });
    });
    return new Promise((resolve) => {
        const ticker = new __1.Ticker("DEMO", "BTCUSD", (tickerRecord) => {
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
    const orderbooks = [];
    for (const i of instruments) {
        const orderbook = new __1.Orderbook("DEMO", i.id);
        orderbook.subscribe(ws);
        orderbooks.push(orderbook);
    }
    expect(ws.listeners("message").length).toBe(instruments.length);
    for (const orderbook of orderbooks) {
        orderbook.unsubscribe();
    }
    expect(ws.listeners("message").length).toBe(0);
});
test("orderbook.subscribe & unsubscribe", () => {
    const callback = jest.fn((ob) => {
        expect(ob.getSellSide()).toEqual(expect.arrayContaining([
            expect.objectContaining({
                side: "sell",
            }),
        ]));
        expect(ob.getBuySide()).toEqual(expect.arrayContaining([
            expect.objectContaining({
                side: "buy",
            }),
        ]));
    });
    return new Promise((resolve) => {
        const orderbook = new __1.Orderbook("DEMO", "BTCUSD", (ob) => {
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
//# sourceMappingURL=exchange-data-service.test.js.map