export enum EOrderType {
    LONG = 1,
    SHORT = 2
}

export enum EOrderState {
    WAITING = 1,
    OPEN = 2,
    CLOSED = 3,
    CANCELED = 4

}

export interface IOrder {
    id: number
    type: EOrderType
    state: EOrderState
    amount: number
    entry_price: number
    leverage: number
    take_profit: number
    stop_loss: number

}