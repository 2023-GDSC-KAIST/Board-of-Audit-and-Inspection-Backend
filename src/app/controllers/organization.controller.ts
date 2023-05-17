import { NextFunction, Request, Response } from 'express';
import { Organization } from '../schemas/organization';

export async function createOrganization(req: Request, res: Response, next: NextFunction) {
  try {
    const organization = await Organization.create({
      name: req.body.name,
    });
    res.json(organization);
  } catch (error) {
    next(error);
  }
}
