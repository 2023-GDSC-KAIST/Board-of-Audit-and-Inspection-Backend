import { NextFunction, Request, Response } from 'express';
import { Organization } from '../schemas/organization';

export async function listOrganizations(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const organizations = await Organization.find();
    res.json(organizations);
  } catch (error) {
    next(error);
  }
}

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

export async function deleteOrganization(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const organization = await Organization.deleteOne({
      name: req.body.name,
    });
    res.json(organization);
  } catch (error) {
    next(error);
  }
}
