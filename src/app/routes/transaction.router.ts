import express, { Router } from 'express';
import { TransactionController } from '../controllers';

const router: Router = express.Router();

router
  .route('/:org_id/:year/transaction')
  .get(TransactionController.getTransactionsByOrganizationAndYear)
  .post(TransactionController.createTransaction);

router
  .route('/:org_id/:year/transaction/:id')
  .patch(TransactionController.modifyTransaction)
  .delete(TransactionController.deleteTransaction);

export const transactionRouter: Router = router;