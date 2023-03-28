import {servicePattern} from "../../constants";

export const pattern = {
    cmd: 'get-balance',
    pattern: servicePattern,
};

export interface IGetBalanceParams {
    userId: string;
}

export interface IGetBalanceResponse {
    balance: number;
}