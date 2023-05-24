import express, { Router } from 'express';
import { organizationRouter } from './organization.router';
import { itemRouter } from './item.router';
import { budgetRouter } from './budget.router';

const router: Router = express.Router();

router.use('/organizations', organizationRouter);
router.use('/items', itemRouter);
router.use('/budgets', budgetRouter);

export const applicationRouter: Router = router;
