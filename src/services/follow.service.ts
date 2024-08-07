import FollowRepository from '../respositories/follow.repository'
import UserRepository from '../respositories/user.repository';
import { IFollow, IFollowersOrFollowingsResponse } from '../types/follow.types';

class FollowService {
  constructor(private readonly _followRepository: FollowRepository, private readonly _userRepository: UserRepository) { }


  async checkIfUserExists(userId: number) {
    try {
      const user = await this._userRepository.checkUserExists(userId);
      if (!user) {
        throw new Error('User does not exist');
      }
      return user;
    } catch (e) {
      throw new Error('Error checking if user exists');
    }
  }

  async updateFollow(follow: IFollow) {
    try {
      return await this._followRepository.updateFollow(follow);
    } catch (e) {
      throw new Error('Error updating follow');
    }
  }
  async addFollow(follow: IFollow) {
    try {
      if (follow.follower_id === follow.following_id) {
        throw new Error('You cannot follow yourself');
      }
      const isFollowing = await this._followRepository.getFollow(follow.follower_id, follow.following_id);
      if (isFollowing["is_active"]) {
        throw new Error('You are already following this user');
      }
      const follower = await this.checkIfUserExists(follow.follower_id);
      if (!follower) {
        throw new Error('Follower does not exist');
      }
      if (isFollowing) {
        return await this._followRepository.updateFollow({ ...follow, is_active: true });
      }
      return await this._followRepository.addFollow(follow);
    } catch (e) {
      throw e;
    }
  }

  async getFollowers(params: IFollowersOrFollowingsResponse) {
    try {
      return await this._followRepository.getFollowers(params);
    } catch (e) {
      throw new Error('Error fetching followers');
    }
  }

  async getFollowing(params: IFollowersOrFollowingsResponse) {
    try {
      return await this._followRepository.getFollowings(params);
    } catch (e) {
      throw new Error('Error fetching following');
    }
  }

  async unfollowUser(follow: IFollow) {
    try {
      if (follow.follower_id === follow.following_id) {
        throw new Error('You cannot unfollow yourself');
      }
      const isFollowing = await this._followRepository.getFollow(follow.follower_id, follow.following_id);
      if (!isFollowing) {
        throw new Error('You are not following this user');
      }

      if (!isFollowing["is_active"]) {
        throw new Error('You have already unfollowed this user');
      }
      const follower = await this.checkIfUserExists(follow.follower_id);
      if (!follower) {
        throw new Error('Follower does not exist');
      }

      return await this._followRepository.deleteFollow(follow);
    } catch (e) {
      throw e;
    }
  }
}

export default new FollowService(new FollowRepository(), new UserRepository());
