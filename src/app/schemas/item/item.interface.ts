import { PopulatedDoc } from 'mongoose';
import { IOrganization } from '../organization';

export interface IItem {
  organization: PopulatedDoc<IOrganization>;
  year: number;
  item: string; // 항목 : 수입에만 존재
  sub_item: string; // 소항목 : 지출에만 존재
  detail_item: string; // 세부항목 : 지출에만 존재
  item_code: string;
}
