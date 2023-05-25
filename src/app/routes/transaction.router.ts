import express, { Router } from 'express';
import { TransactionController } from '../controllers';

const router: Router = express.Router();

router
  .route('/:organization/:year/transaction')
  .get(TransactionController.getTransactions)
  .post(TransactionController.createTransaction);

router
  .route('/:id')
  .patch(TransactionController.updateTransaction)
  .delete(TransactionController.deleteTransaction);

export const transactionRouter: Router = router;
