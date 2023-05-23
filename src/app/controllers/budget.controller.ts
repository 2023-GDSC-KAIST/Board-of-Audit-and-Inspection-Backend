import { NextFunction, Request, Response } from 'express';
import { Budget, Organization, Item } from '../schemas';
import mongoose from 'mongoose';

/* budget(income) 생성 */
export async function createBudgetIncome(req: Request, res: Response, next: NextFunction) {
  try {
    const {fund_source, item, item_code, budget, remarks} = req.body;
    const organization = req.params.org_id;
    const budgetData: any = {
        organization,
        item,
        budget,
    };
  
    // Add optional fields if present in the request body
    if (fund_source) {
    budgetData.fund_source = fund_source;
    }
    if (remarks) {
    budgetData.remarks = remarks;
    }

    const newIncomeBudget = await Budget.create(budgetData);
    res.status(201).json(newIncomeBudget);
  } catch (error) {
    next(error);
  }
}

// /* organization의 특정 년도 income 조회 */
// export async function getBudgetIncome(req: Request, res: Response, next: NextFunction) {
//   try {
//     const organizationId = req.params.org_id;
//     const year = req.params.year;
    
//     const items = await Item.find({organization: organizationId, year: year});




//     // const id: string = req.params.id;
//     // const user: UserDocument | null = await User.findById(id).exec();
//     // if (!user) {
//     //   res.status(404).send(`User with ID ${id} not found`);
//     // } else {
//     //   res.status(200).json(user);
//     // }
//   } catch (error) {
//     next(error);
//   }
// }

/* budget (income) update */
export async function updateBudgetIncome(req: Request, res: Response, next: NextFunction) {
  try {
    // const organization: string = req.params.org_id;
    const {budget_id, item, budget, remarks} = req.body;
    const updatedBudget = await Budget.findByIdAndUpdate(budget_id, {item: item, budget: budget, remarks: remarks}, {new: true});
    if (!updatedBudget) {
        res.status(404).send('Budget with ID ${budget_id} not found');
    } else {
        res.status(200).json(updatedBudget);
    }

  } catch (error) {
    next(error);
  }
}



