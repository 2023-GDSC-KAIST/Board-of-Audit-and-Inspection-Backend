import { Schema, Types, model } from 'mongoose';
import { ITransaction } from './transaction.interface';

const TransactionSchema = new Schema<ITransaction>({
  organization: {
    type: Types.ObjectId,
    ref: 'Organization',
    required: true,
  },
  business_at: {
    type: Date,
    required: true,
  },
  manager: {
    type: String,
    required: true,
  },
  item: {
    type: Types.ObjectId,
    ref: 'Item',
    required: true,
  },
  income: {
    type: Number,
  },
  expense: {
    type: Number,
  },
  balance: {
    type: Number,
    required: true,
  },
  transaction_at: {
    type: Date,
    required: true,
  },
  bank_name: {
    type: String,
    required: true,
  },
  account_holder: {
    type: String,
    required: true,
  },
  account_number: {
    type: String,
    required: true,
  },
  receipts: [
    {
      type: String,
    },
  ],
  remarks: {
    type: String,
  },
});

// Middleware: Transaction은 Income 또는 Expense 중 한 개에 해당하는 데이터만 가지고 있어야 함

TransactionSchema.pre('save', function (next) {
  if (!(( this.income === 0 && this.expense !== 0 ) || ( this.income !== 0 && this.expense === 0 ))) {
    next(new Error('Invalid transaction: Income and expense cannot be specified simultaneously for an item'));
  }
  next();
});

export const Transaction = model<ITransaction>('Transaction', TransactionSchema);