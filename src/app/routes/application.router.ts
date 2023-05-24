import express, { Router } from 'express';
import { organizationRouter } from './organization.router';

const router: Router = express.Router();
router.use('/organization', organizationRouter);

export const applicationRouter: Router = router;
