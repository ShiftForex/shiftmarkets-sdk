"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Orderbook = void 0;
const lodash_clonedeep_1 = __importDefault(require("lodash.clonedeep"));
const lodash_pull_1 = __importDefault(require("lodash.pull"));
const lodash_round_1 = __importDefault(require("lodash.round"));
const vwap_1 = require("./utils/vwap");
class Orderbook {
    constructor(exchange, instrument, onUpdate) {
        this.exchange = exchange;
        this.instrument = instrument;
        this.onUpdate = onUpdate;
        this.orders = [];
    }
    /**
     * Get BUY side rows, sorted higher price first
     */
    getBuySide(precision) {
        const side = [];
        const rowsClone = lodash_clonedeep_1.default(this.orders);
        let result = side.concat(rowsClone.filter((order) => order.side == "buy"));
        if (typeof precision !== "undefined") {
            result = this.preciseTo(result, precision);
        }
        return result.sort((a, b) => {
            if (a.price > b.price) {
                return -1;
            }
            if (a.price < b.price) {
                return 1;
            }
            return 0;
        });
    }
    /**
     * Get SELL side rows, sorted lower prices first
     */
    getSellSide(precision) {
        const side = [];
        const rowsClone = lodash_clonedeep_1.default(this.orders);
        let result = side.concat(rowsClone.filter((order) => order.side == "sell"));
        if (typeof precision !== "undefined") {
            result = this.preciseTo(result, precision);
        }
        return result.sort((a, b) => {
            if (a.price < b.price) {
                return -1;
            }
            if (a.price > b.price) {
                return 1;
            }
            return 0;
        });
    }
    preciseTo(records, precision) {
        const precisedRecords = {};
        records.forEach((record) => {
            record.price = lodash_round_1.default(record.price, precision);
            const precisedRecord = precisedRecords[record.price];
            if (typeof precisedRecord !== "undefined") {
                precisedRecord.volume += record.volume;
            }
            else {
                precisedRecords[record.price] = record;
            }
        });
        return Object.values(precisedRecords);
    }
    /**
     * Volume weighted average price for RFQ
     * @param side sell or buy
     * @param volume number
     */
    getVolumeWeightedAvgPrice(side, volume) {
        if (volume <= 0) {
            throw new Error("Volume expected to be positive");
        }
        let rows = [];
        if (side == "sell") {
            rows = this.getSellSide();
        }
        else {
            rows = this.getBuySide();
        }
        return vwap_1.calculateVWAP(rows, volume);
    }
    calculateQuoteVolumeVWAP(action, quoteVolume) {
        let rows;
        if (quoteVolume <= 0) {
            throw new Error("Volume expected to be positive");
        }
        if (action == "sell") {
            rows = this.getSellSide();
        }
        else {
            rows = this.getBuySide();
        }
        return vwap_1.calculateQuoteVWAP(rows, quoteVolume);
    }
    /**
     * Crear all orderbook records
     */
    clear() {
        this.orders = [];
    }
    update(orders) {
        orders.map(this.updateRow.bind(this));
        if (this.onUpdate) {
            this.onUpdate(this);
        }
    }
    /**
     * Update orderbook with incoming order
     */
    updateRow({ price, volume, side }) {
        const row = this.orders.find((row) => {
            return row.side == side && row.price == price;
        });
        if (row) {
            if (volume == 0) {
                lodash_pull_1.default(this.orders, row);
            }
            else {
                row.volume = volume;
            }
        }
        else {
            if (volume != 0) {
                this.orders.push({ price, volume, side });
            }
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
            destination: `/topic/${this.exchange}/orderbook-${this.instrument}`,
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
        if (this.ws && this.ws.readyState == this.ws.OPEN) {
            this.ws.send(JSON.stringify({
                type: "unsubscribe",
                destination: `/topic/${this.exchange}/orderbook-${this.instrument}`,
            }));
            if (this.sub) {
                this.ws.off("message", this.sub);
            }
        }
        this.sub = undefined;
    }
    subscriptionHandler(msg) {
        const frame = JSON.parse(msg);
        const src = frame.source.match(/\/topic\/(.+)\/orderbook-(.+)/);
        if (!src || src[2] != this.instrument || src[1] != this.exchange) {
            return;
        }
        if (frame.type == "snapshot") {
            this.clear();
        }
        const update = [];
        frame.payload.forEach((row) => {
            const side = row.side.toLowerCase();
            if (["update", "insert"].includes(row.action)) {
                update.push({
                    price: parseFloat(row.price),
                    volume: parseFloat(row.volume),
                    side,
                });
            }
            else if (row.action == "delete") {
                update.push({
                    price: parseFloat(row.price),
                    volume: 0,
                    side,
                });
            }
        });
        this.update(update);
    }
}
exports.Orderbook = Orderbook;
