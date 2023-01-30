import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsNumberString } from "class-validator";

export class GetEtherValueQuery {
    @ApiPropertyOptional()
    @IsNumberString()
    public epoch: number;
}

export class GetEtherValueResponse {
    public eth_value: number;
}