import { Router } from 'express';

import { IUser } from './types';

const router = Router();

const mockUsers: IUser[] = [
	{ id: 1, userName: 'Nurs', fullName: 'Nursultan', password: '123456' },
	{ id: 2, userName: 'Nurs2', fullName: 'Nursultan 2', password: '123456' },
];

router.get('/', (_, res) => {
	res.send(mockUsers);
});

router.get('/:id', (req, res) => {
	const parsedId = parseInt(req.params.id);
	if (isNaN(parsedId)) {
		res.status(400).send({ msg: 'Bad Request. Invalid ID' });
	} else {
		const foundUser = mockUsers.filter((user) => user.id === parsedId)[0];
		if (!foundUser) {
			res.sendStatus(404);
		} else {
			res.send(foundUser);
		}
	}
});

export default router;
