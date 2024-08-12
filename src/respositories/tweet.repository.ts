import Tweet from '../models/Tweet.model';
import { ITweet, ITweetResponse, IUserTweetsResponse } from '../types/tweet.types';

class TweetRepository {
  async getAllTweets(params: ITweetResponse) {
    const { pageNumber, limit, searchQuery, orderBy, sortBy } = params;
    let tweets = Tweet.query()
      .where({ is_active: true })
      .withGraphFetched('user')
      .modifyGraph('user', builder => {
        builder.select('id', 'firstName', 'lastName', 'email');
      })
      .modify(builder => {
        if (searchQuery) {
          builder.where('content', 'ilike', `%${searchQuery}%`);
        }
      })
      .orderBy(sortBy === "date" ? "created_at" : "updated_at", orderBy === "oldest" ? "ASC" : "DESC");

    if (!pageNumber) {
      const offset = (pageNumber - 1) * limit;
      tweets = tweets.limit(limit).offset(offset);
    }

    return tweets;
  }
  async getFollowingsTweets(params: ITweetResponse) {
    const { pageNumber, limit, searchQuery, orderBy, sortBy, userId } = params;
    let offset = 0;
    let tweets = Tweet.query()
      .where({ is_active: true })
      .whereIn('user_id', function () {
        this.select('following_id')
          .from('follows')
          .where({ 'follower_id': userId, 'is_active': true });
      })
      .orWhere('user_id', userId)
      .withGraphFetched('user')
      .modifyGraph('user', builder => {
        builder.select('id', 'firstName', 'lastName', 'email');
      })
      .modify(builder => {
        if (searchQuery) {
          builder.where('content', 'ilike', `%${searchQuery}%`);
        }
      })
      .orderBy(sortBy === "date" ? "created_at" : "updated_at", orderBy === "oldest" ? "ASC" : "DESC");

    if (pageNumber) {
      offset = (pageNumber - 1) * limit;
      tweets = tweets.limit(limit).offset(offset);
    }

    return tweets;
  }

  async addTweet(tweet: ITweet) {
    return Tweet.query().insert(tweet).returning('*').withGraphFetched('user').modifyGraph('user', builder => {
      builder.select('id', 'firstName', 'lastName', 'email');
    });
  }

  async deleteTweet(id: number) {
    return Tweet.query().update({ is_active: false }).where({ id });
  }

  async updateTweet(id: number, tweet: ITweet) {
    return Tweet.query().patchAndFetchById(id, { ...tweet });
  }

  async getTweet(id: number) {
    return Tweet.query().where({ id, is_active: true }).withGraphFetched('user').first();
  }

  async getTweetsByUser(params: IUserTweetsResponse) {
    const { userId, pageNumber, limit, searchQuery, orderBy, sortBy } = params;
    let tweets = Tweet.query()
      .where({ user_id: userId, is_active: true })
      .withGraphFetched('user')
      .modifyGraph('user', builder => {
        builder.select('id', 'firstName', 'lastName', 'email');
      })
      .modify(builder => {
        if (searchQuery) {
          builder.where('content', 'ilike', `%${searchQuery}%`);
        }
      })
      .orderBy(sortBy === "date" ? "created_at" : "updated_at", orderBy === "oldest" ? "ASC" : "DESC");

    if (pageNumber) {
      const offset = (pageNumber - 1) * limit;
      tweets = tweets.limit(limit).offset(offset);
    }

    return tweets;
  }
}

export default TweetRepository;
