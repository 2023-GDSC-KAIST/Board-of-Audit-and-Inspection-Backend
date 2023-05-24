import express, { Router } from 'express';
import { ItemController } from '../controllers';

const router: Router = express.Router();

router.route('/:organization/:year').post(ItemController.createItem);

// router
//   .route('/:id')
//   .patch(ItemController.modify)

//   .delete(ItemController.deleteItem);

// router.route('/getItemYear/:year').get(ItemController.getByYear);
// router
//   .route('/getItemOrgan/:organization')
//   .get(ItemController.getByOrganization);
export const itemRouter: Router = router;
