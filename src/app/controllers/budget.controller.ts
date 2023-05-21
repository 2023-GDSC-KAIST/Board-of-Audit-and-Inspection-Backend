import { NextFunction, Request, Response } from 'express';
import { Budget } from '../schemas';

export async function register_expense(req: Request, res: Response, next: NextFunction) {
    try {
        
        const expense = await Budget.create({
            organization: req.params.org_id,
            item: req.body.item_id, // Request body에 item 0bject id를 넣어 주는 것으로 가정
            budget: req.body.budget,
            remarks: req.body.remarks,
        });
        res.json(expense); // DB Expense collections에 등록 필요
    } catch (err) {
        next(err);
    }
}
