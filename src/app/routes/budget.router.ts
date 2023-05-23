import express, { Router } from 'express';
import { BudgetController } from '../controllers';

const router: Router = express.Router();

router
  .route('/:id')
  .delete(BudgetController.deleteBudget);

router.route('/getBudget/:organization/:year/settlement').get(BudgetController.getSettlementByOrganizationAndYear);

export const budgetRouter: Router = router;
