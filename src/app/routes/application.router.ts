import express, { Router } from 'express';
import { organizationRouter } from './organization.router';

const router: Router = express.Router();

router.use('/organizations', organizationRouter);
router.use('/items', itemRouter);

export const applicationRouter: Router = router;
