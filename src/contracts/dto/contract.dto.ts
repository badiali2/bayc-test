import { IsNumber } from "class-validator";

export class GetEtherValueQuery {
    @IsNumber()
    public age: number;
}

export class GetEtherValueResponse {
    public eth_value: number;
}