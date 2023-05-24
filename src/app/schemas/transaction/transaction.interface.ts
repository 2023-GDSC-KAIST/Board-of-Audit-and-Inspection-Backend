import { PopulatedDoc } from 'mongoose';
import { IOrganization } from '../organization';
import { IItem } from '../item';

export interface ITransaction {
  organization: PopulatedDoc<IOrganization>;
  business_at: Date;
  manager: string;
  item: PopulatedDoc<IItem>;
  income: number;
  expense: number;
  balance: number;
  transaction_at: Date;
  bank_name: string;
  account_holder: string;
  account_number: string;
  receipts: string[];
  remarks: string;
}