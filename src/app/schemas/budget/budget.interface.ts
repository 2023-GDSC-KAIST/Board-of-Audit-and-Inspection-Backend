import { PopulatedDoc } from 'mongoose';
import { IOrganization } from '../organization';
import { FundSource } from './fund.source.enum';
import { IItem } from '../item';

export interface IBudget {
  organization: PopulatedDoc<IOrganization>;
  fund_source: FundSource;
  item: PopulatedDoc<IItem>;
  budget: number;
  remarks: string;
}
