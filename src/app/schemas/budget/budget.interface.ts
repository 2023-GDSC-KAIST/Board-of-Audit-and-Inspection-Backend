import { PopulatedDoc } from 'mongoose';
import { IOrganization } from '../organization';
import { FundSource } from './fund.source.enum';

export interface IBudget {
  organization: PopulatedDoc<IOrganization>;
  fund_source: FundSource;
  // item_code
  budget: number;
  remarks: string;
}
