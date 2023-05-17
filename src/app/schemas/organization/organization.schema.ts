import { Schema, model } from 'mongoose';
import { IOrganization } from './organization.interface';

const OrganizationSchema = new Schema<IOrganization>({
  name: {
    type: String,
    required: true,
  },
});

export const Organization = model<IOrganization>('Organization', OrganizationSchema);
