import WebSocket from "isomorphic-ws";
import moment from "moment";
import { TickerRecord } from "./interfaces/ticker-record.interface";
import { TickerUpdateRecord } from "./dto/ticker-update.dto";

export class QuotesAll {
    public ws?: WebSocket;
    protected sub?: (data: any) => void;

    constructor(
        public exchange: string,
        public onUpdate?: (data: Array<TickerRecord>) => void
    ) {}

    /**
     * Subscribe to quotes updates over Exchange Data Server websocket
     * @param ws
     */
    public subscribeAll = (ws: WebSocket) => {
        this.ws = ws;
        this.ws.send(
            JSON.stringify({
                type: "subscribe",
                destination: `/topic/${this.exchange}/quotes-all`,
            })
        );
        this.ws.on("message", this._subscriptionHandler);
    }

    public unsubscribeAll = () => {
        if (this.ws) {
            this.ws.send(
                JSON.stringify({
                    type: "unsubscribe",
                    destination: `/topic/${this.exchange}/quotes-all`,
                })
            );
            this.ws.off("message", this._subscriptionHandler);
        }
    }

    /**
     * Subscribe to slow quotes updates over Exchange Data Server websocket
     * @param ws
     */
    public subscribeAllSlow = (ws: WebSocket) => {
        this.ws = ws;
        this.ws.send(
            JSON.stringify({
                type: "subscribe",
                destination: `/topic/${this.exchange}/quotes-all-slow`,
            })
        );
        this.ws.on("message", this._subscriptionHandler);
    }

    public unsubscribeAllSlow = () => {
        if (this.ws) {
            this.ws.send(
                JSON.stringify({
                    type: "unsubscribe",
                    destination: `/topic/${this.exchange}/quotes-all-slow`,
                })
            );
            this.ws.off("message", this._subscriptionHandler);
        }
    }

    protected _update = (records: Array<TickerRecord>) => {
        if (this.onUpdate) {
            this.onUpdate(records);
        }
    }

    protected _subscriptionHandler = (msg: string) => {
        const frame = JSON.parse(msg);
        const src = frame.source.match(/\/topic\/(.+)\/quotes-(.+)/);
        if (!src || src[1] != this.exchange) {
            return;
        }

        const records: Array<TickerUpdateRecord> = frame?.payload || [];

        this._update(
            records.map((record) => ({
                instrument: record.pair,
                bid: parseFloat(record.bid),
                ask: parseFloat(record.ask),
                price_24h_change: parseFloat(record.price_24h_change),
                price_24h_max: parseFloat(record.price_24h_max),
                price_24h_min: parseFloat(record.price_24h_min),
                volume_24h_change: parseFloat(record.volume_24h_change),
                volume: record.volume,
                date_ts: moment(record.date_ts).toDate(),
            }))
        );
    }
}
