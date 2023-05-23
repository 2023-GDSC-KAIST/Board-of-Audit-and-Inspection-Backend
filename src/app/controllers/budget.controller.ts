import { Types } from 'mongoose';
import { NextFunction, Request, Response } from 'express';
import { Budget } from '../schemas/budget';
import { Transaction } from '../schemas/transaction';
import { Item } from '../schemas/item';


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
      const budgetSettlement = await Budget.aggregate([
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
            budget: { $sum: "budget"},
            income: { $sum: "$income" },
            expense: { $sum: "$income" }
          }
        }
        // {
        //   $project: {
        //     total: transactionSettlement[0].income - transactionSettlement[0].expense,
        //     [{
        //       type: "수익",
        //       budget: income,
        //       settlement: transactionSettlement[0].income,
        //       execute_rate: transactionSettlement[0].income/income
        //     },
        //     {
        //       type: "지출",
        //       budget: expense,
        //       settlement: transactionSettlement[0].expense,
        //       execute_rate: transactionSettlement[0].expense/expense
        //     }]
        //   }
        // }
      ]);
      // let budget = await Budget.aggregate([
      //   { $match: filter },
      //   {
      //     $group: {
      //     type: "income/expense",
      //     budget: { $sum: "budget"},
      //     settlement: { $sum: "income/expense"},
      //     execute_rate: "settlement/budget"
      //     }
      //   }
      // ]);
  //    logger.info(budget);
      const settlement = {
        total: transactionSettlement[0].income - transactionSettlement[0].expense,
        [{
          type: "수익",
          budget: budgetSettlement[0].income,
          settlement: transactionSettlement[0].income,
          execute_rate: transactionSettlement[0].income/budgetSettlement[0].income
        },
        {
          type: "지출",
          budget: budgetSettlement[0].expense,
          settlement: transactionSettlement[0].expense,
          execute_rate: transactionSettlement[0].expense/budgetSettlement[0].expense
        }]
      };
      res.json(settlement);
    } catch (error) {
      next(error);
    }
}