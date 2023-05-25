import express, { Router } from 'express';
import { organizationRouter } from './organization.router';
import { itemRouter } from './item.router';
import { budgetRouter } from './budget.router';
import { transactionRouter } from './transaction.router';

const router: Router = express.Router();

router.use('/organizations', organizationRouter);
router.use('/budgets', budgetRouter);
router.use('/items', itemRouter);
router.use('/transactions', transactionRouter);

export const applicationRouter: Router = router;
