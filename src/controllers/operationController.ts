import { Request, Response } from 'express';
import Operation from '@/models/Operation';
// import { matchedData, validationResult } from 'express-validator';

export const getAllOperations = async (_: Request, res: Response) => {
	try {
		const operations: Operation[] = await Operation.query();

		res.send({
			success: true,
			data: operations,
		});
	} catch (err) {
		res.json({
			success: false,
			message: err,
		});
	}
};