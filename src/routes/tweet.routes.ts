import { Router } from 'express';
import { addTweet, deleteTweet, getTweets, getTweetsByUser, updateTweet } from '../controllers/tweet.controller';
import auth from '../middlewares/auth';
import validateRequest from '../middlewares/validation';
import { tweetResponseSchema, tweetSchema, tweetUpdateSchema, userTweetsResponseSchema } from '../validators/tweet';

const router = Router();

// Get tweets for a specific user
router.get('/user/:userId', validateRequest(userTweetsResponseSchema), getTweetsByUser);
// Create tweet route
router.post('/', validateRequest(tweetSchema), auth, addTweet);

// Get all tweets route
router.get('/', validateRequest(tweetResponseSchema), auth, getTweets);


//Update tweet route
router.patch('/:tweetId', validateRequest(tweetUpdateSchema), auth, updateTweet);

//Delete tweet route

router.delete('/:tweetId', auth, deleteTweet);

export default router;

