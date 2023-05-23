import { NextFunction, Request, Response } from 'express';
import { Budget } from '../schemas/budget';
import { Transaction } from '../schemas/transaction';


export async function deleteBudget(req: Request, res: Response, next: NextFunction) {
    const budgetID = req.params.id;
    try {
      const budget = await Budget.findByIdAndDelete(budgetID);
      res.json({ message: 'budget successfully deleted', budget });
    } catch (error) {
      next(error);
    }
}

export async function getSettlementByOrganizationAndYear(req: Request, res: Response, next: NextFunction) {
    const settlementOrganization = req.params.organization;
    const settlementYear = req.params.year;

    try {
      // const budget = await Budget.find({organization:budgetOrganization});
      const transactionSettlement = await Transaction.aggregate([
        {
          $lookup: {
            from: "Item",
            localField: "item",
            foreignField: "year",
            as: "year"
          }
        },
        {
          $match: {
            organization: { $eq: settlementOrganization },
            year: { $eq: settlementYear }
          }
        },
        {
          $group: {
            income: { $sum: "$income" },
            expense: { $sum: "$expense" }
          }
        }
      ]);
      const budgetIncome = await Budget.aggregate([
        {
          $lookup: {
            from: "Item",
            localField: "item",
            foreignField: "year",
            as: "year"
          }
        },
        {
          $lookup: {
            from: "Item",
            localField: "item",
            foreignField: "item",
            as: "income"
          }
        },
        {
          $match: {
            organization: { $eq: settlementOrganization },
            year: { $eq: settlementYear },
            income: { $ne: null }
          }
        },
        {
          $group: {
            income: { $sum: "$budget" }
          }
        }
      ]);
      const budgetExpense = await Budget.aggregate([
        {
          $lookup: {
            from: "Item",
            localField: "item",
            foreignField: "year",
            as: "year"
          }
        },
        {
          $lookup: {
            from: "Item",
            localField: "item",
            foreignField: "item",
            as: "income"
          }
        },
        {
          $match: {
            organization: { $eq: settlementOrganization },
            year: { $eq: settlementYear },
            income: { $eq: null }
          }
        },
        {
          $group: {
            expense: { $sum: "$budget" }
          }
        }
      ]);
      const settlement:object[] = [{
        type: "수익",
        budget: budgetIncome[0].income,
        settlement: transactionSettlement[0].income,
        execute_rate: transactionSettlement[0].income/budgetIncome[0].income
      },
      {
        type: "지출",
        budget: budgetExpense[0].expense,
        settlement: transactionSettlement[0].expense,
        execute_rate: transactionSettlement[0].expense/budgetExpense[0].expense
      }];
      const result = {
        total: transactionSettlement[0].income - transactionSettlement[0].expense,
        settlement
      };
      //    logger.info(budget);
      res.json(result);
    } catch (error) {
      next(error);
    }
}