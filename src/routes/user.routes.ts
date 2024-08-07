import { Router } from 'express';
import { deleteUser, getUserProfile, getUser, loginUser, registerUser, updateUser, getUsers } from '../controllers/user.controller';
import auth from '../middlewares/auth';
import validateRequest from '../middlewares/validation';
import { deleleUserSchema, loginSchema, registerSchema, updateUserSchema } from '../validators/user';

const router = Router();

// Register route
router.post('/register', validateRequest(registerSchema), registerUser);

// Login route
router.post('/login', validateRequest(loginSchema), loginUser);

// Profile route
router.get('/profile', auth, getUserProfile);

// User route
router.get('/:id', getUser);

//Update route
router.patch('/update', validateRequest(updateUserSchema), auth, updateUser);

//Get users route

router.get('/', auth, getUsers);

//Delete route

router.delete('/delete', validateRequest(deleleUserSchema), auth, deleteUser);

export default router;
