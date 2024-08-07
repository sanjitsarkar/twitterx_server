import { Model } from 'objection';
import User from './User.model';

class Follow extends Model {
  static get tableName() {
    return 'follows';
  }

  static get idColumn() {
    return ['follower_id', 'following_id'];
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['follower_id', 'following_id'],
      properties: {
        follower_id: { type: 'integer' },
        following_id: { type: 'integer' },
        is_active: { type: 'boolean', default: true },
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' }
      }
    };
  }

  static get relationMappings() {
    return {
      follower: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'follows.follower_id',
          to: 'users.id'
        }
      },
      following: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'follows.following_id',
          to: 'users.id'
        }
      }
    }
  }
}
export default Follow;
