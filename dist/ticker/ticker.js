"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ticker = void 0;
const moment_1 = __importDefault(require("moment"));
class Ticker {
    constructor(exchange, instrument, onUpdate) {
        this.exchange = exchange;
        this.instrument = instrument;
        this.onUpdate = onUpdate;
    }
    /**
     * Update ticker with actual values
     * @param record
     */
    update(record) {
        this.record = record;
        if (this.onUpdate) {
            this.onUpdate(record);
        }
    }
    /**
     * Subscribe to updates over Exchange Data Server websocket
     * @param ws
     */
    subscribe(ws) {
        this.ws = ws;
        this.ws.send(JSON.stringify({
            type: "subscribe",
            destination: `/topic/${this.exchange}/quotes-${this.instrument}`,
        }));
        if (!this.sub) {
            this.sub = this.subscriptionHandler.bind(this);
            this.ws.on("message", this.sub);
        }
    }
    /**
     * Unsubscribe from updates over Exchange Data Server websocket
     */
    unsubscribe() {
        if (this.ws) {
            this.ws.send(JSON.stringify({
                type: "unsubscribe",
                destination: `/topic/${this.exchange}/quotes-${this.instrument}`,
            }));
            if (this.sub) {
                this.ws.off("message", this.sub);
            }
        }
    }
    subscriptionHandler(msg) {
        const frame = JSON.parse(msg);
        const src = frame.source.match(/\/topic\/(.+)\/quotes-(.+)/);
        if (!src || src[2] != this.instrument || src[1] != this.exchange) {
            return;
        }
        const record = frame.payload;
        this.update({
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
        });
    }
}
exports.Ticker = Ticker;
//# sourceMappingURL=ticker.js.map