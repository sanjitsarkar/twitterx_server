import TweetRepository from '../respositories/tweet.repository';
import { ITweet, ITweetResponse, IUserTweetsResponse } from '../types/tweet.types';

class TweetService {
  constructor(private readonly _tweetRepository: TweetRepository) { }

  async getAllTweets(params: ITweetResponse) {
    try {
      return await this._tweetRepository.getAllTweets(params);
    } catch (e) {
      throw new Error('Error fetching tweets');
    }
  }
  async getFollowingsTweets(params: ITweetResponse) {
    try {
      return await this._tweetRepository.getFollowingsTweets(params);
    } catch (e) {
      throw new Error('Error fetching tweets');
    }
  }

  async addTweet(tweet: ITweet) {
    try {
      return await this._tweetRepository.addTweet(tweet);
    } catch (e) {
      throw new Error('Error adding tweet');
    }
  }

  async deleteTweet(id: number) {
    try {
      return await this._tweetRepository.deleteTweet(id);
    } catch (e) {
      throw new Error('Error deleting tweet');
    }
  }

  async updateTweet(id: number, tweet: ITweet) {
    try {
      return await this._tweetRepository.updateTweet(id, tweet);
    } catch (e) {
      throw new Error('Error updating tweet');
    }
  }

  async getTweet(id: number) {
    try {
      return await this._tweetRepository.getTweet(id);
    } catch (e) {
      throw new Error('Error fetching tweet');
    }
  }

  async getTweetsByUser(params: IUserTweetsResponse) {
    try {
      return await this._tweetRepository.getTweetsByUser(params);
    } catch (e) {
      throw new Error('Error fetching tweets by user');
    }
  }
}

export default new TweetService(new TweetRepository());
