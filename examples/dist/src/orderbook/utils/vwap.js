"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateQuoteVWAP = exports.calculateVWAP = void 0;
const _quoteVolumeVWAPReducer = (accumulator, layer) => {
    const layerVolume = Math.min(+accumulator.remainingVolume, layer.price * layer.volume) || 0;
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
        let row = { ...rows[i] };
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
    var _a;
    const { VWAP, filledVolume, remainingVolume } = rows.reduce(_quoteVolumeVWAPReducer, {
        VWAP: 1,
        filledVolume: 0,
        remainingVolume: volume,
        volume,
    });
    return {
        price: isFinite(VWAP) ? VWAP : ((_a = rows[0]) === null || _a === void 0 ? void 0 : _a.price) || 0,
        volume: filledVolume,
        remainingVolume,
    };
};
