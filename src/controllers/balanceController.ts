import { Request, Response } from 'express';
import Operation from '@/models/Operation';

export const getUserBalance = async (req: Request, res: Response) => {
	try {
		const { user_id } = req;

		const operations: Operation[] = await Operation.query().where('user_id', user_id!);

		const balance = operations.reduce((acc, operation) => {
			if (operation.operation_type === 'outcome') {
				acc = acc - operation.sum;
				return acc;
			} else {
				acc = acc + operation.sum;
				return acc;
			}
		}, 0);

		res.json({
			success: true,
			data: balance,
		});
	} catch (err: any) {
		res.json({
			success: false,
			message: err.message || err,
		});
	}
};
