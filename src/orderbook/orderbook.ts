import WebSocket from "isomorphic-ws";
import _cloneDeep from "lodash.clonedeep";
import _pull from "lodash.pull";
import _round from "lodash.round";
import { OrderbookRecord } from "./interfaces/orderbook-record.interface";
import { VolumeWeightedAveragePrice } from "./interfaces/volume-weighted-average-price.interface";
import { OrderbookUpdateDto } from "./dto/orderbook-update.dto";
import { OrderSide, Sides } from "../trade/interfaces";
import { calculateQuoteVWAP, calculateVWAP } from "./utils/vwap";

export class Orderbook {
  public orders: OrderbookRecord[] = [];
  public ws?: WebSocket;
  public sub?: (data: any) => void;

  constructor(
    public exchange: string,
    public instrument: string,
    public onUpdate?: (data: Orderbook) => void
  ) {}

  /**
   * Get BUY side rows, sorted higher price first
   */
  getBuySide(precision?: number) {
    const side: OrderbookRecord[] = [];
    const rowsClone = _cloneDeep(this.orders);
    let result = side.concat(rowsClone.filter((order) => order.side == "buy"));

    if (typeof precision !== "undefined") {
      result = this.preciseTo(result, precision);
    }

    return result.sort((a: OrderbookRecord, b: OrderbookRecord) => {
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

  getSellSide(precision?: number) {
    const side: OrderbookRecord[] = [];
    const rowsClone = _cloneDeep(this.orders);
    let result = side.concat(rowsClone.filter((order) => order.side == "sell"));

    if (typeof precision !== "undefined") {
      result = this.preciseTo(result, precision);
    }

    return result.sort((a: OrderbookRecord, b: OrderbookRecord) => {
      if (a.price < b.price) {
        return -1;
      }
      if (a.price > b.price) {
        return 1;
      }
      return 0;
    });
  }

  preciseTo(records: OrderbookRecord[], precision: number) {
    const precisedRecords: { [key: number]: OrderbookRecord } = {};
    records.forEach((record) => {
      record.price = _round(record.price, precision);
      const precisedRecord = precisedRecords[record.price];
      if (typeof precisedRecord !== "undefined") {
        precisedRecord.volume += record.volume;
      } else {
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
  getVolumeWeightedAvgPrice(
    side: "sell" | "buy",
    volume: number
  ): VolumeWeightedAveragePrice {
    if (volume <= 0) {
      throw new Error("Volume expected to be positive");
    }
    let rows: OrderbookRecord[] = [];
    if (side == "sell") {
      rows = this.getSellSide();
    } else {
      rows = this.getBuySide();
    }
    return calculateVWAP(rows, volume);
  }

  calculateQuoteVolumeVWAP(action: OrderSide, quoteVolume: number) {
    let rows;
    if (quoteVolume <= 0) {
      throw new Error("Volume expected to be positive");
    }
    if (action == "sell") {
      rows = this.getSellSide();
    } else {
      rows = this.getBuySide();
    }
    return calculateQuoteVWAP(rows, quoteVolume);
  }

  /**
   * Crear all orderbook records
   */
  clear(): void {
    this.orders = [];
  }

  update(orders: OrderbookRecord[]) {
    orders.map(this.updateRow.bind(this));
    if (this.onUpdate) {
      this.onUpdate(this);
    }
  }

  /**
   * Update orderbook with incoming order
   */
  updateRow({ price, volume, side }: OrderbookRecord): void {
    const row = this.orders.find((row) => {
      return row.side == side && row.price == price;
    });

    if (row) {
      if (volume == 0) {
        _pull(this.orders, row);
      } else {
        row.volume = volume;
      }
    } else {
      if (volume != 0) {
        this.orders.push({ price, volume, side });
      }
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
        destination: `/topic/${this.exchange}/orderbook-${this.instrument}`,
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
    if (this.ws && this.ws.readyState == this.ws.OPEN) {
      this.ws.send(
        JSON.stringify({
          type: "unsubscribe",
          destination: `/topic/${this.exchange}/orderbook-${this.instrument}`,
        })
      );
      if (this.sub) {
        this.ws.off("message", this.sub);
      }
    }
    this.sub = undefined;
  }

  protected subscriptionHandler(msg: string) {
    const frame = JSON.parse(msg);
    const src = frame.source.match(/\/topic\/(.+)\/orderbook-(.+)/);
    if (!src || src[2] != this.instrument || src[1] != this.exchange) {
      return;
    }
    if ((frame as OrderbookUpdateDto).type == "snapshot") {
      this.clear();
    }

    const update: OrderbookRecord[] = [];
    (frame as OrderbookUpdateDto).payload.forEach((row) => {
      const side = <"sell" | "buy">row.side.toLowerCase();
      if (["update", "insert"].includes(row.action)) {
        update.push({
          price: parseFloat(row.price),
          volume: parseFloat(row.volume),
          side,
        });
      } else if (row.action == "delete") {
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
