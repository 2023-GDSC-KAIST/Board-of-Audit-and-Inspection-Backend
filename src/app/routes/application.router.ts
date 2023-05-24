import express, { Router } from 'express';
import { organizationRouter } from './organization.router';
import { budgetRouter } from './budget.router';
import { itemRouter } from './item.router';
import { transactionRouter } from './transaction.router';

const router: Router = express.Router();
router.use('/organization', organizationRouter);
router.use('/budget', budgetRouter);
router.use('/item', itemRouter);
router.use('/transactions', transactionRouter);

export const applicationRouter: Router = router;
