"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chart = void 0;
const moment_1 = __importDefault(require("moment"));
const identificator_helper_1 = require("../common/identificator.helper");
class Chart {
    constructor(ws, exchange, instrument) {
        this.ws = ws;
        this.exchange = exchange;
        this.instrument = instrument;
        this.subs = new Map();
    }
    /**
     * Subscribe to real time updates
     * @param periodicity
     * @deprecated This method has wrong spelling
     */
    subscribeCurrenBars(periodicity) {
        return this.subscribeCurrentBars(periodicity);
    }
    /**
     * Subscribe to real time updates
     * @param periodicity
     */
    subscribeCurrentBars(periodicity) {
        this.ws.send(JSON.stringify({
            type: "subscribe",
            destination: `/topic/${this.exchange}/current-bars/${this.instrument}/${periodicity}`,
        }));
        const sub = this.subscriptionHandler.bind(this);
        if (!this.subs.has(periodicity)) {
            this.subs.set(periodicity, sub);
            this.ws.on("message", sub);
        }
    }
    /**
     * Unsubscribe from real time updates
     * @param periodicity
     */
    unsubscribeCurrentBars(periodicity) {
        const sub = this.subs.get(periodicity);
        if (sub) {
            this.ws.send(JSON.stringify({
                type: "unsubscribe",
                destination: `/topic/${this.exchange}/current-bars/${this.instrument}/${periodicity}`,
            }));
            this.ws.off("message", sub);
            this.subs.delete(periodicity);
        }
    }
    /**
     * Get historical bars (OHLC) for specified period
     * @param startTime
     * @param endTime
     * @param periodicity
     */
    getHistoricalBars(startTime, endTime, periodicity) {
        return new Promise((resolve) => {
            const destination = `/topic/${this.exchange}/historical-bars/${this.instrument}/${periodicity}`;
            const correlation_id = identificator_helper_1.identificator();
            const onMessage = (msg) => {
                var _a;
                const frame = JSON.parse(msg);
                if (((_a = frame === null || frame === void 0 ? void 0 : frame.headers) === null || _a === void 0 ? void 0 : _a.correlation_id) == correlation_id) {
                    this.ws.off("message", onMessage);
                    const bars = frame.payload;
                    resolve(bars.map((bar) => {
                        return {
                            timestamp: moment_1.default(bar.timestamp).toDate(),
                            open_ask: parseFloat(bar.aggregated_bar.open_ask),
                            high_ask: parseFloat(bar.aggregated_bar.high_ask),
                            low_ask: parseFloat(bar.aggregated_bar.low_ask),
                            close_ask: parseFloat(bar.aggregated_bar.close_ask),
                            open_bid: parseFloat(bar.aggregated_bar.open_bid),
                            high_bid: parseFloat(bar.aggregated_bar.high_bid),
                            low_bid: parseFloat(bar.aggregated_bar.low_bid),
                            close_bid: parseFloat(bar.aggregated_bar.close_bid),
                            volume: parseFloat(bar.aggregated_bar.volume),
                        };
                    }));
                }
            };
            this.ws.on("message", onMessage);
            this.ws.send(JSON.stringify({
                type: "subscribe",
                destination,
            }));
            this.ws.send(JSON.stringify({
                type: "get",
                correlation_id,
                destination,
                body: {
                    start_time: moment_1.default(startTime).valueOf(),
                    end_time: moment_1.default(endTime).valueOf(),
                },
            }));
        });
    }
    subscriptionHandler(msg) {
        const frame = JSON.parse(msg);
        const src = frame.source.match(/\/topic\/(.+)\/current-bars\/(.+)\/(.+)/);
        if (!src || src[2] != this.instrument || src[1] != this.exchange) {
            return;
        }
        if (!this.onCurrentBarsUpdate) {
            return;
        }
        const bar = frame.payload.aggregated_bar;
        this.onCurrentBarsUpdate({
            timestamp: moment_1.default(bar.timestamp).toDate(),
            open_ask: parseFloat(bar.open_ask),
            high_ask: parseFloat(bar.high_ask),
            low_ask: parseFloat(bar.low_ask),
            close_ask: parseFloat(bar.close_ask),
            open_bid: parseFloat(bar.open_bid),
            high_bid: parseFloat(bar.high_bid),
            low_bid: parseFloat(bar.low_bid),
            close_bid: parseFloat(bar.close_bid),
            volume: parseFloat(bar.volume),
        });
    }
}
exports.Chart = Chart;
