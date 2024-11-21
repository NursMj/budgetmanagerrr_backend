import { Model } from 'objection';
import Operation from './Operation';
import User from './User';

export default class Category extends Model {
    id!: number;
    name!: string;	
	user_id!: number;
    created_at!: { type: 'string'; format: 'date-time' };
	updated_at!: { type: 'string'; format: 'date-time' };

    static get tableName() {
      return 'categories';
    }
  
    static get relationMappings() {
      return {
        operations: {
          relation: Model.HasManyRelation,
          modelClass: Operation,
          join: {
            from: 'categories.id',
            to: 'operations.category_id'
          }
        },
        user: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: 'operations.user_id',
                to: 'users.id',
            },
        },
      };
    }
  }