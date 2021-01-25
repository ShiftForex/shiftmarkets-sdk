import { SDKv2, Orderbook, Ticker } from "../src";

async function onAppReady() {
  const exchange = process.env.SDK_EXCHANGE || "";
  const sdk = new SDKv2(exchange, process.env.SDK_ENVIRONMENT || "");

  const instrument = "BTCUSD";
  console.log(`Subscribe ${instrument}`);
  const ws = await sdk.edsWebsocketFactory();
  const ticker = new Ticker(exchange, instrument, (t) => {
    console.log("TICKER", t);
  });
  const orderbook = new Orderbook(exchange, instrument, (t: Orderbook) => {
    console.log("ORDERBOOK_BUY", t.getBuySide());
    console.log("ORDERBOOK_SELL", t.getSellSide());
  });
  ticker.subscribe(ws);
  orderbook.subscribe(ws);

  // Wait for 30 secs and then unsubscribe
  await new Promise((resolve) => setTimeout(resolve, 30000));
  ticker.unsubscribe();
  orderbook.unsubscribe();
}

onAppReady();

/* OUTPUT
Subscribe BTCUSD
TICKER {
  instrument: 'BTCUSD',
  bid: 10975.10348,
  ask: 10979.14663,
  price_24h_change: 142.86005,
  price_24h_max: 11040.9759,
  price_24h_min: 10764.21512,
  volume_24h_change: 142.86005,
  volume: 0,
  date_ts: 2020-09-18T09:43:34.000Z
}
ORDERBOOK_BUY [
  { price: 10970.01425, volume: 0.135, side: 'buy' },
  { price: 10970.36419, volume: 0.246, side: 'buy' },
  { price: 10970.52417, volume: 0.03, side: 'buy' },
  { price: 10971.08409, volume: 0.05, side: 'buy' },
  { price: 10971.86397, volume: 1.6602, side: 'buy' },
  { price: 10972.00395, volume: 0.804, side: 'buy' },
  { price: 10972.77383, volume: 0.18028, side: 'buy' },
  { price: 10972.86382, volume: 0.03792, side: 'buy' },
  { price: 10972.9938, volume: 0.04, side: 'buy' },
  { price: 10973.10378, volume: 0.09016, side: 'buy' },
  { price: 10973.11378, volume: 0.002, side: 'buy' },
  { price: 10973.19377, volume: 0.24292, side: 'buy' },
  { price: 10973.25376, volume: 0.11422, side: 'buy' },
  { price: 10973.94366, volume: 0.09012, side: 'buy' },
  { price: 10974.50357, volume: 0.02, side: 'buy' },
  { price: 10974.58356, volume: 0.04239, side: 'buy' },
  { price: 10975.10348, volume: 0.00902, side: 'buy' }
]
ORDERBOOK_SELL [
  { price: 10985.66761, volume: 0.05462, side: 'sell' },
  { price: 10985.6376, volume: 0.02609, side: 'sell' },
  { price: 10985.37756, volume: 2.42, side: 'sell' },
  { price: 10983.98736, volume: 0.09012, side: 'sell' },
  { price: 10983.71732, volume: 1.648, side: 'sell' },
  { price: 10983.69731, volume: 0.02, side: 'sell' },
  { price: 10982.15708, volume: 0.00902, side: 'sell' },
  { price: 10982.01706, volume: 0.04, side: 'sell' },
  { price: 10981.51699, volume: 0.03709, side: 'sell' },
  { price: 10981.19694, volume: 0.08, side: 'sell' },
  { price: 10981.14693, volume: 2.097, side: 'sell' },
  { price: 10980.54684, volume: 0.4, side: 'sell' },
  { price: 10980.49683, volume: 0.1, side: 'sell' },
  { price: 10979.77672, volume: 0.05, side: 'sell' },
  { price: 10979.30665, volume: 1.99113, side: 'sell' },
  { price: 10979.29665, volume: 1.2, side: 'sell' },
  { price: 10979.14663, volume: 1.25546, side: 'sell' }
]
...
*/
