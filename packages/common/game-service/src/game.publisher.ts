import {ClientNats} from "@nestjs/microservices";
import {Injectable} from "@nestjs/common";
import {IDiceParams, IDiceResponse, pattern} from "./usecases/dice/dice.interface";

@Injectable()
export class GamePublisher {
    constructor(private readonly transport: ClientNats) {}

    dice(params: IDiceParams) {
        return this.transport.send<IDiceResponse>(pattern, params);
    }
}