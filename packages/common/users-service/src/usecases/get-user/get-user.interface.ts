import {servicePattern} from "../../constants";

export const pattern = {
    cmd: 'get-user',
    pattern: servicePattern,
};

export interface IGetUserParams {
    email?: string;
    id?: string;
}