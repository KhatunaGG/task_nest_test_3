
import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class QueryDto {
  @Transform(({ value }) => Number(value))
  @IsNumber()
  page: number = 1;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  take: number = 20;
}

