import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Expense {
  @Prop()
  type: string;

  @Prop()
  amount: number;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense)