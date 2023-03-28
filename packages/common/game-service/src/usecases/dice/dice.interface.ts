import {servicePattern} from "../../constants";

export const pattern = {
    cmd: 'dice',
    pattern: servicePattern,
};

export interface IDiceParams {
    userId: string;
    amount: number;
}

export interface IDiceResponse {
    win: boolean;
}