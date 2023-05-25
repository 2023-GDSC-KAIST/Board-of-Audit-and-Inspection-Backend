import { NextFunction, Request, Response } from 'express';
import { Budget, Item, Organization, Transaction } from '../schemas';
import logger from '../util/logger';
import { Types } from 'mongoose';

export async function createExpense(
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

    logger.debug(organization.toString());
    logger.debug(req.params.year);

    //TODO: item validation
    const budget = await Budget.findOneAndUpdate(
      {
        organization: organization,
        year: req.params.year,
        item: req.body.item,
      },
      {
        organization: organization,
        year: req.params.year,
        type: req.body.manager,
        fund_source: req.body.fund_source,
        item: req.body.item,
        budget: req.body.budget,
        remarks: req.body.remarks,
      },
      {
        upsert: true,
        new: true,
      },
    );
    res.json(budget);
  } catch (error) {
    next(error);
  }
}

export async function updateExpense(
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

    // fund_source, budget, remarks만 수정가능함.
    const budget = await Budget.findByIdAndUpdate(
      req.params.id,
      {
        fund_source: req.body.fund_source,
        manager: req.body.manager,
        budget: req.body.budget,
        remarks: req.body.remarks,
      },
      {
        new: true,
      },
    );
    res.json(budget);
  } catch (err) {
    next(err);
  }
}

export async function getExpenseBudgets(
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

    const budgets = await Budget.find({
      organization: organization,
      year: req.params.year,
      budget: {
        $lt: 0,
      },
    });
    res.json(budgets);
  } catch (err) {
    next(err);
  }
}

// /* organization의 특정 년도 income 조회 */
export async function getBudgetIncome(
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

    const budgets = await Budget.find({
      organization: organization,
      year: req.params.year,
      budget: {
        $gte: 0,
      },
    });
    res.json(budgets);
  } catch (error) {
    next(error);
  }
}

export async function createBudgetIncome(
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

    //TODO: item validation
    const budget = await Budget.findOneAndUpdate(
      {
        organization: organization,
        year: req.params.year,
        item: req.body.item,
      },
      {
        organization: organization,
        year: req.params.year,
        fund_source: req.body.fund_source,
        item: req.body.item,
        budget: req.body.budget,
        remarks: req.body.remarks,
      },
      {
        upsert: true,
        new: true,
      },
    );
    res.json(budget);
  } catch (error) {
    next(error);
  }
}

/* budget (income) update */
export async function updateBudgetIncome(
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

    // fund_source, budget, remarks만 수정가능함.
    const budget = await Budget.findByIdAndUpdate(
      req.params.id,
      {
        fund_source: req.body.fund_source,
        budget: req.body.budget,
        remarks: req.body.remarks,
      },
      {
        new: true,
      },
    );
    res.json(budget);
  } catch (error) {
    next(error);
  }
}

export async function deleteBudget(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const budgetID = req.params.id;
  try {
    const budget = await Budget.findByIdAndDelete(budgetID);
    res.json({ message: 'budget successfully deleted', budget });
  } catch (error) {
    next(error);
  }
}

export async function getSettlementByOrganizationAndYear(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const organization = await Organization.findOne({
    name: req.params.organization,
  });
  if (!organization) {
    return res.status(404).send('organization not found');
  }

  try {
    const transactionSettlement = await Transaction.aggregate([
      {
        $match: {
          organization: organization._id,
        },
      },
      {
        $lookup: {
          from: Item.collection.name,
          localField: 'item',
          foreignField: '_id',
          pipeline: [
            {
              $match: {
                year: parseInt(req.params.year),
              },
            },
          ],
          as: 'item_info',
        },
      },
      {
        $unwind: '$item_info',
      },
      {
        $group: {
          _id: '$_id',
          inc: { $sum: '$income' },
          exp: { $sum: '$expense' },
        },
      },
    ]).exec();
    const budgetIncome = await Budget.aggregate([
      {
        $match: {
          organization: organization._id,
          year: parseInt(req.params.year),
        },
      },
      {
        $lookup: {
          from: Item.collection.name,
          localField: 'item',
          foreignField: '_id',
          pipeline: [
            {
              $match: {
                item: { $ne: null },
              },
            },
          ],
          as: 'item_info',
        },
      },
      {
        $unwind: '$item_info',
      },
      {
        $group: {
          _id: '$budget',
          inc: { $sum: '$budget' },
        },
      },
    ]).exec();
    const budgetExpense = await Budget.aggregate([
      {
        $match: {
          organization: organization._id,
          year: parseInt(req.params.year),
        },
      },
      {
        $lookup: {
          from: Item.collection.name,
          localField: 'item',
          foreignField: '_id',
          pipeline: [
            {
              $match: {
                item: null,
              },
            },
          ],
          as: 'item_info',
        },
      },
      {
        $unwind: '$item_info',
      },
      {
        $group: {
          _id: '$budget',
          exp: { $sum: '$budget' },
        },
      },
    ]).exec();
    let totalBudgetIncome = 0;
    let totalBudgetExpense = 0;
    let totalTransactionIncome = 0;
    let totalTransactionExpense = 0;
    for (let i = 0; i < budgetIncome.length; i++) {
      totalBudgetIncome += budgetIncome[i].inc;
    }
    for (let i = 0; i < budgetExpense.length; i++) {
      totalBudgetExpense += budgetExpense[i].inc;
    }
    for (let i = 0; i < transactionSettlement.length; i++) {
      totalTransactionIncome += transactionSettlement[i].inc;
      totalTransactionExpense += transactionSettlement[i].exp;
    }
    const settlement: object[] = [
      {
        type: '수익',
        budget: totalBudgetIncome,
        settlement: totalTransactionIncome,
        execute_rate: (totalTransactionIncome / totalBudgetIncome) * 100,
      },
      {
        type: '지출',
        budget: totalBudgetExpense,
        settlement: totalTransactionExpense,
        execute_rate: (totalTransactionExpense / totalBudgetExpense) * 100,
      },
    ];
    const result = {
      total: totalTransactionIncome - totalTransactionExpense,
      settlement,
    };
    res.json(result);
  } catch (error) {
    next(error);
  }
}
