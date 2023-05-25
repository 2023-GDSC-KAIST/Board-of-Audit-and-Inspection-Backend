import { Schema, Types, model } from 'mongoose';
import { IBudget } from './budget.interface';
import { FundSource } from './fund.source.enum';

const BudgetSchema = new Schema<IBudget>({
  organization: {
    type: Types.ObjectId,
    ref: 'Organization',
    required: true,
  },
  manager: {
    type: String,
  },
  fund_source: {
    type: String,
    enum: FundSource,
    default: FundSource.학생회비,
  },
  item: {
    type: Types.ObjectId,
    ref: 'Item',
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
  remarks: {
    type: String,
  },
});

export const Budget = model<IBudget>('Budget', BudgetSchema);
