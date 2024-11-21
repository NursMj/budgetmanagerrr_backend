import config from '@/config';
import jwt from "jsonwebtoken"
import { Model } from 'objection';
// import Operation from './Operation'

export default class User extends Model {
	id!: number;
	userName!: string;
	displayName!: string;
	password!: string;

	static get tableName() {
		return 'users';
	}

	static jsonSchema = {
		type: 'object',
		required: ['userName', 'displayName', 'password'],

		properties: {
			id: { type: 'integer' },
			userName: { type: 'string', minLength: 1, maxLength: 255 },
			displayName: { type: 'string', minLength: 1, maxLength: 255 },
			password: { type: 'string', minLength: 1, maxLength: 255 },
		},
	};

	// static get relationMappings() {
	// 	return {
	// 		operations: {
	// 			relation: Model.HasManyRelation,
	// 			modelClass: Operation,
	// 			join: {
	// 				from: 'users.id',
	// 				to: 'operations.userId',
	// 			},
	// 		},
	// 	};
	// }

	getAccessToken() {
		return jwt.sign(
			{
				username: 'this.username',
				user_id: 'this.id',
			},
			config.jwt.access_token_secret,
			{
				expiresIn: config.jwt.access_token_expiration,
			}
		);
	}

	getRefreshToken() {
		return jwt.sign(
			{
				username: 'this.username',
				user_id: 'this.id',
			},
			config.jwt.refresh_token_secret,
			{
				expiresIn: config.jwt.refresh_token_expiration,
			}
		);
	}
}
