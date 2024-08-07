import { Model, ValidationError } from 'objection';
import bcrypt from 'bcryptjs';
import Tweet from './Tweet.model';

class User extends Model {
  id!: number;
  firstName!: string;
  lastName!: string;
  password!: string;
  email!: string;
  is_active!: boolean;
  updated_at!: Date;
  created_at!: Date;

  static get tableName() {
    return 'users';
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['firstName', 'lastName', 'password', 'email'],
      properties: {
        id: { type: 'integer' },
        firstName: { type: 'string', minLength: 1, maxLength: 255 },
        lastName: { type: 'string', minLength: 1, maxLength: 255 },
        password: { type: 'string', minLength: 5, maxLength: 255 },
        is_active: { type: 'boolean', default: true },
        email: { type: 'string', format: 'email', minLength: 5, maxLength: 255 },
      }
    };
  }

  async $beforeInsert(context) {
    await super.$beforeInsert(context);
    await this.hashPassword();
    await this.ensureUniqueEmail();
  }

  async $beforeUpdate(opt, context) {
    await super.$beforeUpdate(opt, context);
    await this.ensureUniqueEmail();
  }

  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async ensureUniqueEmail() {
    const existingUser = await User.query().findOne({ email: this.email });
    if (existingUser && existingUser.id !== this.id) {
      throw new ValidationError({
        message: 'Email must be unique',
        type: 'ModelValidation',
        data: {
          email: 'Email already exists'
        }
      });
    }
  }



  static get relationMappings() {

    return {
      tweets: {
        relation: Model.HasManyRelation,
        modelClass: Tweet,
        join: {
          from: 'users.id',
          to: 'tweets.user_id'
        }
      },
      followers: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: 'users.id',
          through: {
            from: 'follows.following_id',
            to: 'follows.follower_id'
          },
          to: 'users.id'
        }
      },
      followings: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: 'users.id',
          through: {
            from: 'follows.follower_id',
            to: 'follows.following_id'
          },
          to: 'users.id'
        }
      }
    };
  }
}
export default User;
