import { NextFunction, Request, Response } from 'express';
import { Budget } from '../schemas';

export async function register_expense(req: Request, res: Response, next: NextFunction) {
    try {
        
        const expense = await Budget.create({
            organization: req.params.org_id,
            item: req.params.item_id, // item id 어떻게 부여받고 전달 받는지 규명 필요
            budget: req.body.budget,
            remarks: req.body.remarks,
        });
        res.json(expense); // DB Expense collections에 등록 필요?
    } catch (err) {
        next(err);
    }
}
