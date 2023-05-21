import { NextFunction, Request, Response } from 'express';
import { Item } from '../schemas/item';

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    let newItem;
    if(req.body.item){
    const { organization, year, item, item_code} = req.body;
    newItem = new Item( { organization, year, item, item_code});
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
      const user = await Item.findByIdAndUpdate(id, updateData, { new: true });
      res.json(user);
    } catch (error) {
      next(error);
    }
}

export async function deleteItem(req: Request, res: Response, next: NextFunction) {
    try {
      const item;
      res.json(item);
    } catch (error) {
      next(error);
    }
}

export async function getByYear(req: Request, res: Response, next: NextFunction) {
    try {
      const item;
      res.json(item);
    } catch (error) {
      next(error);
    }
}

export async function getByOrganization(req: Request, res: Response, next: NextFunction) {
    try {
      const item;
      res.json(item);
    } catch (error) {
      next(error);
    }
}