"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config({ path: __dirname + "/../../.env" });
const __1 = require("..");
test("getVWAP", async () => {
    const orderbook = new __1.Orderbook("TEST", "BTCUSD");
    orderbook.update([
        { price: 1.8571, volume: 1, side: "sell" },
        { price: 1.8572, volume: 1, side: "sell" },
        { price: 1.8573, volume: 1, side: "sell" },
        { price: 1.8576, volume: 1, side: "sell" },
        { price: 1.8561, volume: 1, side: "sell" },
        { price: 1.8562, volume: 1, side: "sell" },
        { price: 1.8563, volume: 1, side: "sell" },
    ]);
    const vwap = orderbook.getVolumeWeightedAvgPrice("sell", 3);
    expect(vwap).toEqual({ price: 1.8562, volume: 3 });
});
test("getQuoteVWAP", async () => {
    const orderbook = new __1.Orderbook("TEST", "BTCUSD");
    orderbook.update([
        { price: 1.8571, volume: 1, side: "sell" },
        { price: 1.8572, volume: 1, side: "sell" },
        { price: 1.8573, volume: 1, side: "sell" },
        { price: 1.8576, volume: 1, side: "sell" },
        { price: 1.8561, volume: 1, side: "sell" },
        { price: 1.8562, volume: 1, side: "sell" },
        { price: 1.8563, volume: 1, side: "sell" },
    ]);
    const vwap = orderbook.calculateQuoteVolumeVWAP("sell", 3);
    expect(vwap).toEqual({ price: 1.8563119308333336, volume: 3 });
});
test("precised records sell", async () => {
    const orderbook = new __1.Orderbook("TEST", "BTCUSD");
    orderbook.update([
        { price: 1.8571, volume: 1, side: "sell" },
        { price: 1.8572, volume: 1, side: "sell" },
        { price: 1.8573, volume: 1, side: "sell" },
        { price: 1.8576, volume: 1, side: "sell" },
        { price: 1.8561, volume: 1, side: "sell" },
        { price: 1.8562, volume: 1, side: "sell" },
        { price: 1.8563, volume: 1, side: "sell" },
    ]);
    expect(orderbook.getSellSide(3)).toEqual([
        { price: 1.856, volume: 3, side: "sell" },
        { price: 1.857, volume: 3, side: "sell" },
        { price: 1.858, volume: 1, side: "sell" },
    ]);
});
test("precised records buy", async () => {
    const orderbook = new __1.Orderbook("TEST", "BTCUSD");
    orderbook.update([
        { price: 1.8571, volume: 1, side: "buy" },
        { price: 1.8572, volume: 1, side: "buy" },
        { price: 1.8573, volume: 1, side: "buy" },
        { price: 1.8576, volume: 1, side: "buy" },
        { price: 1.8561, volume: 1, side: "buy" },
        { price: 1.8562, volume: 1, side: "buy" },
        { price: 1.8563, volume: 1, side: "buy" },
    ]);
    expect(orderbook.getBuySide(3)).toEqual([
        { price: 1.858, volume: 1, side: "buy" },
        { price: 1.857, volume: 3, side: "buy" },
        { price: 1.856, volume: 3, side: "buy" },
    ]);
});
//# sourceMappingURL=orderbook.test.js.map