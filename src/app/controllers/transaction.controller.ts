import { NextFunction, Request, Response } from 'express';
import { Organization, Transaction } from '../schemas';

export async function getTransactions(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    //TODO: filter 추가
    const organization = await Organization.findOne({
      name: req.params.organization,
    });
    if (!organization) {
      return res.status(404).send('organization not found');
    }

    const transactions = await Transaction.find({
      organization: organization,
    });
    res.json(transactions);
  } catch (error) {
    next(error);
  }
}

export async function createTransaction(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const organization = await Organization.findOne({
      name: req.params.organization,
    });
    if (!organization) {
      return res.status(404).send('organization not found');
    }

    //TOOD: 수입 / 지출 validation
    const transaction = await Transaction.create({
      organization: organization,
      year: req.params.year,
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
      // receipts: req.body.receipts,
      remarks: req.body.remarks,
    });
    res.json(transaction);
  } catch (error) {
    next(error);
  }
}

export async function modifyTransaction(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    //TOOD: 수입 / 지출 validation
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      {
        business_at: req.body.business_at,
        manager: req.body.manager,
        income: req.body.income,
        expense: req.body.expense,
        balance: req.body.balance,
        transaction_at: req.body.transaction_at,
        bank_name: req.body.bank_name,
        account_holder: req.body.account_holder,
        account_number: req.body.account_number,
        // receipts: req.body.receipts,
        remarks: req.body.remarks,
      },
      { new: true },
    );
    res.json(transaction);
  } catch (error) {
    next(error);
  }
}

export async function deleteTransaction(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);
    res.json(transaction);
  } catch (error) {
    next(error);
  }
}
