import express, { Router } from 'express';
import { ItemController } from '../controllers';

const router: Router = express.Router();

router
  .route('/:organization/:year')
  .get(ItemController.listItems)
  .post(ItemController.createItem);

router
  .route('/:id')
  .put(ItemController.updateItem)
  .delete(ItemController.deleteItem);

export const itemRouter: Router = router;
