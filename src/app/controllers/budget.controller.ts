import { NextFunction, Request, Response } from 'express';
import { Budget, Organization, Transaction } from '../schemas';

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
  const settlementOrganization = req.params.organization;
  const settlementYear = req.params.year;

  try {
    // const budget = await Budget.find({organization:budgetOrganization});
    const transactionSettlement = await Transaction.aggregate([
      {
        $lookup: {
          from: 'Item',
          localField: 'item',
          foreignField: 'year',
          as: 'year',
        },
      },
      {
        $match: {
          organization: { $eq: settlementOrganization },
          year: { $eq: settlementYear },
        },
      },
      {
        $group: {
          income: { $sum: '$income' },
          expense: { $sum: '$expense' },
        },
      },
    ]);
    const budgetIncome = await Budget.aggregate([
      {
        $lookup: {
          from: 'Item',
          localField: 'item',
          foreignField: 'year',
          as: 'year',
        },
      },
      {
        $lookup: {
          from: 'Item',
          localField: 'item',
          foreignField: 'item',
          as: 'income',
        },
      },
      {
        $match: {
          organization: { $eq: settlementOrganization },
          year: { $eq: settlementYear },
          income: { $ne: null },
        },
      },
      {
        $group: {
          income: { $sum: '$budget' },
        },
      },
    ]);
    const budgetExpense = await Budget.aggregate([
      {
        $lookup: {
          from: 'Item',
          localField: 'item',
          foreignField: 'year',
          as: 'year',
        },
      },
      {
        $lookup: {
          from: 'Item',
          localField: 'item',
          foreignField: 'item',
          as: 'income',
        },
      },
      {
        $match: {
          organization: { $eq: settlementOrganization },
          year: { $eq: settlementYear },
          income: { $eq: null },
        },
      },
      {
        $group: {
          expense: { $sum: '$budget' },
        },
      },
    ]);
    const settlement: object[] = [
      {
        type: '수익',
        budget: budgetIncome[0].income,
        settlement: transactionSettlement[0].income,
        execute_rate: transactionSettlement[0].income / budgetIncome[0].income,
      },
      {
        type: '지출',
        budget: budgetExpense[0].expense,
        settlement: transactionSettlement[0].expense,
        execute_rate:
          transactionSettlement[0].expense / budgetExpense[0].expense,
      },
    ];
    const result = {
      total: transactionSettlement[0].income - transactionSettlement[0].expense,
      settlement,
    };
    //    logger.info(budget);
    res.json(result);
  } catch (error) {
    next(error);
  }
}
