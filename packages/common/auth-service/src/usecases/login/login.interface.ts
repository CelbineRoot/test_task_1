import {servicePattern} from "../../constants";

export const pattern = {
    cmd: 'login',
    pattern: servicePattern,
};

export interface ILoginParams {
    email: string;
    password: string;
}