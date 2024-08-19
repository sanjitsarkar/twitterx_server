import { raw } from 'objection';
import User from '../models/User.model';
import { IUser, IUsersResponse } from '../types/user.types';

class UserRepository {
  async getUsers(params: IUsersResponse) {
    const { pageNumber, limit, searchQuery, orderBy, sortBy, userId } = params;
    const offset = (pageNumber - 1) * limit;

    const users = User.query()
      .modify(builder => {
        builder.select(
          'users.id',
          'users.firstName',
          'users.lastName',
          'users.email',
          'users.created_at',
          'users.updated_at'
        );
        if (searchQuery) {
          builder.where('users.firstName', 'ilike', `%${searchQuery}%`)
            .orWhere('users.lastName', 'ilike', `%${searchQuery}%`)
            .orWhere('users.email', 'ilike', `%${searchQuery}%`);
        }
      })
      .leftJoin('follows', 'users.id', 'follows.following_id')
      .leftJoin('follows AS f', 'users.id', 'f.follower_id')
      .select(
        'users.id',
        'users.firstName',
        'users.lastName',
        'users.email',
        'users.created_at',
        'users.updated_at',
        raw(`CAST((SELECT COUNT(*) FROM follows WHERE follows.follower_id = users.id AND follows.is_active = true) AS INTEGER) AS "followersCount"`),
        raw(`CAST((SELECT COUNT(*) FROM follows WHERE follows.following_id = users.id AND follows.is_active = true) AS INTEGER) AS "followingCount"`),
        raw(`EXISTS (SELECT 1 FROM follows WHERE follows.follower_id = ${userId} AND follows.following_id = users.id AND follows.is_active = true) AS "isFollower"`),
        raw(`EXISTS (SELECT 1 FROM follows WHERE follows.following_id = ${userId} AND follows.follower_id = users.id  AND follows.is_active = true) AS "isFollowing"`)
      )
      .where({ 'users.is_active': true })
      .whereNot({ 'users.id': userId })
      .groupBy('users.id')
      .orderBy(sortBy === "date" ? "users.created_at" : "users.updated_at", orderBy === "oldest" ? "ASC" : "DESC");

    if (!pageNumber) {
      users.limit(limit)
        .offset(offset);
    }

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
        raw(`(SELECT COUNT(*) FROM follows WHERE follows.follower_id = users.id AND follows.is_active = true) AS "followersCount"`),
        raw(`(SELECT COUNT(*) FROM follows WHERE follows.following_id = users.id AND follows.is_active = true) AS "followingCount"`)
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
