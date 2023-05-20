import express, { Router } from 'express';
import { register_expense } from '../controllers/budget.controller';

const router: Router = express.Router();
router.use('/:org_id/:year/expense', register_expense)

export const budgetRouter: Router = router;
