import WebSocket from "isomorphic-ws";
import moment from "moment";
import { Periodicity } from "./interfaces/periodicity.interface";
import { HistoricalBar } from "./interfaces/historical-bar.interface";
import { HistoricalBarsDto } from "./dto/historical-bar.dto";
import { identificator } from "../common/identificator.helper";

export class Chart {
  public onCurrentBarsUpdate?: (data: HistoricalBar) => void;
  private subs: Map<string, (data: any) => void> = new Map();
  constructor(
    public ws: WebSocket,
    public exchange: string,
    public instrument: string
  ) {}

  /**
   * Subscribe to real time updates
   * @param periodicity
   * @deprecated This method has wrong spelling
   */
  subscribeCurrenBars(periodicity: Periodicity) {
    return this.subscribeCurrentBars(periodicity);
  }

  /**
   * Subscribe to real time updates
   * @param periodicity
   */
  subscribeCurrentBars(periodicity: Periodicity) {
    this.ws.send(
      JSON.stringify({
        type: "subscribe",
        destination: `/topic/${this.exchange}/current-bars/${this.instrument}/${periodicity}`,
      })
    );

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
  unsubscribeCurrentBars(periodicity: Periodicity) {
    const sub = this.subs.get(periodicity);
    if (sub) {
      this.ws.send(
        JSON.stringify({
          type: "unsubscribe",
          destination: `/topic/${this.exchange}/current-bars/${this.instrument}/${periodicity}`,
        })
      );
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
  getHistoricalBars(
    startTime: Date,
    endTime: Date,
    periodicity: Periodicity
  ): Promise<HistoricalBar[]> {
    return new Promise((resolve) => {
      const destination = `/topic/${this.exchange}/historical-bars/${this.instrument}/${periodicity}`;
      const correlation_id = identificator();
      const onMessage = (msg: string) => {
        const frame = JSON.parse(msg);
        if (frame?.headers?.correlation_id == correlation_id) {
          this.ws.off("message", onMessage);
          const bars = frame.payload as HistoricalBarsDto[];
          resolve(
            bars.map((bar) => {
              return {
                timestamp: moment(bar.timestamp).toDate(),
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
            })
          );
        }
      };
      this.ws.on("message", onMessage);
      this.ws.send(
        JSON.stringify({
          type: "subscribe",
          destination,
        })
      );
      this.ws.send(
        JSON.stringify({
          type: "get",
          correlation_id,
          destination,
          body: {
            start_time: moment(startTime).valueOf(),
            end_time: moment(endTime).valueOf(),
          },
        })
      );
    });
  }

  protected subscriptionHandler(msg: string) {
    const frame = JSON.parse(msg);
    const src = frame.source.match(/\/topic\/(.+)\/current-bars\/(.+)\/(.+)/);
    if (!src || src[2] != this.instrument || src[1] != this.exchange) {
      return;
    }

    if (!this.onCurrentBarsUpdate) {
      return;
    }

    const bar = (frame.payload as HistoricalBarsDto).aggregated_bar;
    this.onCurrentBarsUpdate({
      timestamp: moment(bar.timestamp).toDate(),
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
