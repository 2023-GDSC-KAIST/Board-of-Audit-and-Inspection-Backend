import express, { Router } from 'express';
import { OrganizationController } from '../controllers';

const router: Router = express.Router();

router
  .route('/')
  .get(OrganizationController.listOrganizations)
  .post(OrganizationController.createOrganization);

export const organizationRouter: Router = router;
