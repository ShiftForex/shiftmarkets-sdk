import {
  OrderbookRecord,
  QuoteVWAPAccumulator,
} from "../interfaces/orderbook-record.interface";
import { VolumeWeightedAveragePrice } from "../interfaces/volume-weighted-average-price.interface";

const _quoteVolumeVWAPReducer = (
    accumulator: QuoteVWAPAccumulator,
    layer: { price: number; volume: number }
) => {
  const layerVolume = Math.min(
      +accumulator.remainingVolume,
      layer.price * layer.volume
  ) || 0;
  let filledVolume = accumulator.filledVolume + layerVolume;
  const remainingVolume = accumulator.remainingVolume - layerVolume;
  const VWAP = ((accumulator.VWAP * accumulator.filledVolume + layer.price * layerVolume) || 1) / ((accumulator.filledVolume + layerVolume) || 1) || 0;
  return {
    VWAP: VWAP > 0 ? VWAP : accumulator.VWAP,
    filledVolume: filledVolume <= accumulator.volume ? filledVolume : accumulator.filledVolume,
    remainingVolume,
    volume: accumulator.volume,
  };
};

export const calculateVWAP = (
    rows: OrderbookRecord[],
    volume: number
): VolumeWeightedAveragePrice => {
  if (volume <= 0) {
    return {
      price: 0,
      volume: 0,
    };
  }
  let sumVolume: number = 0;
  let selectedRows: OrderbookRecord[] = [];

  for (let i = 0; i < rows.length; i++) {
    let row = { ...rows[i] };

    if (sumVolume >= volume) {
      break;
    }

    if (row.volume + sumVolume <= volume) {
      sumVolume += row.volume;
      selectedRows.push(row);
    } else {
      row.volume = volume - sumVolume;
      sumVolume += row.volume;
      selectedRows.push(row);
    }
  }

  if (sumVolume == 0) {
    return { price: 0, volume: 0 };
  }

  const vSum = selectedRows.reduce((sum: number, row: OrderbookRecord) => {
    return sum + row.price * row.volume;
  }, 0);

  return {
    price: vSum / sumVolume,
    volume: sumVolume,
  };
};

export const calculateQuoteVWAP = (
    rows: OrderbookRecord[],
    volume: number
): VolumeWeightedAveragePrice => {
  const { VWAP, filledVolume, remainingVolume } = rows.reduce(_quoteVolumeVWAPReducer, {
    VWAP: 1,
    filledVolume: 0,
    remainingVolume: volume,
    volume,
  });
  return {
    price: isFinite(VWAP) ? VWAP : rows[0]?.price || 0,
    volume: filledVolume,
    remainingVolume,
  };
};
