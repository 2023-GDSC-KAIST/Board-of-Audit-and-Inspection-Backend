import { NextFunction, Request, Response } from 'express';
import { Item } from '../schemas/item';


export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const organization =req.body.organization;
    const year= req.body.year;
    const item = req.body.item;
    const sub_item= req.body.sub_item;
    const detail_item= req.body.detail_item;
    const newItem = await Item.create( { organization, year, item, sub_item, detail_item});

    res.json(newItem);
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

export async function deleteItem(req: Request, res: Response, next: NextFunction) {
    const itemID = req.params.id;
    try {
      const item = await Item.findByIdAndDelete(itemID);
      res.json({ message: 'item successfully deleted', item });
    } catch (error) {
      next(error);
    }
}

export async function getByYear(req: Request, res: Response, next: NextFunction) {
    const itemYear = req.params.year;

    try {
      const item = await Item.findOne({year:itemYear});
  //    logger.info(item);
      res.json(item);
    } catch (error) {
      next(error);
    }
}

export async function getByOrganization(req: Request, res: Response, next: NextFunction) {
    const itemOrganization = req.params.Organization;

    try {
      const item = await Item.findOne({organization:itemOrganization});
   //   logger.info(item);
      res.json(item);
    } catch (error) {
      next(error);
    }
}