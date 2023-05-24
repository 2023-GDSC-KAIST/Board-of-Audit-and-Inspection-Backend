import { NextFunction, Request, Response } from 'express';
import { Organization } from '../schemas/organization';

export async function createOrganization(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    // organization 중복체크 및 생성
    const organization = await Organization.findOneAndUpdate(
      {
        name: req.body.name,
      },
      {
        name: req.body.name,
      },
      {
        upsert: true,
        new: true,
      },
    );
    res.json(organization);
  } catch (error) {
    next(error);
  }
}
