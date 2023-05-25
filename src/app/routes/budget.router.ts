import express, { Router } from 'express';
import { BudgetController } from '../controllers';

const router: Router = express.Router();

router
  .route('/:organization/:year/income')
  .get(BudgetController.getBudgetIncome)
  .post(BudgetController.createBudgetIncome);

router
  .route('/:organization/:year/expense')
  .get(BudgetController.getExpenseBudgets)
  .post(BudgetController.createExpense);

// TODO : 수입 / 지출 분리
router
  .route('/:id')
  .put(BudgetController.updateBudgetIncome)
  .delete(BudgetController.deleteBudget);

router
  .route('/:organization/:year/settlement')
  .get(BudgetController.getSettlementByOrganizationAndYear);

export const budgetRouter: Router = router;
