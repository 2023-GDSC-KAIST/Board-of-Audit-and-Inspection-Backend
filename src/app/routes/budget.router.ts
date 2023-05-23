import express, { Router } from 'express';
import { registerExpense, modifyExpense, getExpenseBudgets } from '../controllers/budget.controller';

const router: Router = express.Router();
router.post('/:org_id/:year/expense', registerExpense)
router.patch('/:org_id/:year/expense', modifyExpense)
router.get('/:org_id/:year/expense', getExpenseBudgets)
export const budgetRouter: Router = router;
