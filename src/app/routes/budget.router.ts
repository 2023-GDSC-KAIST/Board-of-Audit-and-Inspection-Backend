import express, { Router } from 'express';
import { BudgetController } from '../controllers';

const router: Router = express.Router();

export const budgetRouter: Router = router;

router
  .route('/:organization/:year/income')
  .get(BudgetController.getBudgetIncome)
  .post(BudgetController.createBudgetIncome);

/* Create new budget(income) */
router.post('/:org_id/:year/income', BudgetController.createBudgetIncome);

// TODO : 수입 / 지출 분리
router.route('/id').put(BudgetController.updateBudgetIncome);

/* Get budgets(income) by org_id and year */
// router.get('/:org_id/:year/income', BudgetController.getBudgetIncome);
