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

export const Item = model<IItem>('Item', ItemSchema);
