export interface CreateDepositDto {
    txid: string,
    product: string,
    callback_url: string,
}

export interface WalletOrderUpdateDto {
    orderId: string,
    reservation: string,
    orderStatus: string,
    failedReason: string,
    referenceId: string,
}
