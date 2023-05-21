import express, { Router } from 'express';
import { ItemController } from '../controllers';

const router: Router = express.Router();
router.route('/createItem').post(ItemController.create);
router.route('/modifyItem/:id').put(ItemController.modify);
router.route('/deleteItem/:id').delete(ItemController.deleteItem);
router.route('/getItemYear/:year').get(ItemController.getByYear);
router.route('/getItemOrgan/:organization').get(ItemController.getByOrganization)
export const itemRouter: Router = router;
