import {servicePattern} from "../../constants";

export const pattern = {
    cmd: 'create-wallet',
    pattern: servicePattern,
};

export interface ICreateWalletParams {
    userId: string;
}