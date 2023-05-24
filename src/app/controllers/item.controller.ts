import { NextFunction, Request, Response, request } from 'express';
import { Item } from '../schemas/item';
import { Organization } from '../schemas';

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

export async function modify(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const item = await Item.findByIdAndUpdate(id, updateData, { new: true });
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
  const itemID = req.params.id;
  try {
    const item = await Item.findByIdAndDelete(itemID);
    res.json({ message: 'item successfully deleted', item });
  } catch (error) {
    next(error);
  }
}

export async function getByYear(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const itemYear = req.params.year;

  try {
    const item = await Item.findOne({ year: itemYear });
    //    logger.info(item);
    res.json(item);
  } catch (error) {
    next(error);
  }
}

export async function getByOrganization(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const itemOrganization = req.params.Organization;

  try {
    const item = await Item.findOne({ organization: itemOrganization });
    //   logger.info(item);
    res.json(item);
  } catch (error) {
    next(error);
  }
}
