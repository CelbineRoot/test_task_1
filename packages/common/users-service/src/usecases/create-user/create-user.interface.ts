import {servicePattern} from "../../constants";

export const pattern = {
    cmd: 'create-user',
    pattern: servicePattern,
};

export interface ICreateUserParams {
    email: string;
    password: string;
}