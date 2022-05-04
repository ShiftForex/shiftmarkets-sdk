"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuotesAll = void 0;
const moment_1 = __importDefault(require("moment"));
class QuotesAll {
    constructor(exchange, onUpdate) {
        this.exchange = exchange;
        this.onUpdate = onUpdate;
        /**
         * Subscribe to quotes updates over Exchange Data Server websocket
         * @param ws
         */
        this.subscribeAll = (ws) => {
            this.ws = ws;
            this.ws.send(JSON.stringify({
                type: "subscribe",
                destination: `/topic/${this.exchange}/quotes-all`,
            }));
            this.ws.on("message", this._subscriptionHandler);
        };
        this.unsubscribeAll = () => {
            if (this.ws) {
                this.ws.send(JSON.stringify({
                    type: "unsubscribe",
                    destination: `/topic/${this.exchange}/quotes-all`,
                }));
                this.ws.off("message", this._subscriptionHandler);
            }
        };
        /**
         * Subscribe to slow quotes updates over Exchange Data Server websocket
         * @param ws
         */
        this.subscribeAllSlow = (ws) => {
            this.ws = ws;
            this.ws.send(JSON.stringify({
                type: "subscribe",
                destination: `/topic/${this.exchange}/quotes-all-slow`,
            }));
            this.ws.on("message", this._subscriptionHandler);
        };
        this.unsubscribeAllSlow = () => {
            if (this.ws) {
                this.ws.send(JSON.stringify({
                    type: "unsubscribe",
                    destination: `/topic/${this.exchange}/quotes-all-slow`,
                }));
                this.ws.off("message", this._subscriptionHandler);
            }
        };
        this._update = (records) => {
            if (this.onUpdate) {
                this.onUpdate(records);
            }
        };
        this._subscriptionHandler = (msg) => {
            const frame = JSON.parse(msg);
            const src = frame.source.match(/\/topic\/(.+)\/quotes-(.+)/);
            if (!src || src[1] != this.exchange) {
                return;
            }
            const records = (frame === null || frame === void 0 ? void 0 : frame.payload) || [];
            this._update(Array.isArray(records)
                ? records.map((record) => ({
                    /* @ts-ignore */
                    instrument: record.pair || record.instrument,
                    bid: parseFloat(record.bid),
                    ask: parseFloat(record.ask),
                    price_24h_change: parseFloat(record.price_24h_change),
                    price_24h_max: parseFloat(record.price_24h_max),
                    price_24h_min: parseFloat(record.price_24h_min),
                    volume_24h_change: parseFloat(record.volume_24h_change),
                    volume: record.volume,
                    date_ts: moment_1.default(record.date_ts).toDate(),
                }))
                : records);
        };
    }
}
exports.QuotesAll = QuotesAll;
