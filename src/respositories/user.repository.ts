import { raw } from 'objection';
import User from '../models/User.model';
import { IUser, IUsersResponse } from '../types/user.types';

class UserRepository {
  async getUsers(params: IUsersResponse) {
    const { pageNumber, limit, searchQuery, orderBy, sortBy } = params;
    const offset = (pageNumber - 1) * limit;

    const users = User.query()
      .modify(builder => {
        builder.select('id', 'firstName', 'lastName', 'email', 'created_at', 'updated_at');
        if (searchQuery) {
          builder.where('firstName', 'ilike', `%${searchQuery}%`)
            .orWhere('lastName', 'ilike', `%${searchQuery}%`)
            .orWhere('email', 'ilike', `%${searchQuery}%`);
        }
      })
      .where({ is_active: true })
      .orderBy(sortBy === "date" ? "created_at" : "updated_at", orderBy === "asc" ? "ASC" : "DESC")
      .limit(limit)
      .offset(offset);

    return users;
  }

  async addUser(user: IUser) {
    return User.query().insert(user);
  }

  async deleteUser(id: number) {
    return User.query().update({ is_active: false }).where({ id });
  }

  async updateUser(id: number, user: IUser) {
    const { firstName, lastName } = user;
    return User.query().patchAndFetchById(id, { ...(firstName && { firstName }), ...(lastName && { lastName }) });

  }


  async getUser(id: number) {
    const user = await User.query()
      .select(
        'users.id',
        'users.email',
        'users.firstName',
        'users.lastName',
        'users.created_at',
        'users.updated_at',
        raw(`(SELECT COUNT(*) FROM follows WHERE follows.follower_id = users.id) AS "followersCount"`),
        raw(`(SELECT COUNT(*) FROM follows WHERE follows.following_id = users.id) AS "followingCount"`)
      )
      .where({ 'users.id': id, 'users.is_active': true })
      .first();

    if (user) {
      user["followersCount"] = parseInt(user["followersCount"] as unknown as string, 10);
      user["followingCount"] = parseInt(user["followingCount"] as unknown as string, 10);
    }

    return user;
  }



  async getUserByEmail(email: string) {
    return User.query().findOne({ email, is_active: true });
  }

  async checkUserExists(id: number) {
    return User.query().where({ id, is_active: true }).first();
  }
}

export default UserRepository;
