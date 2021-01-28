"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
async function onAppReady() {
    const sdk = new src_1.SDKv2(process.env.SDK_EXCHANGE || "", process.env.SDK_ENVIRONMENT || "");
    const tokens = await sdk.login(process.env.SDK_USERNAME || "", process.env.SDK_PASSWORD || "");
    sdk.accessToken = tokens.client_access_token;
    const instruments = await sdk.getInstruments();
    console.log("INSTRUMENTS", JSON.stringify(instruments, undefined, " "));
    const products = await sdk.getProducts();
    console.log("PRODUCTS", JSON.stringify(products, undefined, " "));
}
onAppReady();
/* OUTPUT
INSTRUMENTS [
 {
  "id": "BTCJPY",
  "name": "BTCJPY",
  "base_product": "BTC",
  "quote_product": "JPY",
  "quantity_decimals": 8,
  "quantity_increment": "0.001",
  "price_decimals": 6,
  "available_destinations": [
   "SHIFTFX"
  ],
  "min_quantity": 0.001,
  "max_quantity": 10,
  "type": "crypto",
  "tick_size": "0.00001",
  "fees": {
   "buy": {
    "progressive_commission_method": "quantity_percent",
    "flat_commission_method": "exact_value",
    "maker_commission_progressive": 0.18,
    "taker_commission_progressive": 0.18,
    "maker_commission_flat": 0,
    "taker_commission_flat": 0,
    "source": "destination_account"
   },
   "sell": {
    "progressive_commission_method": "quantity_percent",
    "flat_commission_method": "exact_value",
    "maker_commission_progressive": 0.18,
    "taker_commission_progressive": 0.18,
    "maker_commission_flat": 0,
    "taker_commission_flat": 0,
    "source": "destination_account"
   }
  }
 },
 {
  "id": "ETHEUR",
  "name": "ETHEUR",
  "base_product": "ETH",
  "quote_product": "EUR",
  "quantity_decimals": 18,
  "quantity_increment": "0.001",
  "price_decimals": 4,
  "available_destinations": [
   "SHIFTFX"
  ],
  "min_quantity": 0.02,
  "max_quantity": 500,
  "type": "crypto",
  "tick_size": "0.0001",
  "fees": {
   "buy": {
    "progressive_commission_method": "quantity_percent",
    "flat_commission_method": "exact_value",
    "maker_commission_progressive": 0.18,
    "taker_commission_progressive": 0.18,
    "maker_commission_flat": 0,
    "taker_commission_flat": 0,
    "source": "destination_account"
   },
   "sell": {
    "progressive_commission_method": "quantity_percent",
    "flat_commission_method": "exact_value",
    "maker_commission_progressive": 0.18,
    "taker_commission_progressive": 0.18,
    "maker_commission_flat": 0,
    "taker_commission_flat": 0,
    "source": "destination_account"
   }
  }
 },
 {
  "id": "ETHCAD",
  "name": "ETHCAD",
  "base_product": "ETC",
  "quote_product": "CAD",
  "quantity_decimals": 8,
  "quantity_increment": "0.001",
  "price_decimals": 4,
  "available_destinations": [
   "SHIFTFX"
  ],
  "min_quantity": 0.001,
  "max_quantity": 500,
  "type": "crypto",
  "tick_size": "0.0001",
  "fees": {
   "buy": {
    "progressive_commission_method": "quantity_percent",
    "flat_commission_method": "exact_value",
    "maker_commission_progressive": 0.18,
    "taker_commission_progressive": 0.18,
    "maker_commission_flat": 0,
    "taker_commission_flat": 0,
    "source": "destination_account"
   },
   "sell": {
    "progressive_commission_method": "quantity_percent",
    "flat_commission_method": "exact_value",
    "maker_commission_progressive": 0.18,
    "taker_commission_progressive": 0.18,
    "maker_commission_flat": 0,
    "taker_commission_flat": 0,
    "source": "destination_account"
   }
  }
 },
 ...
]
PRODUCTS [
 {
  "id": "ARS",
  "name": "ARS",
  "precision": 8,
  "type": "fiat",
  "deposit": {
   "available": 0,
   "commissions": {
    "flat": 0,
    "progressive": 0
   },
   "limits": {
    "daily": 1000000000,
    "weekly": 1000000000,
    "monthly": 1000000000
   }
  },
  "withdraw": {
   "available": 0,
   "commissions": {
    "flat": 0,
    "progressive": 0
   },
   "limits": {
    "daily": 1000000000,
    "weekly": 1000000000,
    "monthly": 1000000000
   }
  }
 },
 {
  "id": "JPY",
  "name": "JPY",
  "precision": 8,
  "type": "fiat",
  "deposit": {
   "available": 10000000,
   "commissions": {
    "flat": 0,
    "progressive": 0
   },
   "limits": {
    "daily": 10000000,
    "weekly": 10000000,
    "monthly": 10000000
   }
  },
  "withdraw": {
   "available": 0,
   "commissions": {
    "flat": 0,
    "progressive": 0
   },
   "limits": {
    "daily": 10000000,
    "weekly": 10000000,
    "monthly": 10000000
   }
  }
 },
 {
   ...
]
*/
