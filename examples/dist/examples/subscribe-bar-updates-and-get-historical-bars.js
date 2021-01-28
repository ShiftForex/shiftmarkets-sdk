"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
async function onAppReady() {
    const exchange = process.env.SDK_EXCHANGE || "";
    const sdk = new src_1.SDKv2(exchange, process.env.SDK_ENVIRONMENT || "");
    const instrument = "BTCUSD";
    const ws = await sdk.edsWebsocketFactory();
    const chart = new src_1.Chart(ws, exchange, instrument);
    const startTime = new Date(Date.now() - 500 * 3600000);
    const endTime = new Date();
    // Get historical bars for the last 500 hours with hour period
    const historicalBars = await chart.getHistoricalBars(startTime, endTime, "hour");
    console.log("Historical bars", historicalBars);
    // Handle bar update
    chart.onCurrentBarsUpdate = (bar) => {
        console.log("Historical bar", bar);
    };
    console.log(`Subscribe ${instrument}`);
    chart.subscribeCurrentBars("minute15");
    // Wait for 30 secs and then unsubscribe
    await new Promise((resolve) => setTimeout(resolve, 30000));
    chart.unsubscribeCurrentBars("minute15");
}
onAppReady();
/* OUTPUT
Historical bars [
  {
    timestamp: 2020-09-02T21:00:00.000Z,
    open_ask: 11403.15022,
    high_ask: 11403.15022,
    low_ask: 11322.3581,
    close_ask: 11375.7061,
    open_bid: 11399.71978,
    high_bid: 11399.71978,
    low_bid: 11318.78192,
    close_bid: 11372.16391,
    volume: 0.39321
  },
  {
    timestamp: 2020-09-02T22:00:00.000Z,
    open_ask: 11375.7061,
    high_ask: 11391.96854,
    low_ask: 11360.75386,
    close_ask: 11391.7085,
    open_bid: 11372.16391,
    high_bid: 11388.2815,
    low_bid: 11356.14632,
    close_bid: 11388.2815,
    volume: 1.10144
  },
  {
    timestamp: 2020-09-02T23:00:00.000Z,
    open_ask: 11391.6985,
    high_ask: 11451.28744,
    low_ask: 11383.47727,
    close_ask: 11440.73586,
    open_bid: 11388.2815,
    high_bid: 11447.84256,
    low_bid: 11379.34284,
    close_bid: 11437.32414,
    volume: 0
  },
  {
    timestamp: 2020-09-03T00:00:00.000Z,
    open_ask: 11440.76586,
    high_ask: 11440.90588,
    low_ask: 11390.29829,
    close_ask: 11397.19933,
    open_bid: 11437.32414,
    high_bid: 11437.43412,
    low_bid: 11385.64189,
    close_bid: 11393.77067,
    volume: 0
  },
  {
    timestamp: 2020-09-03T01:00:00.000Z,
    open_ask: 11397.19933,
    high_ask: 11456.06816,
    low_ask: 11373.97585,
    close_ask: 11421.58299,
    open_bid: 11393.77067,
    high_bid: 11451.92195,
    low_bid: 11370.00424,
    close_bid: 11418.14702,
    volume: 0.014
  },
  {
    timestamp: 2020-09-03T02:00:00.000Z,
    open_ask: 11421.58299,
    high_ask: 11444.11636,
    low_ask: 11389.82822,
    close_ask: 11439.14562,
    open_bid: 11418.14702,
    high_bid: 11440.03373,
    low_bid: 11385.23195,
    close_bid: 11436.45427,
    volume: 0.098
  },
  {
    timestamp: 2020-09-03T03:00:00.000Z,
    open_ask: 11439.14562,
    high_ask: 11451.40746,
    low_ask: 11409.53118,
    close_ask: 11435.38506,
    open_bid: 11435.01449,
    high_bid: 11447.63259,
    low_bid: 11405.40893,
    close_bid: 11431.94495,
    volume: 3.23326
  },
  {
    timestamp: 2020-09-03T04:00:00.000Z,
    open_ask: 11435.38506,
    high_ask: 11447.73691,
    low_ask: 11346.56173,
    close_ask: 11368.00495,
    open_bid: 11431.94495,
    high_bid: 11443.29324,
    low_bid: 11343.14827,
    close_bid: 11364.54506,
    volume: 0
  },
  ... 400 more items
]
Subscribe BTCUSD
Historical bar {
  timestamp: 2020-09-23T16:45:00.000Z,
  open_ask: 10464.92951,
  high_ask: 10498.44454,
  low_ask: 10462.09908,
  close_ask: 10496.2342,
  open_bid: 10461.78049,
  high_bid: 10494.85553,
  low_bid: 10456.46129,
  close_bid: 10493.0658,
  volume: 0
}
Historical bar {
  timestamp: 2020-09-23T16:45:00.000Z,
  open_ask: 10464.92951,
  high_ask: 10498.44454,
  low_ask: 10462.09908,
  close_ask: 10496.2242,
  open_bid: 10461.78049,
  high_bid: 10494.85553,
  low_bid: 10456.46129,
  close_bid: 10493.0658,
  volume: 0
}
Historical bar {
  timestamp: 2020-09-23T16:45:00.000Z,
  open_ask: 10464.92951,
  high_ask: 10498.44454,
  low_ask: 10462.09908,
  close_ask: 10496.2242,
  open_bid: 10461.78049,
  high_bid: 10494.85553,
  low_bid: 10456.46129,
  close_bid: 10493.0658,
  volume: 0
}
Historical bar {
  timestamp: 2020-09-23T16:45:00.000Z,
  open_ask: 10464.92951,
  high_ask: 10498.44454,
  low_ask: 10462.09908,
  close_ask: 10496.2242,
  open_bid: 10461.78049,
  high_bid: 10494.85553,
  low_bid: 10456.46129,
  close_bid: 10493.0658,
  volume: 0
}
*/
