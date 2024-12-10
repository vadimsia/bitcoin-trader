export enum EOrderType {
    LONG = 1,
    SHORT = 2
}

export enum EOrderState {
    WAITING = 1,
    OPEN = 2,
    TO_BE_CLOSED = 3,
    CLOSED = 4,
    CANCELED = 5

}

export interface IOrder {
    id: number
    order_type: EOrderType
    state: EOrderState
    amount: number
    entry_price: number
    close_price: number
    leverage: number
    take_profit: number
    stop_loss: number

}