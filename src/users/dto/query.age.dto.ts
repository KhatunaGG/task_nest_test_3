import { PartialType } from "@nestjs/mapped-types";
import { Transform } from "class-transformer";
import { IsNumber } from "class-validator";
import { QueryDto } from "./query.dto";


export class QueryAgeDto extends QueryDto {

    @Transform(({value}) => Number(value))
    @IsNumber()
    age?: number;

    @Transform(({value}) => Number(value))
    @IsNumber()
    ageFrom?: number;

    @Transform(({value}) => Number(value))
    @IsNumber()
    ageTo?: number;

}


export class QueryAgeParams extends PartialType(QueryAgeDto) {}
