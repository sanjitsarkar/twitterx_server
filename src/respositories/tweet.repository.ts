import Tweet from '../models/Tweet.model';
import { ITweet, ITweetResponse, IUserTweetsResponse } from '../types/tweet.types';

class TweetRepository {
  async getTweets(params: ITweetResponse) {
    const { pageNumber, limit, searchQuery, orderBy, sortBy } = params;
    const offset = (pageNumber - 1) * limit;
    const tweets = await Tweet.query()
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
      .orderBy(sortBy === "date" ? "created_at" : "updated_at", orderBy === "asc" ? "ASC" : "DESC")
      .limit(limit)
      .offset(offset);


    return tweets;
  }

  async addTweet(tweet: ITweet) {
    return Tweet.query().insert(tweet);
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
    const offset = (pageNumber - 1) * limit;

    const tweets = await Tweet.query()
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
      .orderBy(sortBy === "date" ? "created_at" : "updated_at", orderBy === "asc" ? "ASC" : "DESC")
      .limit(limit)
      .offset(offset);
    ;

    return tweets;

  }
}

export default TweetRepository;
