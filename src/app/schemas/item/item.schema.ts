import { Schema, Types, model } from 'mongoose';
import { IItem } from './item.interface';

const ItemSchema = new Schema<IItem>({
  organization: {
    type: Types.ObjectId,
    ref: 'Organization',
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  item: {
    type: String,
  },
  sub_item: {
    type: String,
  },
  detail_item: {
    type: String,
  },
});

// item & sub_item & detail_item이 모두 동시에 존재하면 안됨
ItemSchema.pre('save', async function (next) {
  if (this.item && (this.sub_item || this.detail_item)) {
    next(new Error('Invalid item: 항목과 소항목 혹은 세부항목이 동시에 존재'));
  }
  next();
});

export const Item = model<IItem>('Item', ItemSchema);
