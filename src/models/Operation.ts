import { Model } from 'objection';
import User from './User';
import Category from './Category';

export default class Operation extends Model {
	id!: number;
	user_id!: number;
	category_id!: number;
	operation_type!: string;
	sum!: number;
	date!: Date;
	created_at?: Date;
	updated_at?: Date;

	description!: string;

	// Table name is the only required property.
	static get tableName() {
		return 'operations';
	}

	static get relationMappings() {
		return {
			user: {
				relation: Model.BelongsToOneRelation,
				modelClass: User,
				join: {
					from: 'operations.user_id',
					to: 'users.id',
				},
			},
			category: {
				relation: Model.BelongsToOneRelation,
				modelClass: Category,
				join: {
					from: 'operations.category_id',
					to: 'categories.id',
				},
			},
		};
	}
}
