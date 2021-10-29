import WebSocket from "isomorphic-ws";
import moment from "moment";
import { TickerRecord } from "./interfaces/ticker-record.interface";
import { TickerUpdateDto } from "./dto/ticker-update.dto";

export class Ticker {
  public ws?: WebSocket;
  public record?: TickerRecord;
  protected sub?: (data: any) => void;
  constructor(
    public exchange: string,
    public instrument: string,
    public onUpdate?: (data: TickerRecord) => void
  ) {}

  /**
   * Update ticker with actual values
   * @param record
   */
  update(record: TickerRecord) {
    this.record = record;
    if (this.onUpdate) {
      this.onUpdate(record);
    }
  }

  /**
   * Subscribe to updates over Exchange Data Server websocket
   * @param ws
   */
  subscribe(ws: WebSocket) {
    this.ws = ws;
    this.ws.send(
      JSON.stringify({
        type: "subscribe",
        destination: `/topic/${this.exchange}/quotes-${this.instrument}`,
      })
    );
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
      this.ws.send(
        JSON.stringify({
          type: "unsubscribe",
          destination: `/topic/${this.exchange}/quotes-${this.instrument}`,
        })
      );
      if (this.sub) {
        this.ws.off("message", this.sub);
      }
    }
  }

  protected subscriptionHandler(msg: string) {
    const frame = JSON.parse(msg);
    const src = frame.source.match(/\/topic\/(.+)\/quotes-(.+)/);
    if (!src || src[2] != this.instrument || src[1] != this.exchange) {
      return;
    }

    const record = (frame as TickerUpdateDto).payload;
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
      date_ts: moment(record.date_ts).toDate(),
    });
  }
}
