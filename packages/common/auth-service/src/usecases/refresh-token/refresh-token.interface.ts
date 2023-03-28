import {servicePattern} from "../../constants";

export const pattern = {
    cmd: 'refresh-token',
    pattern: servicePattern,
};

export interface IRefreshTokenParams {
    userId: string;
    token: string;
}

export interface IRefreshTokenResponse {
    accessToken: string;
    refreshToken: string;
}