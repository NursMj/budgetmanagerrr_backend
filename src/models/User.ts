import config from '@/config';
import jwt from "jsonwebtoken"
import { Model } from 'objection';
import Operation from './Operation'
import Category from './Category';

export default class User extends Model {
	id!: number;
	username!: string;
	display_name!: string;
	password!: string;

	static get tableName() {
		return 'users';
	}

	static jsonSchema = {
		type: 'object',
		required: ['username', 'display_name', 'password'],

		properties: {
			id: { type: 'integer' },
			username: { type: 'string', minLength: 1, maxLength: 255 },
			display_name: { type: 'string', minLength: 1, maxLength: 255 },
			password: { type: 'string', minLength: 1, maxLength: 255 },
		},
	};

	static get relationMappings() {
		return {
			operations: {
				relation: Model.HasManyRelation,
				modelClass: Operation,
				join: {
					from: 'users.id',
					to: 'operations.user_id',
				},
			},
			categories: {
				relation: Model.HasManyRelation,
				modelClass: Category,
				join: {
					from: 'users.id',
					to: 'categories.user_id',
				},
			},
		};
	}

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
