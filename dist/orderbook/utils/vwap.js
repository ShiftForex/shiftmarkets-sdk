"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateQuoteVWAP = exports.calculateVWAP = void 0;
const _quoteVolumeVWAPReducer = (accumulator, layer) => {
    const layerVolume = Math.min(+accumulator.remainingVolume, layer.price * layer.volume) || 1;
    let filledVolume = accumulator.filledVolume + layerVolume;
    const remainingVolume = accumulator.remainingVolume - layerVolume;
    const VWAP = (accumulator.VWAP * accumulator.filledVolume +
        layer.price * layerVolume) /
        (accumulator.filledVolume + layerVolume);
    return {
        VWAP,
        filledVolume: filledVolume <= accumulator.volume ? filledVolume : accumulator.filledVolume,
        remainingVolume,
        volume: accumulator.volume,
    };
};
exports.calculateVWAP = (rows, volume) => {
    if (volume <= 0) {
        return {
            price: 0,
            volume: 0,
        };
    }
    let sumVolume = 0;
    let selectedRows = [];
    for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        if (sumVolume >= volume) {
            break;
        }
        if (row.volume + sumVolume <= volume) {
            sumVolume += row.volume;
            selectedRows.push(row);
        }
        else {
            row.volume = volume - sumVolume;
            sumVolume += row.volume;
            selectedRows.push(row);
        }
    }
    if (sumVolume == 0) {
        return { price: 0, volume: 0 };
    }
    const vSum = selectedRows.reduce((sum, row) => {
        return sum + row.price * row.volume;
    }, 0);
    return {
        price: vSum / sumVolume,
        volume: sumVolume,
    };
};
exports.calculateQuoteVWAP = (rows, volume) => {
    const { VWAP, filledVolume, remainingVolume } = rows.reduce(_quoteVolumeVWAPReducer, {
        VWAP: 0,
        filledVolume: 0,
        remainingVolume: volume,
        volume,
    });
    return {
        price: VWAP,
        volume: filledVolume < volume ? filledVolume - remainingVolume : filledVolume,
    };
};
//# sourceMappingURL=vwap.js.map