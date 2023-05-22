import express, { Router } from 'express';
import { register_expense, modify_expense } from '../controllers/budget.controller';

const router: Router = express.Router();
router.post('/:org_id/:year/expense', register_expense)
router.patch('/:org_id/:year/expense', modify_expense)

export const budgetRouter: Router = router;
