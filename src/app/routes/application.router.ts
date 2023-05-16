import express, { Router } from 'express';
import { usersRouter } from './users.router';
import { organizationsRouter } from './organization.router';

const router: Router = express.Router();
router.use('/users', usersRouter);
router.use('/organization', organizationsRouter);

export const applicationRouter: Router = router;
