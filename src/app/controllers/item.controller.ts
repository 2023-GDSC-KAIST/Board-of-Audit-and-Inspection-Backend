import { NextFunction, Request, Response } from 'express';
import { Item } from '../schemas/item';


export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    let newItem;
    if(req.body.item){
    const { organization, year, item} = req.body;
    newItem = new Item( { organization, year, item});
    }
    if(!req.body.item) {
    const { organization, year, sub_item, detail_item} = req.body;
    newItem = new Item( { organization, year, sub_item, detail_item});
    }
    
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