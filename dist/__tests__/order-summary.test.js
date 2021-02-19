"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const interfaces_1 = require("../order-summary/interfaces");
const order_summary_1 = require("../order-summary/order-summary");
const _payload_1 = __importStar(require("../order-summary/_payload"));
const cases = [
    {
        name: "First",
        data: (_payload) => ({
            ..._payload_1.default,
        }),
        result: (result) => {
            expect(result.fees).toBe(0.002);
            expect(result.price).toBe(10050);
            expect(result.amount).toBe(20100);
            expect(result.net).toBe(1.998);
            expect(result.total).toBe(2);
            expect(result.totalProduct).toBe('BTC');
            expect(result.totalDecimals).toBe(8);
            expect(result.feeDecimals).toBe(8);
            expect(result.feeProduct).toBe('BTC');
            expect(result.netProduct).toBe('BTC');
            expect(result.amountDecimals).toBe(2);
            expect(result.amountProduct).toBe('USD');
            expect(result.currentProduct).toBe('BTC');
            expect(result.isQuote).toBe(false);
        }
    },
    {
        name: "Second",
        data: (_payload) => ({
            ..._payload_1.default,
            amount: 4,
            commissionAccount: interfaces_1.AccountType.sourceAccount,
        }),
        result: (result) => {
            expect(result.fees).toBe(40.6);
            expect(result.price).toBe(10150);
            expect(result.amount).toBe(4);
            expect(result.net).toBe(40600);
            expect(result.total).toBe(40640.6);
            expect(result.totalProduct).toBe('USD');
            expect(result.totalDecimals).toBe(2);
            expect(result.feeDecimals).toBe(2);
            expect(result.feeProduct).toBe('USD');
            expect(result.netProduct).toBe('BTC');
            expect(result.amountDecimals).toBe(2);
            expect(result.amountProduct).toBe('USD');
            expect(result.currentProduct).toBe('BTC');
            expect(result.isQuote).toBe(false);
        }
    },
    {
        name: "Third",
        data: (_payload) => ({
            ..._payload_1.default,
            amount: 0.005,
            action: _payload_1._Action.Sell,
            commissionAccount: interfaces_1.AccountType.sourceAccount,
        }),
        result: (result) => {
            expect(result.fees).toBe(0.000005);
            expect(result.price).toBe(10000);
            expect(result.amount).toBe(50);
            expect(result.net).toBe(0.005);
            expect(result.total).toBe(0.005005);
            expect(result.totalProduct).toBe('BTC');
            expect(result.totalDecimals).toBe(8);
            expect(result.feeDecimals).toBe(8);
            expect(result.feeProduct).toBe('BTC');
            expect(result.netProduct).toBe('USD');
            expect(result.amountDecimals).toBe(8);
            expect(result.amountProduct).toBe('BTC');
            expect(result.currentProduct).toBe('BTC');
            expect(result.isQuote).toBe(false);
        }
    },
    {
        name: "Fourth",
        data: (_payload) => ({
            ..._payload,
            amount: 8,
            action: _payload_1._Action.Sell,
        }),
        result: (result) => {
            expect(result.fees).toBe(82.4);
            expect(result.price).toBe(10300);
            expect(result.amount).toBe(8);
            expect(result.net).toBe(82317.6);
            expect(result.total).toBe(82400);
            expect(result.totalProduct).toBe('USD');
            expect(result.totalDecimals).toBe(2);
            expect(result.feeDecimals).toBe(2);
            expect(result.feeProduct).toBe('USD');
            expect(result.netProduct).toBe('USD');
            expect(result.amountDecimals).toBe(8);
            expect(result.amountProduct).toBe('BTC');
            expect(result.currentProduct).toBe('BTC');
            expect(result.isQuote).toBe(false);
        }
    },
    {
        name: "Fifth",
        data: (_payload) => ({
            ..._payload,
            amount: 21550.35,
            currentProduct: 'USD',
            commissionAccount: interfaces_1.AccountType.sourceAccount,
        }),
        result: (result) => {
            expect(result.fees).toBe(21.55035);
            expect(result.price).toBe(10060.327094455542);
            expect(result.amount).toBe(2.1421122591408435);
            expect(result.net).toBe(21550.35);
            expect(result.total).toBe(21571.90035);
            expect(result.totalProduct).toBe('USD');
            expect(result.totalDecimals).toBe(2);
            expect(result.feeDecimals).toBe(2);
            expect(result.feeProduct).toBe('USD');
            expect(result.netProduct).toBe('USD');
            expect(result.amountDecimals).toBe(2);
            expect(result.amountProduct).toBe('USD');
            expect(result.currentProduct).toBe('USD');
            expect(result.isQuote).toBe(true);
        }
    },
    {
        name: "Sixth",
        data: (_payload) => ({
            ..._payload,
            amount: 5000,
            currentProduct: 'USD',
        }),
        result: (result) => {
            expect(result.fees).toBe(0.0005);
            expect(result.price).toBe(10000);
            expect(result.amount).toBe(5000);
            expect(result.net).toBe(0.4995);
            expect(result.total).toBe(0.5);
            expect(result.totalProduct).toBe('BTC');
            expect(result.totalDecimals).toBe(8);
            expect(result.feeDecimals).toBe(8);
            expect(result.feeProduct).toBe('BTC');
            expect(result.netProduct).toBe('BTC');
            expect(result.amountDecimals).toBe(2);
            expect(result.amountProduct).toBe('USD');
            expect(result.currentProduct).toBe('USD');
            expect(result.isQuote).toBe(true);
        }
    },
    {
        name: "Seventh",
        data: (_payload) => ({
            ..._payload,
            amount: 3750,
            currentProduct: 'USD',
            action: _payload_1._Action.Sell,
            commissionAccount: interfaces_1.AccountType.sourceAccount,
        }),
        result: (result) => {
            expect(result.fees).toBe(0.000375);
            expect(result.price).toBe(10000);
            expect(result.amount).toBe(3750);
            expect(result.net).toBe(0.374625);
            expect(result.total).toBe(0.375375);
            expect(result.totalProduct).toBe('USD');
            expect(result.totalDecimals).toBe(2);
            expect(result.feeDecimals).toBe(8);
            expect(result.feeProduct).toBe('BTC');
            expect(result.netProduct).toBe('BTC');
            expect(result.amountDecimals).toBe(2);
            expect(result.amountProduct).toBe('USD');
            expect(result.currentProduct).toBe('USD');
            expect(result.isQuote).toBe(true);
        }
    },
    {
        name: "Eighth",
        data: (_payload) => ({
            ..._payload,
            amount: 2500,
            currentProduct: 'USD',
            action: _payload_1._Action.Sell,
        }),
        result: (result) => {
            expect(result.fees).toBe(2.5);
            expect(result.price).toBe(10000);
            expect(result.amount).toBe(0.25);
            expect(result.net).toBe(2497.5);
            expect(result.total).toBe(2500);
            expect(result.totalProduct).toBe('USD');
            expect(result.totalDecimals).toBe(2);
            expect(result.feeDecimals).toBe(2);
            expect(result.feeProduct).toBe('USD');
            expect(result.netProduct).toBe('USD');
            expect(result.amountDecimals).toBe(8);
            expect(result.amountProduct).toBe('BTC');
            expect(result.currentProduct).toBe('USD');
            expect(result.isQuote).toBe(true);
        }
    },
];
cases.forEach((_case) => {
    const orderSummary = new order_summary_1.OrderSummary();
    orderSummary.initValues(_case.data(_payload_1.default));
    test(_case.name, () => {
        _case.result(orderSummary.getValues());
    });
});
//# sourceMappingURL=order-summary.test.js.map