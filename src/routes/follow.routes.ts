import { Router } from 'express';
import { addFollow, getFollowers, getFollowing, unfollowUser } from '../controllers/follow.controller';
import auth from '../middlewares/auth';
import validateRequest from '../middlewares/validation';
import { followersOrFollowingsSchema, followSchema } from '../validators/follow';

const router = Router();

// Follow user route
router.post('/', validateRequest(followSchema), auth, addFollow);

// Get followers route
router.get('/followers/:userId', validateRequest(followersOrFollowingsSchema), getFollowers);

// Get following route
router.get('/following/:userId', validateRequest(followersOrFollowingsSchema), getFollowing);

// Unfollow user route
router.delete('/unfollow/:followingId', auth, unfollowUser)

export default router;
