import { NextFunction, Request, Response, request } from 'express';
import { Item } from '../schemas/item';
import { Organization } from '../schemas';

export async function listItems(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const organization = await Organization.findOne({
      name: req.params.organization,
    });
    if (!organization) {
      return res.status(404).send('organization not found');
    }

    const item = await Item.find({
      organization: organization,
      year: req.params.year,
    });
    res.json(item);
  } catch (error) {
    next(error);
  }
}

export async function createItem(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const organization = await Organization.findOne({
      name: req.params.organization,
    });
    if (!organization) {
      return res.status(404).send('organization not found');
    }

    if (req.body.item && (req.body.sub_item || req.body.detail_item)) {
      return res
        .status(400)
        .send(
          'Invalid input: item과 sub_item 혹은 detail_item은 동시에 입력할 수 없습니다.',
        );
    }

    const item = await Item.findOneAndUpdate(
      {
        organization: organization,
        year: req.params.year,
        item: req.body.item,
        sub_item: req.body.sub_item,
        detail_item: req.body.detail_item,
      },
      {
        organization: organization,
        year: req.params.year,
        item: req.body.item,
        sub_item: req.body.sub_item,
        detail_item: req.body.detail_item,
      },
      {
        upsert: true,
        new: true,
      },
    );
    res.json(item);
  } catch (error) {
    next(error);
  }
}

export async function updateItem(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const organization = await Organization.findOne({
      name: req.params.organization,
    });
    if (!organization) {
      return res.status(404).send('organization not found');
    }

    if (req.body.item && (req.body.sub_item || req.body.detail_item)) {
      return res
        .status(400)
        .send(
          'Invalid input: item과 sub_item 혹은 detail_item은 동시에 입력할 수 없습니다.',
        );
    }

    // item, sub_item, and detail_item만 업데이트 가능함
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      {
        item: req.body.item,
        sub_item: req.body.sub_item,
        detail_item: req.body.detail_item,
      },
      { new: true },
    );
    res.json(item);
  } catch (error) {
    next(error);
  }
}

export async function deleteItem(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const item = await Item.findByIdAndRemove(req.params.id);
    res.json(item);
  } catch (error) {
    next(error);
  }
}
