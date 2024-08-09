import Follow from '../models/Follow.model';
import { IFollow, IFollowersOrFollowingsResponse } from '../types/follow.types';

class FollowRepository {
  async addFollow(follow: IFollow) {
    return Follow.query().insert(follow);
  }
  async updateFollow(follow: IFollow) {
    return Follow.query().where({ following_id: follow.following_id, follower_id: follow.follower_id }).patch(follow);
  }
  async getFollowers(params: IFollowersOrFollowingsResponse) {
    const { limit, pageNumber, searchQuery, userId, orderBy, sortBy } = params;
    const offset = (pageNumber - 1) * limit;

    return Follow.query()
      .where({ following_id: userId, is_active: true })
      .withGraphFetched('follower')
      .modifyGraph('follower', builder => {
        builder.select('id', 'firstName', 'lastName', 'email');
        if (searchQuery) {
          builder.where('firstName', 'ilike', `%${searchQuery}%`)
            .orWhere('lastName', 'ilike', `%${searchQuery}%`)
            .orWhere('email', 'ilike', `%${searchQuery}%`);
        }
      })
      .orderBy(sortBy === "date" ? "created_at" : "updated_at", orderBy === "oldest" ? "ASC" : "DESC")
      .offset(offset)
      .limit(limit);
  }

  async getFollowings(params: IFollowersOrFollowingsResponse) {
    const { limit, pageNumber, searchQuery, userId, orderBy, sortBy } = params;
    const offset = (pageNumber - 1) * limit;

    return Follow.query()
      .where({ follower_id: userId, is_active: true })
      .withGraphFetched('following')
      .modifyGraph('following', builder => {
        builder.select('id', 'firstName', 'lastName', 'email');
        if (searchQuery) {
          builder.where('firstName', 'ilike', `%${searchQuery}%`)
            .orWhere('lastName', 'ilike', `%${searchQuery}%`)
            .orWhere('email', 'ilike', `%${searchQuery}%`);
        }
      })
      .orderBy(sortBy === "date" ? "created_at" : "updated_at", orderBy === "oldest" ? "ASC" : "DESC")
      .offset(offset)
      .limit(limit);
  }


  async deleteFollow(follow: IFollow) {
    return Follow.query().where(follow).patch({ is_active: false });
  }

  async getFollow(followerId: number, followingId: number) {
    return Follow.query().where({ follower_id: followerId, following_id: followingId }).first();
  }
}

export default FollowRepository;
