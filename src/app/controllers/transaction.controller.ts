import { NextFunction, Request, Response } from 'express';
import { Transaction } from '../schemas/transaction';

export async function createTransaction(req: Request, res: Response, next: NextFunction) {
  try {
    const transaction = await Transaction.create({
      organization: req.body.organization,
      business_at: req.body.business_at,
      manager: req.body.manager,
      item: req.body.item,
      income: req.body.income,
      expense: req.body.expense,
      balance: req.body.balance,
      transaction_at: req.body.transaction_at,
      bank_name: req.body.bank_name,
      account_holder: req.body.account_holder,
      account_number: req.body.account_number,
      receipts: req.body.receipts,
      remarks: req.body.remarks,
    });
    res.json(transaction);
  } catch (error) {
    next(error);
  }
}

export async function modifyTransaction(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const transaction = await Transaction.findByIdAndUpdate(id, updateData, { new: true });
    res.json(transaction);
  } catch (error) {
    next(error);
  }
}

export async function deleteTransaction(req: Request, res: Response, next: NextFunction) {
  const transactionId = req.params.id;
  try {
    const transaction = await Transaction.findByIdAndDelete(transactionId);
    res.json({ message: 'Transaction successfully deleted', transaction });
  } catch (error) {
    next(error);
  }
}

export async function getTransactionsByOrganizationAndYear(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const organizationId = req.params.organizationId;
  const year = Number(req.params.year);

  try {
    const transactions = await Transaction.find({
      organization: organizationId,
      transaction_at: {
        $gte: new Date(year, 0, 1),
        $lt: new Date(year, 11, 31, 23, 59, 59),
      },
    });
    res.json(transactions);
  } catch (error) {
    next(error);
  }
}