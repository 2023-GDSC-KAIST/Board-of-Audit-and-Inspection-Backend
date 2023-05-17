import express, { Router } from 'express';
import { OrganizationController } from '../controllers';

const router: Router = express.Router();

router.route('/').post(OrganizationController.createOrganization);

export const organizationRouter: Router = router;
