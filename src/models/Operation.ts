import { Model } from 'objection';
import User from './User';

export default class Operation extends Model {
	id!: number;
	userId!: number;
	categoryId!: number;
	operationType!: string;
	date!: Date;
	sum!: number;

	tags?: string[];
	descroption?: string;

	// Table name is the only required property.
	static get tableName() {
		return 'users';
	}

	// static jsonSchema = {
	// 	type: 'object',
	// 	required: ['userId', 'categoryId', 'type', 'date', 'sum'],

	// 	properties: {
	// 		id: { type: 'integer' },
	// 		userId: { type: 'integer' },
	// 		categoryId: { type: 'integer' },
	// 		operationType: { type: 'string', minLength: 1, maxLength: 255 },
	// 		date: { type: 'string', format: 'date-time' },
	// 		sum: { type: 'integer' },

	// 		tags: { type: 'array', items: 'integer' },
	// 		descroption: { type: 'string', minLength: 1, maxLength: 255 },
	// 	},
	// };

	static get relationMappings() {
		return {
			user: {
				relation: Model.BelongsToOneRelation,
				modelClass: User,
				join: {
					from: 'operations.userId',
					to: 'users.id',
				},
			},
			// tags: {
			// 	relation: Model.BelongsToOneRelation,
			// 	modelClass: User,
			// 	join: {
			// 		from: 'operations.userId',
			// 		to: 'users.id',
			// 	},
			// },
		};
	}
}

module.exports = {
	Operation,
};
