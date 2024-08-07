import { Model } from 'objection';
import User from './User.model';

class Tweet extends Model {
  static get tableName() {
    return 'tweets';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['user_id', 'content'],
      properties: {
        id: { type: 'integer' },
        user_id: { type: 'integer' },
        content: { type: 'string', minLength: 1, maxLength: 280 },
        is_active: { type: 'boolean', default: true },
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' }
      }
    };
  }

  static get relationMappings() {

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'tweets.user_id',
          to: 'users.id'
        }
      }
    };
  }
}

export default Tweet;
