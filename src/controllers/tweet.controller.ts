import { Request, Response } from 'express';
import TweetService from '../services/tweet.service';

export const getAllTweets = async (req: Request, res: Response) => {
  try {
    const { page, searchKey = '', sortBy = "date", orderBy = "desc" } = req.query;
    const tweets = await TweetService.getAllTweets({ limit: 10, pageNumber: Number(page), searchQuery: String(searchKey), orderBy: String(orderBy), sortBy: String(sortBy) });
    res.status(200).json(tweets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getFollowingsTweets = async (req: any, res: Response) => {
  try {
    const { page, searchKey = '', sortBy = "date", orderBy = "desc" } = req.query;
    const userId = req.user.id;
    const tweets = await TweetService.getFollowingsTweets({ limit: 10, pageNumber: Number(page), searchQuery: String(searchKey), orderBy: String(orderBy), sortBy: String(sortBy), userId });
    res.status(200).json(tweets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addTweet = async (req: any, res: Response) => {
  try {
    const { content } = req.body;
    const userId = req.user.id;
    const tweet = await TweetService.addTweet({ content, user_id: userId });
    res.status(201).json(tweet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTweet = async (req: Request, res: Response) => {
  try {
    const { tweetId } = req.params;
    await TweetService.deleteTweet(Number(tweetId));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTweet = async (req: Request, res: Response) => {
  try {
    const { tweetId } = req.params;
    const { content } = req.body;
    const updatedTweet = await TweetService.updateTweet(Number(tweetId), { content: String(content) });
    res.status(200).json(updatedTweet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTweet = async (req: Request, res: Response) => {
  try {
    const { tweetId } = req.params;
    const tweet = await TweetService.getTweet(Number(tweetId));
    res.status(200).json(tweet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTweetsByUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { page, searchKey = '', sortBy = "date", orderBy = "desc" } = req.query;
    const tweets = await TweetService.getTweetsByUser({ userId: Number(userId), limit: 10, pageNumber: Number(page), searchQuery: String(searchKey), orderBy: String(orderBy), sortBy: String(sortBy) });
    res.status(200).json(tweets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


