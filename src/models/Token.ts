import User from '@/models/User';
import { Model } from 'objection';
import jwt from 'jsonwebtoken';
import { UAParser } from 'ua-parser-js';

export default class Token extends Model {
	id!: number;
	user_id!: number;
	access_token!: string;
	refresh_token!: string;
	ua!: string;
	date_added!: Date;
	date_modified!: Date;

	static get tableName() {
		return 'tokens';
	}

	async $beforeInsert() {
		this.date_added = new Date();
	}

	async $beforeUpdate(context: any) {
		this.date_modified = new Date();
	}

	static get relationMappings() {
		return {
			user: {
				relation: Model.BelongsToOneRelation,
				modelClass: User,
				join: {
					from: 'tokens.user_id',
					to: 'users.id',
				},
			},
		};
	}

	verifyAccessToken(option = {}) {
		return jwt.verify(this.access_token, process.env.ACCESS_TOKEN_SECRET!, option);
	}

	verifyRefreshToken(option = {}) {
		return jwt.verify(this.refresh_token, process.env.REFRESH_TOKEN_SECRET!, option);
	}

	async getUA(ua: any) {
		const parser = new UAParser();
		parser.setUA(ua);
		const agent = parser.getResult();
		return JSON.stringify({ ...agent });
	}
}
