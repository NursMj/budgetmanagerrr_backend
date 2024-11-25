import { Request, Response } from 'express';
import Operation from '@/models/Operation';

export const getMonthlyStats = async (req: Request, res: Response) => {
	try {
		const { user_id } = req;
		const { month, category_id } = req.query;

		if (!month) {
			throw new Error('Month is requared');
		}

        const currentYear = new Date().getFullYear();
		const startDate = new Date(`${currentYear}-${month}-01`);
		const endDate = new Date(startDate);
		endDate.setMonth(startDate.getMonth() + 1);

		const query = Operation.query()
			.where('user_id', user_id!)
			.whereBetween('date', [startDate, endDate])
			.modify((qb) => {
				if (category_id) {
					qb.where('category_id', category_id as string);
				}
			})
			.select(
				Operation.raw('WEEK(date) AS week'),
				Operation.raw("SUM(CASE WHEN operation_type = 'income' THEN sum ELSE 0 END) AS income"),
				Operation.raw("SUM(CASE WHEN operation_type = 'outcome' THEN sum ELSE 0 END) AS outcome")
			)
            .groupByRaw('WEEK(date)');

		const result = await query;
		res.json({ month, weeks: result });
	} catch (err: any) {
		res.json({
			success: false,
			message: err.message || err,
		});
	}
};

export const getYearlyStats = async (req: Request, res: Response) => {
	try {
		const { user_id } = req;
		const { year, category_id } = req.query;

		if (!year) {
			throw new Error('Year is requared') ;
		}

		const startDate = new Date(`${year}-01-01`);
		const endDate = new Date(`${parseInt(year as string) + 1}-01-01`);

		const query = Operation.query()
			.where('user_id', user_id!)
			.whereBetween('date', [startDate, endDate])
			.modify((qb) => {
				if (category_id) {
					qb.where('category_id', category_id as string);
				}
			})
			.select(
				Operation.raw('MONTH(date) AS month'),
				Operation.raw("SUM(CASE WHEN operation_type = 'income' THEN sum ELSE 0 END) AS income"),
				Operation.raw("SUM(CASE WHEN operation_type = 'outcome' THEN sum ELSE 0 END) AS outcome")
			)
			.groupByRaw('MONTH(date)');

		const result = await query;
		res.json({ year, months: result });
	} catch (err: any) {
		res.json({
			success: false,
			message: err.message || err,
		});
	}
};
