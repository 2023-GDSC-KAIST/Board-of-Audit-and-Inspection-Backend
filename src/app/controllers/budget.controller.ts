import { NextFunction, Request, Response } from 'express';
import { Budget } from '../schemas';

export async function registerExpense(req: Request, res: Response, next: NextFunction) {
    try {
        
        const expense = await Budget.create({
            organization: req.params.org_id,
            item: req.body.item_id, // Request body에 item 0bject id를 넣어 주는 것으로 가정
            budget: req.body.budget,
            remarks: req.body.remarks,
        });
        res.json(expense);
    } catch (err) {
        next(err);
    }
}

export async function modifyExpense(req: Request, res: Response, next: NextFunction) {
    try {
        
        const expense = await Budget.findByIdAndUpdate(req.body.budget_id, {
            item: req.body.item_id, // Request body에 item 0bject id를 넣어 주는 것으로 가정
            budget: req.body.budget,
            remarks: req.body.remarks,
        }
            );
        res.json(expense); // DB Expense collections에 등록 필요
    } catch (err) {
        next(err);
    }
}

export async function getExpenseBudgets(req: Request, res: Response, next: NextFunction) {
    try {

    // Create the filter object based on the provided organizationId and year
    const filter = {
      organization: req.params.org_id, // Filter by organizationId
      'item.year': req.params.year, // Filter by year field in item
    //   'item.item': { $exists: false }, // Filter by existence of item field in item
    };

    // Find the budgets using the filter
    console.log(filter);
    const budgets = await Budget.find(filter).populate('item');
    
    res.json(budgets);
    } catch (err) {
        next(err);
    }
}