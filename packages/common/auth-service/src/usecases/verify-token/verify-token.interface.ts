import {servicePattern} from "../../constants";

export const pattern = {
    cmd: 'verify-token',
    pattern: servicePattern,
};

export interface IVerifyTokenParams {
    token: string;
}