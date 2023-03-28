import {servicePattern} from "../../constants";

export const pattern = {
    cmd: 'register',
    pattern: servicePattern,
};

export interface IRegisterParams {
    email: string;
    password: string;
}