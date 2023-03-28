import {servicePattern} from "../../constants";

export const incrementPattern = {
    cmd: 'increment-balance',
    pattern: servicePattern,
};
export const decrementPattern = {
    cmd: 'decrement-balance',
    pattern: servicePattern,
};

export interface IIncrementBalanceParams {
    userId: string;
    amount: number;
}
export interface IDecrementBalanceParams {
    userId: string;
    amount: number;
}
export interface IDecrementBalanceResponse {
    balance: number;
}
export interface IIncrementBalanceResponse {
    balance: number;
}