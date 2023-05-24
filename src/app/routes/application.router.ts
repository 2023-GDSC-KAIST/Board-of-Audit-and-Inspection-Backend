import express, { Router } from 'express';
import { organizationRouter } from './organization.router';
import { itemRouter } from './item.router';

const router: Router = express.Router();

router.use('/organizations', organizationRouter);
router.use('/items', itemRouter);

export const applicationRouter: Router = router;
