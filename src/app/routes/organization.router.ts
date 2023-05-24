import express, { Router } from 'express';
import { OrganizationController } from '../controllers';

const router: Router = express.Router();

router
  .route('/')
  .get(OrganizationController.listOrganizations)
  .post(OrganizationController.createOrganization)
  .put(OrganizationController.updateOrganization)
  .delete(OrganizationController.deleteOrganization);

export const organizationRouter: Router = router;
