import { NextFunction, Request, Response } from 'express';
import { Budget, Organization, Transaction, Item } from '../schemas';

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

    const settlements = await Budget.aggregate([
      {
        $match: {
          $and: [
            {
              organization: organization._id,
            },
            {
              year: parseInt(req.params.year),
            },
            {
              manager: { $eq: null },
            },
          ],
        },
      },
      {
        $lookup: {
          from: Transaction.collection.name,
          localField: 'item',
          foreignField: 'item',
          as: 'transaction',
        },
      },
      { $unwind: '$transaction' },
      {
        $lookup: {
          from: Item.collection.name,
          localField: 'item',
          foreignField: '_id',
          as: 'items',
        },
      },
      { $unwind: '$items' },
      {
        $group: {
          _id: { item: '$item', fund_source: '$fund_source' },
          budget: { $first: '$budget' },
          settlement: { $sum: '$transaction.income' },
          remarks: { $first: '$remarks' },
          item_code: { $first: '$items.item_code' },
        },
      },
      {
        $group: {
          _id: '$_id.fund_source',
          total_budget: { $sum: '$budget' },
          total_settlement: { $sum: '$settlement' },
          items: {
            $push: {
              item: '$_id.item',
              item_code: '$item_code',
              budget: '$budget',
              settlement: '$settlement',
              remarks: '$remarks',
              execution_rate: { $divide: ['$settlement', '$budget'] },
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          fund_source: '$_id',
          total_budget: '$total_budget',
          total_settlement: '$total_settlement',
          items: '$items',
        },
      }
    ]);

    // const result1 = await settlements.aggregate()
    // res.json(budgets);
    res.json(settlements);
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
